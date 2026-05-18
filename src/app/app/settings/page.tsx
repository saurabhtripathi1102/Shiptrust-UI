import { EmptyState } from "@/components/custom/empty-state"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>
      
      <EmptyState 
        icon={Settings} 
        title="Settings" 
        description="Configure your ShipTrust account settings."
      />
    </div>
  )
}
