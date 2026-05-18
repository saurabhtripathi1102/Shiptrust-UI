import { EmptyState } from "@/components/custom/empty-state"
import { CreditCard } from "lucide-react"

export default function CodRemittancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">COD Remittance</h1>
        <p className="text-muted-foreground mt-1">Track your pending and completed COD payments.</p>
      </div>
      
      <EmptyState 
        icon={CreditCard} 
        title="No COD remittances" 
        description="Your D+2 COD remittances will appear here."
      />
    </div>
  )
}
