import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"

export type RiskLevel = "low" | "medium" | "high"

interface RiskIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  level: RiskLevel
  label?: string
  pulse?: boolean
}

export function RiskIndicator({ level, label, pulse, className, ...props }: RiskIndicatorProps) {
  const config = {
    low: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", pulseColor: "bg-success" },
    medium: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", pulseColor: "bg-warning" },
    high: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", pulseColor: "bg-destructive" }
  }

  const { icon: Icon, color, bg, pulseColor } = config[level]

  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <div className="relative flex h-6 w-6 items-center justify-center">
        {pulse && (
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pulseColor)}></span>
        )}
        <div className={cn("relative flex h-6 w-6 items-center justify-center rounded-full", bg)}>
          <Icon className={cn("h-3.5 w-3.5", color)} />
        </div>
      </div>
      {label && <span className={cn("text-sm font-medium", color)}>{label}</span>}
    </div>
  )
}
