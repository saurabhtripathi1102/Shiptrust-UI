import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppTopbar } from "@/components/layout/app-topbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - ShipTrust",
  description: "ShipTrust Seller Dashboard",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0 bg-background">
        <AppTopbar />
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
