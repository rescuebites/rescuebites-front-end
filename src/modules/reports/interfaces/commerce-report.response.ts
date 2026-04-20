export interface TopProductReportItem {
  name: string;
  unitsSold: number;
  revenue: number;
  percentage: number;
}

export interface CommerceReportResponse {
  from: string;
  to: string;
  totalSales: number;
  totalOrders: number;
  totalProductsSold: number;
  topProducts: TopProductReportItem[];
}
