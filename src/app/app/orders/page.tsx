"use client"
import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/custom/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/mocks/orders"
import { StatusPill } from "@/components/custom/status-pill"
import { AwbCode } from "@/components/custom/awb-code"

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.getOrders()
  })

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "awb",
      header: "AWB",
      cell: ({ row }) => <AwbCode awb={row.getValue("awb")} />,
    },
    {
      accessorKey: "buyer",
      header: "Customer",
      cell: ({ row }) => {
        const buyer = row.getValue("buyer") as Order["buyer"]
        return (
          <div className="flex flex-col">
            <span className="font-medium">{buyer.name}</span>
            <span className="text-xs text-muted-foreground">{buyer.city}, {buyer.state}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "payment",
      header: "Amount",
      cell: ({ row }) => {
        const payment = row.getValue("payment") as Order["payment"]
        return (
          <div className="flex flex-col">
            <span className="font-mono">₹{payment.amount}</span>
            <span className="text-xs text-muted-foreground">{payment.method}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusPill status={row.getValue("status")} />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track your customer orders.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={orders || []} 
            searchKey="id" 
            searchPlaceholder="Search order ID..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
