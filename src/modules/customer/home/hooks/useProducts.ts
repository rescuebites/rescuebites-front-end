// import { useQuery } from "@tanstack/react-query";
// import { getTopDeals } from "../services/home.service";
// import { TOP_DEALS_QUERY_KEY } from "../constants";

// export function useTopDeals(size = 6) {
//   return useQuery({
//     queryKey: [TOP_DEALS_QUERY_KEY, size],
//     queryFn: () => getTopDeals(size),
//     staleTime: 5 * 60 * 1000, // 5 minutos
//     retry: 2,
//   });
// }