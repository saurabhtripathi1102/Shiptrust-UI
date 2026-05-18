import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | React.ReactNode
  delta?: {
    value: string
    trend: "up" | "down" | "neutral"
    text?: string
  }
  icon?: React.ReactNode
  sparkline?: React.ReactNode
}

export function KpiCard({ title, value, delta, icon, sparkline, className, ...props }: KpiCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-card border-border", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold tracking-tight font-mono">{value}</div>
            {delta && (
              <p className="text-xs mt-1">
                <span 
                  className={cn(
                    "font-medium",
                    delta.trend === "up" ? "text-success" : 
                    delta.trend === "down" ? "text-destructive" : 
                    "text-muted-foreground"
                  )}
                >
                  {delta.trend === "up" ? "↑" : delta.trend === "down" ? "↓" : "→"} {delta.value}
                </span>
                <span className="text-muted-foreground ml-1">{delta.text || "vs last period"}</span>
              </p>
            )}
          </div>
          {sparkline && <div className="h-10 w-24 flex items-end justify-end">{sparkline}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
