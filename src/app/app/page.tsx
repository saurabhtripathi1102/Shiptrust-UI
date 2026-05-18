"use client"
import * as React from "react"
import { useSeller } from "@/hooks/useSeller"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { KpiCard } from "@/components/custom/kpi-card"
import { Package, Truck, RotateCcw, Wallet } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { data: seller, isLoading: isLoadingSeller } = useSeller()
  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => api.getAnalytics()
  })

  if (isLoadingSeller || isLoadingAnalytics) {
    return <div className="p-8 text-muted-foreground animate-pulse">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {seller?.name.split(" ")[0]}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Shipments"
          value={analytics?.overview.totalShipments.toLocaleString() || "0"}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          delta={{ value: "12%", trend: "up" }}
        />
        <KpiCard
          title="In Transit"
          value={analytics?.overview.inTransit.toLocaleString() || "0"}
          icon={<Truck className="h-4 w-4 text-muted-foreground" />}
        />
        <KpiCard
          title="RTO (Return to Origin)"
          value={analytics?.overview.rto.toLocaleString() || "0"}
          icon={<RotateCcw className="h-4 w-4 text-muted-foreground" />}
          delta={{ value: "2.1%", trend: "down", text: "vs last week" }}
        />
        <KpiCard
          title="Wallet Balance"
          value={`₹${seller?.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 }) || "0.00"}`}
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 border-border bg-card">
          <CardHeader>
            <CardTitle>Shipment Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.shipmentsTrend}>
                  <defs>
                    <linearGradient id="colorPicked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="picked" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPicked)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3 border-border bg-card">
          <CardHeader>
            <CardTitle>Pincode Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analytics?.pincodePerformance.slice(0, 5).map((pin) => (
                <div key={pin.pincode} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium font-mono">
                      <span className="text-muted-foreground mr-2">PIN</span>
                      {pin.pincode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pin.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${pin.rtoRate > 20 ? 'text-destructive' : 'text-success'}`}>
                      {pin.rtoRate}% RTO
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Avg cost: ₹{pin.avgCost}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
