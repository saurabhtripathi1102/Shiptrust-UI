"use client"
import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CourierChip } from "@/components/custom/courier-chip"
import { Button } from "@/components/ui/button"

export default function CouriersPage() {
  const { data: couriers, isLoading } = useQuery({
    queryKey: ["couriers"],
    queryFn: () => api.getCouriers()
  })

  if (isLoading) return <div className="p-8 animate-pulse text-muted-foreground">Loading couriers...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Couriers</h1>
        <p className="text-muted-foreground mt-1">Manage active courier partners and view their performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {couriers?.map((courier) => (
          <Card key={courier.id} className="bg-card">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CourierChip name={courier.name} logo={courier.logo} />
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                  <p className="font-bold text-lg font-mono">{courier.successRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">RTO Rate</p>
                  <p className="font-bold text-lg font-mono text-destructive">{courier.rtoRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Avg TAT</p>
                  <p className="font-bold text-lg font-mono">{courier.avgTat}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Serviceability</p>
                  <p className="font-bold text-lg font-mono">{courier.serviceability}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
