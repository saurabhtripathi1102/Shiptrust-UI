import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MoneyAmountProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number
  showSign?: boolean
  trend?: "up" | "down" | "neutral"
  trendColor?: "success" | "destructive" | "muted"
}

export function MoneyAmount({ 
  amount, 
  showSign = false, 
  trend,
  trendColor = "muted", 
  className, 
  ...props 
}: MoneyAmountProps) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount))

  const sign = amount < 0 ? "-" : showSign && amount > 0 ? "+" : ""
  
  const colorClass = 
    trendColor === "success" ? "text-success" : 
    trendColor === "destructive" ? "text-destructive" : 
    "text-muted-foreground"

  return (
    <div className={cn("inline-flex items-center gap-1.5 font-mono tracking-tight", className)} {...props}>
      <span className={cn(amount < 0 && "text-destructive")}>
        {sign}{formatted}
      </span>
      {trend === "up" && <TrendingUp className={cn("h-4 w-4", colorClass)} />} 
      {trend === "down" && <TrendingDown className={cn("h-4 w-4", colorClass)} />}
    </div>
  )
}
