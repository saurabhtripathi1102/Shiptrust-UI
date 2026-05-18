import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CourierChipProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  logo?: string
  size?: "sm" | "md"
}

export function CourierChip({ name, logo, size = "md", className, ...props }: CourierChipProps) {
  const fallback = name.substring(0, 2).toUpperCase()
  
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <Avatar className={cn(size === "sm" ? "h-5 w-5" : "h-6 w-6")}>
        {logo && <AvatarImage src={logo} alt={name} />}
        <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground border">
          {fallback}
        </AvatarFallback>
      </Avatar>
      <span className={cn("font-medium", size === "sm" ? "text-xs" : "text-sm")}>
        {name}
      </span>
    </div>
  )
}
