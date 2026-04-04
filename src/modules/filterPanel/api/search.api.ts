import type {
  SearchSuggestion,
  SearchResultResponse,
} from "../interfaces/responses/search-response.interface";

const BASE_URL = "/api/v1/search";

export const fetchSuggestions = async (
  q: string,
  locality: string,
  signal: AbortSignal
): Promise<SearchSuggestion[]> => {
  const res = await fetch(
    `${BASE_URL}/suggestions?q=${encodeURIComponent(q)}&locality=${encodeURIComponent(locality)}`,
    { signal }
  );
  if (!res.ok) throw new Error("Error fetching suggestions");
  return res.json();
};

export const fetchSearchResults = async (
  q: string,
  locality: string,
  productPage: number,
  size: number,
  signal: AbortSignal
): Promise<SearchResultResponse> => {
  const res = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(q)}&locality=${encodeURIComponent(locality)}&page=${productPage}&size=${size}`,
    { signal }
  );
  if (!res.ok) throw new Error("Error en la búsqueda");
  return res.json();
};
