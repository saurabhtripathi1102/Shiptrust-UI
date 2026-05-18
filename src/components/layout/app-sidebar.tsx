"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Box, 
  CreditCard, 
  Home, 
  LifeBuoy,
  Package, 
  Settings, 
  ShieldAlert, 
  Truck, 
  Undo2,
  Wallet
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { useSeller } from "@/hooks/useSeller"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  { title: "Dashboard", url: "/app", icon: Home, exact: true },
  { title: "Orders", url: "/app/orders", icon: Box },
  { title: "Shipments", url: "/app/shipments", icon: Package },
  { title: "Returns", url: "/app/returns", icon: Undo2 },
  { title: "Disputes", url: "/app/disputes", icon: ShieldAlert, badge: 4 },
  { title: "Wallet", url: "/app/wallet", icon: Wallet },
  { title: "COD Remittance", url: "/app/cod", icon: CreditCard },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Couriers", url: "/app/couriers", icon: Truck },
  { title: "Settings", url: "/app/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { data: seller } = useSeller()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-14 flex items-center justify-center border-b px-6">
        <Link href="/app" className="flex items-center gap-2 font-bold text-lg tracking-tight w-full">
          <div className="bg-primary text-primary-foreground h-6 w-6 rounded flex items-center justify-center text-sm font-black">
            S
          </div>
          ShipTrust
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? pathname === item.url 
                  : pathname.startsWith(item.url)
                  
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="bg-destructive text-destructive-foreground font-mono">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <LifeBuoy />
                <span>Support</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {seller && (
            <SidebarMenuItem className="mt-2">
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    {seller.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{seller.business.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{seller.email}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
