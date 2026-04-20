import { httpClient } from "@/shared/lib/httpClient";
import { CommerceReportResponse } from "@/modules/reports/interfaces/commerce-report.response";

export const getCommerceReport = async (
  commerceId: string,
  from: string,
  to: string
): Promise<CommerceReportResponse> => {
  const { data } = await httpClient.get<CommerceReportResponse>(
    `/api/v1/commerces/${commerceId}/reports/sales`,
    { params: { from, to } }
  );
  return data;
};
