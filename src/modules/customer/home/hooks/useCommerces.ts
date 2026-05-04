import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getAllCommerces, getCommercesByType } from "../api/home.api";
import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";
import { PaginatedResponse } from "../interfaces/responses/paginated.response";
import { CommercePublicResponse } from "@/modules/commerce/interfaces/responses/commerce-public.response";
import { useLocalityStore } from "./useLocalityStore";

export function useAllCommerces(page = 0, size = 20) {
  const locality = useLocalityStore((state) => state.locality);

  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ["all-commerces", locality, page, size],
    queryFn: () => getAllCommerces(locality!, page, size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!locality,
    placeholderData: {
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0,
    },
  });
}

export function useCommercesByType(
  commerceType: CommerceTypeDisplay,
  page = 0,
  size = 6,
) {
  const locality = useLocalityStore((state) => state.locality);
  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ["commerces", commerceType, locality, page, size],
    queryFn: () => getCommercesByType(locality!, commerceType, page, size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!commerceType && !!locality,
    placeholderData: {
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0,
    },
  });
}

export function useInfiniteAllCommerces(size = 20) {
  const locality = useLocalityStore((state) => state.locality);
  return useInfiniteQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ["all-commerces-infinite", locality, size],
    queryFn: ({ pageParam }) =>
      getAllCommerces(locality!, pageParam as number, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.number + 1 < lastPage.totalPages
        ? lastPage.number + 1
        : undefined,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!locality,
  });
}

export function useInfiniteCommercesByType(
  commerceType: CommerceTypeDisplay | null,
  size = 20,
) {
  const locality = useLocalityStore((state) => state.locality);
  return useInfiniteQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ["commerces-infinite", commerceType, locality, size],
    queryFn: ({ pageParam }) =>
      getCommercesByType(locality!, commerceType!, pageParam as number, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.number + 1 < lastPage.totalPages
        ? lastPage.number + 1
        : undefined,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!commerceType && !!locality,
  });
}
