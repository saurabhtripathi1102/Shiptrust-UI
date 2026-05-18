"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DataTable } from "@/components/custom/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts"
import { RiskIndicator } from "@/components/custom/risk-indicator"
import { PincodeBadge } from "@/components/custom/pincode-badge"

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => api.getAnalytics()
  })

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "pincode",
      header: "Pincode",
      cell: ({ row }) => <PincodeBadge pincode={row.getValue("pincode")} />,
    },
    {
      accessorKey: "orders",
      header: "Order Volume",
      cell: ({ row }) => <span className="font-mono">{row.getValue("orders")}</span>,
    },
    {
      accessorKey: "rtoRate",
      header: "RTO Rate",
      cell: ({ row }) => {
        const rate = parseFloat(row.getValue("rtoRate"))
        const riskLevel = rate > 30 ? "high" : rate > 15 ? "medium" : "low"
        return <RiskIndicator level={riskLevel} label={`${rate}%`} />
      },
    },
    {
      accessorKey: "avgCost",
      header: "Avg Shipping Cost",
      cell: ({ row }) => <span className="font-mono">₹{row.getValue("avgCost")}</span>,
    },
    {
      accessorKey: "recommendation",
      header: "Recommendation",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("recommendation")}</span>,
    },
  ]

  if (isLoading) return <div className="p-8 animate-pulse text-muted-foreground">Loading analytics...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your shipping performance and costs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 border-border bg-card">
          <CardHeader>
            <CardTitle>Cost Per Delivered Order</CardTitle>
            <CardDescription>Visualizing shipping cost relative to order value (RTO vs Delivered)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.costPerDelivered}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="orderValue" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar 
                    dataKey="cost" 
                    radius={[4, 4, 0, 0]} 
                  >
                    {
                      analytics?.costPerDelivered.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.rto ? "hsl(var(--destructive))" : "hsl(var(--primary))"} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-primary"></div>
                <span className="text-muted-foreground">Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-destructive"></div>
                <span className="text-muted-foreground">RTO</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3 border-border bg-card">
          <CardHeader>
            <CardTitle>Actionable Insights</CardTitle>
            <CardDescription>AI-driven recommendations based on your data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border bg-destructive/5 flex gap-3">
                <RiskIndicator level="high" className="mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">High RTO in Bihar (PIN 812xxx)</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your RTO rate is 52% in this region. Consider disabling COD for these pincodes to save approximately ₹14,500/month.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border bg-warning/5 flex gap-3">
                <RiskIndicator level="medium" className="mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Ecom Express delays in South Zone</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average delivery time has increased by 1.2 days. We recommend routing through BlueDart for the next 7 days.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border bg-success/5 flex gap-3">
                <RiskIndicator level="low" className="mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Excellent delivery rates in Mumbai</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    RTO is down to 8.5%. Consider running localized marketing campaigns to capitalize on this high-performing region.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pincode Performance Report</CardTitle>
          <CardDescription>Detailed breakdown of your delivery metrics across regions.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={analytics?.pincodePerformance || []} 
            searchKey="pincode" 
            searchPlaceholder="Search pincode..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
