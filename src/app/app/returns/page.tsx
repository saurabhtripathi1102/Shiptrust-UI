import { EmptyState } from "@/components/custom/empty-state"
import { Undo2 } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Returns</h1>
        <p className="text-muted-foreground mt-1">Manage customer returns and RTOs.</p>
      </div>
      
      <EmptyState 
        icon={Undo2} 
        title="No returns" 
        description="Customer returns and RTOs will appear here."
      />
    </div>
  )
}
