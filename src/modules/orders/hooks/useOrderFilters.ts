import { useState, useMemo } from "react";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderResponse } from "../interfaces/responses/order-response.interface";
import { OrderSummaryForCommerceResponse } from "../interfaces/responses/order-summary-commerce-response.interface";
import { OrderSummaryForClientResponse } from "../interfaces/responses/order-summary-client-response.interface";

export type FilterValue = OrderStatus | "ALL";

type OrderType = OrderResponse | OrderSummaryForCommerceResponse | OrderSummaryForClientResponse;

export const useOrderFilters = <T extends OrderType>(orders: T[]) => {
  const [activeStatus, setActiveStatus] = useState<FilterValue>("ALL");

  const filteredOrders = useMemo(() => {
    if (activeStatus === "ALL") return orders;
    return orders.filter((order) => order.status === activeStatus);
  }, [orders, activeStatus]);

  return { activeStatus, setActiveStatus, filteredOrders };
};