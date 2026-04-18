import { useState, useEffect, useCallback, useRef } from "react";
import type {
  SearchSuggestion,
  SearchCommerceResponse,
  SearchProductResponse,
} from "../interfaces/responses/search-response.interface";
import { fetchSuggestions, fetchSearchResults } from "../api/search.api";
import { useLocalityStore } from "@/modules/customer/home/hooks/useLocalityStore";

const DEBOUNCE_DELAY = 350;

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
  const locality = useLocalityStore((state) => state.locality);
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
  const suggestionGenRef = useRef(0);
  const searchGenRef = useRef(0);
  const abortSuggestionsRef = useRef<AbortController | null>(null);
  const abortSearchRef = useRef<AbortController | null>(null);

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) {
      abortSuggestionsRef.current?.abort();
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const gen = ++suggestionGenRef.current;
      abortSuggestionsRef.current?.abort();
      abortSuggestionsRef.current = new AbortController();
      try {
        const data = await fetchSuggestions(q.trim(), locality ?? "");
        if (gen !== suggestionGenRef.current) return;
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch {
        if (gen === suggestionGenRef.current) setSuggestions([]);
      }
    }, DEBOUNCE_DELAY);
  }, [locality]);

  const runSearch = useCallback(
    async (
      q: string,
      nextPage: number,
      append: boolean,
      target: "all" | "commerces" | "products",
    ) => {
      if (!q.trim()) return;
      const gen = ++searchGenRef.current;

      append ? setIsLoadingMore(true) : setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchResults(q.trim(), locality ?? "", nextPage, 10);
        if (gen !== searchGenRef.current) return;

        if (target === "all" || target === "commerces") {
          setCommerces((prev) =>
            append ? [...prev, ...data.commerces.content] : data.commerces.content
          );
          setCommercePage(nextPage);
          setCommerceTotalPages(data.commerces.totalPages);
          setTotalCommerces(data.commerces.totalElements);
        }
        if (target === "all" || target === "products") {
          setProducts((prev) =>
            append ? [...prev, ...data.products.content] : data.products.content
          );
          setProductPage(nextPage);
          setProductTotalPages(data.products.totalPages);
          setTotalProducts(data.products.totalElements);
        }
      } catch {
        if (gen === searchGenRef.current)
          setError("No se pudo completar la búsqueda. Intentá de nuevo.");
      } finally {
        if (gen === searchGenRef.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [locality]
  );

  const confirmSearch = useCallback(
    (q?: string) => {
      const term = (q ?? query).trim();
      if (!term) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      suggestionGenRef.current++;
      setSuggestions([]);
      setShowSuggestions(false);
      setConfirmedQuery(term);
      setQueryState(term);
      setCommerces([]);
      setProducts([]);
      runSearch(term, 0, false, "all");
    },
    [query, runSearch]
  );

  const loadMoreCommerces = useCallback(() => {
    const next = commercePage + 1;
    if (next >= commerceTotalPages || isLoadingMore) return;
    runSearch(confirmedQuery, next, true, "commerces");
  }, [confirmedQuery, commercePage, commerceTotalPages, isLoadingMore, runSearch]);

  const loadMoreProducts = useCallback(() => {
    const next = productPage + 1;
    if (next >= productTotalPages || isLoadingMore) return;
    runSearch(confirmedQuery, next, true, "products");
  }, [confirmedQuery, productPage, productTotalPages, isLoadingMore, runSearch]);

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
    setCommercePage(0);
    setProductPage(0);
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