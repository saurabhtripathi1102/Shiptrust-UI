"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Timer } from "lucide-react"

interface SlaCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: string | Date
}

export function SlaCountdown({ targetDate, className, ...props }: SlaCountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState("")
  const [isBreached, setIsBreached] = React.useState(false)
  const [isWarning, setIsWarning] = React.useState(false)

  React.useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        setIsBreached(true)
        setTimeLeft("SLA Breached")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      setIsWarning(hours < 12)
      setTimeLeft(`${hours}h ${minutes}m remaining`)
    }

    calculateTime()
    const timer = setInterval(calculateTime, 60000) // update every minute
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        isBreached ? "text-destructive" : isWarning ? "text-warning" : "text-muted-foreground",
        className
      )} 
      {...props}
    >
      <Timer className="h-4 w-4" />
      <span>{timeLeft}</span>
    </div>
  )
}
