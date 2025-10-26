import { useState, useMemo } from "react";
import { Order, ProcessedOrder, TimeGrouping } from "@/types/order";
import ordersData from "@/data/orders.json";
import { 
  processOrder, 
  filterOrdersByState, 
  filterOrdersByStore, 
  getStoreNames, 
  calculateMetrics 
} from "@/utils/orderProcessing";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { StoreComparisonChart } from "@/components/dashboard/StoreComparisonChart";
import { FilterControls } from "@/components/dashboard/FilterControls";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { DollarSign, TrendingUp, Clock, ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [grouping, setGrouping] = useState<TimeGrouping>("day");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [includeCanceled, setIncludeCanceled] = useState(false);

  const processedOrders = useMemo(() => {
    return (ordersData as Order[]).map(processOrder);
  }, []);

  const stores = useMemo(() => getStoreNames(ordersData as Order[]), []);

  const filteredOrders = useMemo(() => {
    let filtered = processedOrders;
    filtered = filterOrdersByState(filtered, includeCanceled);
    filtered = filterOrdersByStore(filtered, selectedStore);
    return filtered;
  }, [processedOrders, includeCanceled, selectedStore]);

  const metrics = useMemo(() => calculateMetrics(filteredOrders), [filteredOrders]);

  const completedOrders = filteredOrders.filter((o) => o.state === "complete");
  const canceledOrders = filteredOrders.filter((o) => o.state === "canceled");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Analitică Comenzi
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Analiză completă a performanței comenzilor și veniturilor
          </p>
        </div>

        <FilterControls
          grouping={grouping}
          onGroupingChange={setGrouping}
          stores={stores}
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
          includeCanceled={includeCanceled}
          onIncludeCanceledChange={setIncludeCanceled}
        />

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <MetricCard
              title="Venit Total"
              value={`${metrics.totalIncome.toFixed(2)} RON`}
              subtitle={`Din ${metrics.totalOrders} comenzi`}
              icon={DollarSign}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <MetricCard
              title="Medie Venit pe Oră"
              value={`${metrics.avgIncomePerHour.toFixed(2)} RON`}
              subtitle="Rată de câștig pe oră"
              icon={TrendingUp}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <MetricCard
              title="Medie Venit pe Comandă"
              value={`${metrics.avgIncomePerOrder.toFixed(2)} RON`}
              subtitle="Media pe comandă"
              icon={ShoppingBag}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <MetricCard
              title="Total Comenzi"
              value={metrics.totalOrders}
              subtitle={`${completedOrders.length} finalizate, ${canceledOrders.length} anulate`}
              icon={ShoppingBag}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <MetricCard
              title="Durată Medie"
              value={`${metrics.avgDurationMinutes.toFixed(0)} min`}
              subtitle="Timp mediu de finalizare"
              icon={Clock}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <MetricCard
              title="Venit pe Minut"
              value={`${metrics.avgIncomePerMinute.toFixed(2)} RON`}
              subtitle="Rată pe minut"
              icon={Zap}
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <div className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
            <IncomeChart orders={filteredOrders} grouping={grouping} />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <StoreComparisonChart orders={filteredOrders} />
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.9s" }}>
          <OrdersTable orders={filteredOrders} />
        </div>
        <div className="animate-slide-up flex flex-row justify-center items-center" style={{ animationDelay: "0.9s" }}>
          <a href="tel:+40 728 695 260">
          © Misu
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
