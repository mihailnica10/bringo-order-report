import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold text-foreground break-words">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.positive ? "text-success" : "text-destructive"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value).toFixed(1)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
