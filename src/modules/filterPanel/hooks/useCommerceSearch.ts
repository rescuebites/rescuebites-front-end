import { useState, useCallback, useRef } from "react";
import type { SearchSuggestion, SearchProductResponse } from "../interfaces/responses/search-response.interface";
import type { Page } from "@/shared/interfaces/page.interface";
import {
  fetchCommerceSuggestions,
  fetchCommerceSearchResults,
} from "../api/commerce-search.api";

const DEBOUNCE_DELAY = 350;

interface UseCommerceSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  suggestions: SearchSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  products: SearchProductResponse[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  totalProducts: number;
  error: string | null;
  loadMore: () => void;
  clearSearch: () => void;
  confirmSearch: (q?: string) => void;
}

export function useCommerceSearch(
  commerceId: string | null | undefined
): UseCommerceSearchReturn {
  const [query, setQueryState] = useState("");
  const [confirmedQuery, setConfirmedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [products, setProducts] = useState<SearchProductResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestionGenRef = useRef(0);
  const searchGenRef = useRef(0);

  const setQuery = useCallback(
    (q: string) => {
      setQueryState(q);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!q.trim() || !commerceId) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      debounceRef.current = setTimeout(async () => {
        const gen = ++suggestionGenRef.current;
        try {
          const data = await fetchCommerceSuggestions(commerceId, q.trim());
          if (gen !== suggestionGenRef.current) return;
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        } catch {
          if (gen === suggestionGenRef.current) setSuggestions([]);
        }
      }, DEBOUNCE_DELAY);
    },
    [commerceId]
  );

  const runSearch = useCallback(
    async (q: string, pageNum: number, append: boolean) => {
      if (!commerceId || !q.trim()) return;
      const gen = ++searchGenRef.current;
      if (append) setIsLoadingMore(true); else setIsLoading(true);
      setError(null);
      try {
        const data: Page<SearchProductResponse> = await fetchCommerceSearchResults(
          commerceId,
          q.trim(),
          pageNum
        );
        if (gen !== searchGenRef.current) return;
        setProducts((prev) => (append ? [...prev, ...data.content] : data.content));
        setPage(pageNum);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalElements);
      } catch {
        if (gen === searchGenRef.current) setError("Error al buscar productos.");
      } finally {
        if (gen === searchGenRef.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [commerceId]
  );

  const confirmSearch = useCallback(
    (q?: string) => {
      const searchQuery = (q ?? query).trim();
      if (!searchQuery) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      suggestionGenRef.current++;
      setSuggestions([]);
      setShowSuggestions(false);
      setConfirmedQuery(searchQuery);
      setQueryState(searchQuery);
      setPage(0);
      setProducts([]);
      runSearch(searchQuery, 0, false);
    },
    [query, runSearch]
  );

  const loadMore = useCallback(() => {
    if (page + 1 < totalPages && !isLoading && !isLoadingMore) {
      runSearch(confirmedQuery, page + 1, true);
    }
  }, [page, totalPages, isLoading, isLoadingMore, confirmedQuery, runSearch]);

  const clearSearch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQueryState("");
    setConfirmedQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setProducts([]);
    setPage(0);
    setTotalPages(0);
    setTotalProducts(0);
    setIsLoading(false);
    setIsLoadingMore(false);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    products,
    isLoading,
    isLoadingMore,
    hasMore: page + 1 < totalPages,
    totalProducts,
    error,
    loadMore,
    clearSearch,
    confirmSearch,
  };
}
