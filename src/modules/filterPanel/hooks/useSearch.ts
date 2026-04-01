import { useState, useEffect, useCallback, useRef } from "react";
import type {
  SearchSuggestion,
  SearchCommerceResponse,
  SearchProductResponse,
  SearchResultResponse,
} from "../interfaces/responses/search-response.interface";

const BASE_URL = "/api/v1/search";
const DEBOUNCE_DELAY = 350;
const DEFAULT_LOCALITY = "Villa María"; // ajustá o leelo de contexto/store

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  suggestions: SearchSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  commerces: SearchCommerceResponse[];
  products: SearchProductResponse[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMoreCommerces: boolean;
  hasMoreProducts: boolean;
  totalCommerces: number;
  totalProducts: number;
  error: string | null;
  loadMoreCommerces: () => void;
  loadMoreProducts: () => void;
  clearSearch: () => void;
  confirmSearch: (q?: string) => void;
}

export function useSearch(): UseSearchReturn {
  const [query, setQueryState] = useState("");
  const [confirmedQuery, setConfirmedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [commerces, setCommerces] = useState<SearchCommerceResponse[]>([]);
  const [products, setProducts] = useState<SearchProductResponse[]>([]);
  const [commercePage, setCommercePage] = useState(0);
  const [productPage, setProductPage] = useState(0);
  const [commerceTotalPages, setCommerceTotalPages] = useState(0);
  const [productTotalPages, setProductTotalPages] = useState(0);
  const [totalCommerces, setTotalCommerces] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortSuggestionsRef = useRef<AbortController | null>(null);
  const abortSearchRef = useRef<AbortController | null>(null);

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
          `${BASE_URL}/suggestions?q=${encodeURIComponent(q.trim())}&locality=${encodeURIComponent(DEFAULT_LOCALITY)}`,
          { signal: abortSuggestionsRef.current.signal }
        );
        if (!res.ok) throw new Error();
        const data: SearchSuggestion[] = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") setSuggestions([]);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  const runSearch = useCallback(
    async (q: string, cPage: number, pPage: number, append: boolean) => {
      if (!q.trim()) return;
      if (abortSearchRef.current) abortSearchRef.current.abort();
      abortSearchRef.current = new AbortController();

      append ? setIsLoadingMore(true) : setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${BASE_URL}?q=${encodeURIComponent(q.trim())}&locality=${encodeURIComponent(DEFAULT_LOCALITY)}&page=${pPage}&size=10`,
          { signal: abortSearchRef.current.signal }
        );
        if (!res.ok) throw new Error("Error en la búsqueda");
        const data: SearchResultResponse = await res.json();

        setCommerces((prev) => append ? [...prev, ...data.commerces.content] : data.commerces.content);
        setProducts((prev) => append ? [...prev, ...data.products.content] : data.products.content);
        setCommercePage(cPage);
        setProductPage(pPage);
        setCommerceTotalPages(data.commerces.totalPages);
        setProductTotalPages(data.products.totalPages);
        setTotalCommerces(data.commerces.totalElements);
        setTotalProducts(data.products.totalElements);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError")
          setError("No se pudo completar la búsqueda. Intentá de nuevo.");
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
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortSuggestionsRef.current?.abort();
      setSuggestions([]);
      setShowSuggestions(false);
      setConfirmedQuery(term);
      setQueryState(term);
      setCommerces([]);
      setProducts([]);
      runSearch(term, 0, 0, false);
    },
    [query, runSearch]
  );

  const loadMoreCommerces = useCallback(() => {
    const next = commercePage + 1;
    if (next >= commerceTotalPages || isLoadingMore) return;
    runSearch(confirmedQuery, next, productPage, true);
  }, [confirmedQuery, commercePage, commerceTotalPages, productPage, isLoadingMore, runSearch]);

  const loadMoreProducts = useCallback(() => {
    const next = productPage + 1;
    if (next >= productTotalPages || isLoadingMore) return;
    runSearch(confirmedQuery, commercePage, next, true);
  }, [confirmedQuery, productPage, productTotalPages, commercePage, isLoadingMore, runSearch]);

  const clearSearch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortSuggestionsRef.current?.abort();
    abortSearchRef.current?.abort();
    setQueryState("");
    setConfirmedQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setCommerces([]);
    setProducts([]);
    setTotalCommerces(0);
    setTotalProducts(0);
    setError(null);
  }, []);

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
    commerces,
    products,
    isLoading,
    isLoadingMore,
    hasMoreCommerces: commercePage + 1 < commerceTotalPages,
    hasMoreProducts: productPage + 1 < productTotalPages,
    totalCommerces,
    totalProducts,
    error,
    loadMoreCommerces,
    loadMoreProducts,
    clearSearch,
    confirmSearch,
  };
}