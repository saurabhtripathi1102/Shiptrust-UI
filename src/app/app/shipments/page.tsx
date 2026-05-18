import { EmptyState } from "@/components/custom/empty-state"
import { Package } from "lucide-react"

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
        <p className="text-muted-foreground mt-1">Track and manage active shipments.</p>
      </div>
      
      <EmptyState 
        icon={Package} 
        title="No active shipments" 
        description="Shipments will appear here once you process an order."
      />
    </div>
  )
}
