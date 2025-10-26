import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ProcessedOrder } from "@/types/order";
import { calculateMetrics } from "@/utils/orderProcessing";

interface StoreComparisonChartProps {
  orders: ProcessedOrder[];
}

export const StoreComparisonChart = ({ orders }: StoreComparisonChartProps) => {
  const storeGroups = orders.reduce((acc, order) => {
    if (!acc[order.store_name]) {
      acc[order.store_name] = [];
    }
    acc[order.store_name].push(order);
    return acc;
  }, {} as Record<string, ProcessedOrder[]>);

  const chartData = Object.entries(storeGroups)
    .map(([storeName, storeOrders]) => {
      const metrics = calculateMetrics(storeOrders);
      return {
        store: storeName.replace("Market ", "").split(" ")[0],
        fullName: storeName,
        income: metrics.totalIncome,
        orders: metrics.totalOrders,
        avgPerHour: metrics.avgIncomePerHour,
      };
    })
    .sort((a, b) => b.income - a.income);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Performanță Magazine</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Venit total pe magazin</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="store"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => {
                if (name === "income") return [`${value.toFixed(2)} RON`, "Venit Total"];
                if (name === "avgPerHour") return [`${value.toFixed(2)} RON/hr`, "Media pe Oră"];
                return [value, name];
              }}
              labelFormatter={(label, payload) => payload[0]?.payload.fullName || label}
            />
            <Bar dataKey="income" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
