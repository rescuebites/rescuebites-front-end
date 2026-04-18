import { httpClient } from "@/shared/lib/httpClient";
import type {
  SearchSuggestion,
  SearchResultResponse,
} from "../interfaces/responses/search-response.interface";

const BASE_URL = "/api/v1/search";

export const fetchSuggestions = async (
  q: string,
  locality: string,
): Promise<SearchSuggestion[]> => {
  const { data } = await httpClient.get<SearchSuggestion[]>(`${BASE_URL}/suggestions`, {
    params: { q, locality },
  });
  return data;
};

export const fetchSearchResults = async (
  q: string,
  locality: string,
  page: number,
  size: number,
): Promise<SearchResultResponse> => {
  const { data } = await httpClient.get<SearchResultResponse>(BASE_URL, {
    params: { q, locality, page, size },
  });
  return data;
};
