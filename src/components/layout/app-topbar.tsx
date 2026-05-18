"use client"

import * as React from "react"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSeller } from "@/hooks/useSeller"

export function AppTopbar() {
  const { data: seller } = useSeller()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6 w-full sticky top-0 z-30">
      <div className="flex flex-1 items-center gap-4">
        <Button variant="outline" className="hidden sm:flex text-muted-foreground w-64 justify-start gap-2 h-9 px-3">
          <Search className="h-4 w-4" />
          <span className="text-sm font-normal">Search orders, AWB...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        {/* Always visible wallet balance pill */}
        {seller && (
          <div className="hidden sm:flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium hover:bg-muted cursor-pointer transition-colors">
            <span className="text-muted-foreground">Wallet:</span>
            <span className="font-mono text-foreground tracking-tight">₹{seller.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          </div>
        )}
        
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        
        <Avatar className="h-8 w-8 cursor-pointer border">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {seller?.name.substring(0, 2).toUpperCase() || "AK"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
