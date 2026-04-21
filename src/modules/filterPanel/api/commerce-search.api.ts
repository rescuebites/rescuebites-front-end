import { httpClient } from "@/shared/lib/httpClient";
import type { SearchSuggestion, SearchProductResponse } from "../interfaces/responses/search-response.interface";
import type { Page } from "@/shared/interfaces/page.interface";

export const fetchCommerceSuggestions = async (
  commerceId: string,
  q: string
): Promise<SearchSuggestion[]> => {
  const { data } = await httpClient.get<SearchSuggestion[]>(
    `/api/v1/commerces/${commerceId}/search/suggestions`,
    { params: { q } }
  );
  return data;
};

export const fetchCommerceSearchResults = async (
  commerceId: string,
  q: string,
  page = 0,
  size = 20
): Promise<Page<SearchProductResponse>> => {
  const { data } = await httpClient.get<Page<SearchProductResponse>>(
    `/api/v1/commerces/${commerceId}/search`,
    { params: { q, page, size } }
  );
  return data;
};
