import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h1>
      <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
        No hidden fees. No minimum commitments. Only pay for the shipments you send.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {/* Basic Plan */}
        <div className="bg-card rounded-2xl border p-8 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Basic</h3>
          <p className="text-muted-foreground mb-6">For emerging D2C brands</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">₹0</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> D+4 COD Remittance
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> 48-Hour Dispute SLA
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Basic Analytics
            </li>
          </ul>
          <Button className="w-full" variant="outline">Get Started</Button>
        </div>

        {/* Growth Plan */}
        <div className="bg-card rounded-2xl border-2 border-primary p-8 flex flex-col relative">
          <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <h3 className="text-xl font-bold mb-2">Growth</h3>
          <p className="text-muted-foreground mb-6">For scaling operations</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">₹1,999</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> D+2 COD Remittance
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> 48-Hour Dispute SLA
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Photo Evidence Scans
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Advanced Analytics
            </li>
          </ul>
          <Button className="w-full">Start 14-Day Trial</Button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-card rounded-2xl border p-8 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Enterprise</h3>
          <p className="text-muted-foreground mb-6">For high-volume shippers</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">Custom</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Early COD Remittance
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Custom Shipping Rates
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Dedicated Account Manager
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-success font-bold">✓</span> Custom Integrations
            </li>
          </ul>
          <Button className="w-full" variant="outline">Contact Sales</Button>
        </div>
      </div>
    </div>
  )
}
