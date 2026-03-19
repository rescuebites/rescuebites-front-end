import { useState, useEffect, useCallback, useRef } from "react";
import type { Page } from "../interfaces/types";
import type { SearchSuggestion } from "../interfaces/types";
import type { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";

const BASE_URL = "/api/v1/search";
const DEBOUNCE_DELAY = 350;

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  suggestions: SearchSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  results: ProductResponse[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  totalElements: number;
  error: string | null;
  loadMore: () => void;
  clearSearch: () => void;
  confirmSearch: (q?: string) => void;
}

export function useSearch(): UseSearchReturn {
  const [query, setQueryState] = useState("");
  const [confirmedQuery, setConfirmedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortSuggestionsRef = useRef<AbortController | null>(null);
  const abortSearchRef = useRef<AbortController | null>(null);

  // ── Debounce suggestions while typing ──────────────────────────────────────
  const setQuery = useCallback((q: string) => {
    setQueryState(q);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!q.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      if (abortSuggestionsRef.current) abortSuggestionsRef.current.abort();
      abortSuggestionsRef.current = new AbortController();

      try {
        const res = await fetch(
          `${BASE_URL}/suggestions?q=${encodeURIComponent(q.trim())}`,
          { signal: abortSuggestionsRef.current.signal }
        );
        if (!res.ok) throw new Error("Error fetching suggestions");
        const data: SearchSuggestion[] = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }, DEBOUNCE_DELAY);
  }, []);

  // ── Full search (called on Enter / suggestion click / button) ──────────────
  const runSearch = useCallback(
    async (q: string, pageNum: number, append: boolean) => {
      if (!q.trim()) return;

      if (abortSearchRef.current) abortSearchRef.current.abort();
      abortSearchRef.current = new AbortController();

      append ? setIsLoadingMore(true) : setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${BASE_URL}?q=${encodeURIComponent(q.trim())}&page=${pageNum}&size=10`,
          { signal: abortSearchRef.current.signal }
        );
        if (!res.ok) throw new Error("Error en la búsqueda");
        const data: Page<ProductResponse> = await res.json();

        setResults((prev) => (append ? [...prev, ...data.content] : data.content));
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
        setPage(pageNum);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("No se pudo completar la búsqueda. Intentá de nuevo.");
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  const confirmSearch = useCallback(
    (q?: string) => {
      const term = (q ?? query).trim();
      if (!term) return;
      setShowSuggestions(false);
      setConfirmedQuery(term);
      setQueryState(term);
      setPage(0);
      setResults([]);
      runSearch(term, 0, false);
    },
    [query, runSearch]
  );

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    if (nextPage >= totalPages || isLoadingMore) return;
    runSearch(confirmedQuery, nextPage, true);
  }, [confirmedQuery, page, totalPages, isLoadingMore, runSearch]);

  const clearSearch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortSuggestionsRef.current) abortSuggestionsRef.current.abort();
    if (abortSearchRef.current) abortSearchRef.current.abort();
    setQueryState("");
    setConfirmedQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setResults([]);
    setTotalElements(0);
    setTotalPages(0);
    setPage(0);
    setError(null);
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortSuggestionsRef.current?.abort();
      abortSearchRef.current?.abort();
    };
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    results,
    isLoading,
    isLoadingMore,
    hasMore: page + 1 < totalPages,
    totalElements,
    error,
    loadMore,
    clearSearch,
    confirmSearch,
  };
}