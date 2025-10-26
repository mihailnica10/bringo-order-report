import { Order, ProcessedOrder, TimeGrouping } from "@/types/order";
import { parseISO, differenceInMinutes, startOfDay, startOfWeek, startOfMonth, format } from "date-fns";

export const processOrder = (order: Order): ProcessedOrder => {
  const createdAt = parseISO(order.times.created_at);
  const updatedAt = parseISO(order.times.updated_at);
  const durationMinutes = differenceInMinutes(updatedAt, createdAt);
  const incomePerMinute = durationMinutes > 0 ? order.finalReceivedPayment / durationMinutes : 0;
  const incomePerHour = incomePerMinute * 60;

  return {
    ...order,
    durationMinutes,
    date: createdAt,
    incomePerMinute,
    incomePerHour,
  };
};

export const filterOrdersByState = (
  orders: ProcessedOrder[],
  includeCanceled: boolean
): ProcessedOrder[] => {
  return includeCanceled ? orders : orders.filter((o) => o.state === "complete");
};

export const groupOrdersByTime = (
  orders: ProcessedOrder[],
  grouping: TimeGrouping
): Map<string, ProcessedOrder[]> => {
  const grouped = new Map<string, ProcessedOrder[]>();

  orders.forEach((order) => {
    let key: string;
    switch (grouping) {
      case "day":
        key = format(startOfDay(order.date), "yyyy-MM-dd");
        break;
      case "week":
        key = format(startOfWeek(order.date), "yyyy-MM-dd");
        break;
      case "month":
        key = format(startOfMonth(order.date), "yyyy-MM");
        break;
    }

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(order);
  });

  return grouped;
};

export const calculateMetrics = (orders: ProcessedOrder[]) => {
  const totalOrders = orders.length;
  const totalIncome = orders.reduce((sum, o) => sum + o.finalReceivedPayment, 0);
  const totalMinutes = orders.reduce((sum, o) => sum + o.durationMinutes, 0);
  const avgIncomePerOrder = totalOrders > 0 ? totalIncome / totalOrders : 0;
  const avgIncomePerMinute = totalMinutes > 0 ? totalIncome / totalMinutes : 0;
  const avgIncomePerHour = avgIncomePerMinute * 60;
  const avgDurationMinutes = totalOrders > 0 ? totalMinutes / totalOrders : 0;

  return {
    totalOrders,
    totalIncome,
    totalMinutes,
    avgIncomePerOrder,
    avgIncomePerMinute,
    avgIncomePerHour,
    avgDurationMinutes,
  };
};

export const getStoreNames = (orders: Order[]): string[] => {
  const uniqueStores = new Set(orders.map((o) => o.store_name));
  return Array.from(uniqueStores).sort();
};

export const filterOrdersByStore = (
  orders: ProcessedOrder[],
  storeName: string | null
): ProcessedOrder[] => {
  return storeName ? orders.filter((o) => o.store_name === storeName) : orders;
};
