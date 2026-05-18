import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Maximize2 } from "lucide-react"

interface EvidenceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  metadata?: {
    timestamp: string
    scaleId?: string
    dimensions?: string
  }
}

export function EvidenceCard({ src, alt, metadata, className, ...props }: EvidenceCardProps) {
  return (
    <div className={cn("relative group overflow-hidden rounded-xl border bg-muted/20", className)} {...props}>
      <div className="aspect-video relative">
        <Image 
          src={src} 
          alt={alt} 
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
          <div className="h-10 w-10 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm cursor-pointer">
            <Maximize2 className="h-5 w-5" />
          </div>
        </div>
        {metadata && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex flex-col gap-1 text-[10px] font-mono text-white/90">
              <div className="flex justify-between">
                <span>{metadata.timestamp}</span>
                {metadata.scaleId && <span>SCALE: {metadata.scaleId}</span>}
              </div>
              {metadata.dimensions && <div>DIMS: {metadata.dimensions}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
