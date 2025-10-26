import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TimeGrouping } from "@/types/order";
import { Filter } from "lucide-react";

interface MobileFilterSheetProps {
  grouping: TimeGrouping;
  onGroupingChange: (grouping: TimeGrouping) => void;
  stores: string[];
  selectedStore: string | null;
  onStoreChange: (store: string | null) => void;
  includeCanceled: boolean;
  onIncludeCanceledChange: (include: boolean) => void;
}

export const MobileFilterSheet = ({
  grouping,
  onGroupingChange,
  stores,
  selectedStore,
  onStoreChange,
  includeCanceled,
  onIncludeCanceledChange,
}: MobileFilterSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filtre
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Opțiuni de Filtrare</SheetTitle>
          <SheetDescription>Personalizează vizualizarea datelor</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-3">
            <Label>Perioada de Timp</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={grouping === "day" ? "default" : "secondary"}
                size="sm"
                onClick={() => onGroupingChange("day")}
                className="w-full"
              >
                Zi
              </Button>
              <Button
                variant={grouping === "week" ? "default" : "secondary"}
                size="sm"
                onClick={() => onGroupingChange("week")}
                className="w-full"
              >
                Săptămână
              </Button>
              <Button
                variant={grouping === "month" ? "default" : "secondary"}
                size="sm"
                onClick={() => onGroupingChange("month")}
                className="w-full"
              >
                Lună
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Magazin</Label>
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

          <div className="space-y-3">
            <Label>Include Comenzi Anulate</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="mobile-include-canceled"
                checked={includeCanceled}
                onCheckedChange={onIncludeCanceledChange}
              />
              <Label htmlFor="mobile-include-canceled" className="text-sm text-muted-foreground cursor-pointer">
                {includeCanceled ? "Da" : "Nu"}
              </Label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
