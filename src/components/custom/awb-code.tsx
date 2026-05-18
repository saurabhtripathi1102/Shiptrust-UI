"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface AwbCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  awb: string
  courier?: string
}

export function AwbCode({ awb, courier, className, ...props }: AwbCodeProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(awb)
    setCopied(true)
    toast.success(`AWB ${awb} copied to clipboard`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <span className="font-mono text-sm tracking-tight text-foreground">
        {awb}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 text-muted-foreground hover:text-foreground"
        onClick={handleCopy}
        title="Copy AWB"
      >
        {copied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        <span className="sr-only">Copy AWB</span>
      </Button>
    </div>
  )
}
