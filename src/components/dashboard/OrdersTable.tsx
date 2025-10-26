import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessedOrder } from "@/types/order";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "./DataTable";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  orders: ProcessedOrder[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const columns: ColumnDef<ProcessedOrder>[] = useMemo(
    () => [
      {
        accessorKey: "order_number",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0"
            >
              Comandă #
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="font-mono text-xs sm:text-sm">{row.getValue("order_number")}</span>
        ),
      },
      {
        accessorKey: "store_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0"
            >
              Magazin
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-xs sm:text-sm">
            {row.getValue<string>("store_name").replace("Market ", "")}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0"
            >
              Data
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-xs sm:text-sm whitespace-nowrap">
            {format(row.getValue<Date>("date"), "MMM dd, yyyy HH:mm")}
          </span>
        ),
      },
      {
        accessorKey: "state",
        header: "Stare",
        cell: ({ row }) => (
          <Badge
            variant={row.getValue("state") === "complete" ? "default" : "secondary"}
            className={`text-xs ${row.getValue("state") === "complete" ? "bg-success" : ""}`}
          >
            {row.getValue<string>("state")}
          </Badge>
        ),
      },
      {
        accessorKey: "durationMinutes",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 whitespace-nowrap"
            >
              Durată
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-xs sm:text-sm text-right block">
            {row.getValue<number>("durationMinutes")} min
          </span>
        ),
      },
      {
        accessorKey: "finalReceivedPayment",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 whitespace-nowrap"
            >
              Venit
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-xs sm:text-sm font-medium text-right block">
            {row.getValue<number>("finalReceivedPayment").toFixed(2)} RON
          </span>
        ),
      },
      {
        accessorKey: "incomePerHour",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 whitespace-nowrap"
            >
              Pe Oră
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-xs sm:text-sm text-muted-foreground text-right block">
            {row.getValue<number>("incomePerHour").toFixed(2)} RON
          </span>
        ),
      },
    ],
    []
  );

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [orders]);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Toate Comenzile</CardTitle>
        <CardDescription>Istoric complet de comenzi cu filtrare avansată și căutare</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={sortedOrders}
          searchPlaceholder="Caută comenzi, magazine sau stare..."
        />
      </CardContent>
    </Card>
  );
};
