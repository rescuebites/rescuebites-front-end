import { useState, useMemo } from "react";
import { OrderStatus } from "../enums/order-status.enum";

export type FilterValue = OrderStatus | "ALL";

export const useOrderFilters = <T extends { status: OrderStatus }>(orders: T[]) => {
  const [activeStatus, setActiveStatus] = useState<FilterValue>("ALL");

  const filteredOrders = useMemo(() => {
    if (activeStatus === "ALL") return orders;
    return orders.filter((order) => order.status === activeStatus);
  }, [orders, activeStatus]);

  return { activeStatus, setActiveStatus, filteredOrders };
};