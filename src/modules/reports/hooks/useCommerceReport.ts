import { useQuery } from "@tanstack/react-query";
import { getCommerceReport } from "@/modules/reports/api/report.api";

export const useCommerceReport = (
  commerceId: string | null | undefined,
  from: string,
  to: string
) => {
  return useQuery({
    queryKey: ["commerce-report", commerceId, from, to],
    queryFn: () => getCommerceReport(commerceId!, from, to),
    enabled: !!commerceId && !!from && !!to,
  });
};
