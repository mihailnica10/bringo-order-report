import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ProcessedOrder, TimeGrouping } from "@/types/order";
import { groupOrdersByTime, calculateMetrics } from "@/utils/orderProcessing";
import { format } from "date-fns";

interface IncomeChartProps {
  orders: ProcessedOrder[];
  grouping: TimeGrouping;
}

export const IncomeChart = ({ orders, grouping }: IncomeChartProps) => {
  const grouped = groupOrdersByTime(orders, grouping);
  
  const chartData = Array.from(grouped.entries())
    .map(([date, orders]) => {
      const metrics = calculateMetrics(orders);
      return {
        date,
        income: metrics.totalIncome,
        orders: metrics.totalOrders,
        avgPerHour: metrics.avgIncomePerHour,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const formatXAxis = (date: string) => {
    if (!date) return "";
    
    try {
      if (grouping === "month") {
        // For month format "yyyy-MM", append "-01" to make it a valid date
        const fullDate = date.includes("-") ? `${date}-01` : date;
        const parsedDate = new Date(fullDate);
        if (isNaN(parsedDate.getTime())) return date;
        return format(parsedDate, "MMM yyyy");
      }
      
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return date;
      return format(parsedDate, grouping === "week" ? "MMM dd" : "MMM dd");
    } catch (error) {
      console.error("Date formatting error:", error, "Date:", date);
      return date;
    }
  };

  const groupingLabel = grouping === "day" ? "zi" : grouping === "week" ? "săptămână" : "lună";

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Venit în Timp</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Venit total pe {groupingLabel}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
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
              formatter={(value: number) => [`${value.toFixed(2)} RON`, "Venit"]}
              labelFormatter={formatXAxis}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
