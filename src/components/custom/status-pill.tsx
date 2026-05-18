import * as React from "react"
import { cn } from "@/lib/utils"

export type ShipmentStatus =
  | "new"
  | "label_generated"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "rto_initiated"
  | "rto_delivered"
  | "lost"
  | "damaged"

const statusConfig: Record<ShipmentStatus, { label: string; dot: string; bg: string; text: string }> = {
  new: { label: "New", dot: "bg-muted-foreground", bg: "bg-muted/30", text: "text-muted-foreground" },
  label_generated: { label: "Label Generated", dot: "bg-info", bg: "bg-info/10", text: "text-info" },
  picked_up: { label: "Picked Up", dot: "bg-info", bg: "bg-info/10", text: "text-info" },
  in_transit: { label: "In Transit", dot: "bg-info", bg: "bg-info/10", text: "text-info" },
  out_for_delivery: { label: "Out for Delivery", dot: "bg-warning", bg: "bg-warning/10", text: "text-warning" },
  delivered: { label: "Delivered", dot: "bg-success", bg: "bg-success/10", text: "text-success" },
  rto_initiated: { label: "RTO Initiated", dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  rto_delivered: { label: "RTO Delivered", dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  lost: { label: "Lost", dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  damaged: { label: "Damaged", dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive" },
}

interface StatusPillProps extends React.HTMLAttributes<HTMLDivElement> {
  status: ShipmentStatus
}

export function StatusPill({ status, className, ...props }: StatusPillProps) {
  const config = statusConfig[status] || statusConfig.new

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium border",
        config.bg,
        config.text,
        "border-transparent",
        className
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </div>
  )
}
