export interface Order {
  order_number: string;
  store_slug: string;
  store_name: string;
  state: "complete" | "canceled";
  pays: {
    courierPayEstimateWithoutPicking: number;
    courierPayEstimateWithPicking: number;
    courierPayFinalAmount: number;
  };
  finalReceivedPayment: number;
  times: {
    checkout_completed_at: string;
    created_at: string;
    updated_at: string;
    shopper_allocation_notified_at: string;
    shopper_time_estimate_at: string;
    shopper_allocation_deadline: string;
  };
}

export interface ProcessedOrder extends Order {
  durationMinutes: number;
  date: Date;
  incomePerMinute: number;
  incomePerHour: number;
}

export type TimeGrouping = "day" | "week" | "month";
