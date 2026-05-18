import * as React from "react"
import { cn } from "@/lib/utils"

interface TrustScoreBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number // 0 to 100
}

export function TrustScoreBadge({ score, className, ...props }: TrustScoreBadgeProps) {
  let color = "text-success"
  if (score < 70) {
    color = "text-destructive"
  } else if (score < 90) {
    color = "text-warning"
  }

  const circumference = 62.83
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-2.5 py-1 shadow-sm",
        className
      )}
      title={`Trust Score: ${score}/100`}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" className="transform -rotate-90">
          <circle 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            fill="transparent" 
            className="text-muted/30"
          />
          <circle 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            fill="transparent" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <span className={cn("absolute text-[8px] font-bold font-mono tracking-tighter", color)}>
          {score}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold leading-none text-foreground uppercase tracking-wider">Trust Score</span>
      </div>
    </div>
  )
}
