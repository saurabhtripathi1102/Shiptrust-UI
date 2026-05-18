import * as React from "react"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PincodeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  pincode: string
  city?: string
  state?: string
}

export function PincodeBadge({ pincode, city, state, className, ...props }: PincodeBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn(
            "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium font-mono text-secondary-foreground cursor-help",
            className
          )}
          {...props}
        >
          <MapPin className="h-3 w-3 text-muted-foreground" />
          {pincode}
        </div>
      </TooltipTrigger>
      {(city || state) && (
        <TooltipContent side="top">
          <p className="text-xs font-sans">
            {city}{city && state ? ", " : ""}{state}
          </p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
