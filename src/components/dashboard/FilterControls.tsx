import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TimeGrouping } from "@/types/order";
import { Calendar, Store, Filter } from "lucide-react";
import { MobileFilterSheet } from "./MobileFilterSheet";

interface FilterControlsProps {
  grouping: TimeGrouping;
  onGroupingChange: (grouping: TimeGrouping) => void;
  stores: string[];
  selectedStore: string | null;
  onStoreChange: (store: string | null) => void;
  includeCanceled: boolean;
  onIncludeCanceledChange: (include: boolean) => void;
}

export const FilterControls = ({
  grouping,
  onGroupingChange,
  stores,
  selectedStore,
  onStoreChange,
  includeCanceled,
  onIncludeCanceledChange,
}: FilterControlsProps) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-end">
        <MobileFilterSheet
          grouping={grouping}
          onGroupingChange={onGroupingChange}
          stores={stores}
          selectedStore={selectedStore}
          onStoreChange={onStoreChange}
          includeCanceled={includeCanceled}
          onIncludeCanceledChange={onIncludeCanceledChange}
        />
      </div>

      {/* Desktop Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm hidden lg:block">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              Perioada de Timp
            </Label>
            <div className="flex gap-2">
              <Button
                variant={grouping === "day" ? "default" : "secondary"}
                size="sm"
                onClick={() => onGroupingChange("day")}
              >
                Zi
              </Button>
              <Button
                variant={grouping === "week" ? "default" : "secondary"}
                size="sm"
                onClick={() => onGroupingChange("week")}
              >
                Săptămână
              </Button>
              <Button
                variant={grouping === "month" ? "default" : "secondary"}
                size="sm"
                onClick={() => onGroupingChange("month")}
              >
                Lună
              </Button>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Store className="h-4 w-4" />
              Filtru Magazin
            </Label>
            <Select value={selectedStore || "all"} onValueChange={(v) => onStoreChange(v === "all" ? null : v)}>
              <SelectTrigger>
                <SelectValue placeholder="Toate Magazinele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate Magazinele</SelectItem>
                  {stores.map((store) => (
                    <SelectItem key={store} value={store}>
                      {store}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Filter className="h-4 w-4" />
              Include Anulate
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="include-canceled"
                checked={includeCanceled}
                onCheckedChange={onIncludeCanceledChange}
              />
              <Label htmlFor="include-canceled" className="text-sm text-muted-foreground cursor-pointer">
                {includeCanceled ? "Da" : "Nu"}
              </Label>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
