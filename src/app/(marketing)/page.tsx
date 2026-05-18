import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-24 md:py-32 bg-background border-b text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-fraunces font-bold tracking-tight text-foreground mb-6 leading-tight">
            Stop paying for weight <br className="hidden md:block"/> you never shipped.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            ShipTrust is India's transparency-first shipping platform. Every charge explained. Every dispute resolved in 48 hours. Or it's reversed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-8 text-base font-semibold" asChild>
              <Link href="/signup">Start Shipping Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How we're different section */}
      <section id="features" className="py-24 bg-muted/30 border-b">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How we're different</h2>
            <p className="text-muted-foreground text-lg">We win on trust, not on feature count.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold text-xl">48</span>
              </div>
              <h3 className="text-xl font-bold mb-3">48-Hour Dispute SLA</h3>
              <p className="text-muted-foreground">Every weight discrepancy dispute is resolved in 48 hours. If we miss the SLA, the charge is automatically reversed.</p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold text-xl">D+2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">D+2 COD Remittance</h3>
              <p className="text-muted-foreground">Get your COD payments settled 2 days after delivery, consistently. No holding periods, no surprises.</p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold text-xl">100%</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Photo Evidence on Every Scan</h3>
              <p className="text-muted-foreground">We pull high-res photos and scale metadata from courier hubs so you have undeniable proof for every dispute.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison section */}
      <section className="py-24 bg-background border-b">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">The Transparency Standard</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 md:p-6 font-semibold w-1/2">Feature</th>
                  <th className="p-4 md:p-6 font-semibold text-center text-primary border-l">ShipTrust</th>
                  <th className="p-4 md:p-6 font-semibold text-center text-muted-foreground border-l">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  "Guaranteed 48-hour dispute resolution",
                  "Photo evidence for all weight disputes",
                  "Cost-per-delivered-order analytics",
                  "Line-item wallet transparency",
                  "D+2 COD remittance"
                ].map((feature, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm font-medium">{feature}</td>
                    <td className="p-4 md:p-6 text-center border-l bg-primary/5">
                      <CheckCircle2 className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="p-4 md:p-6 text-center border-l text-muted-foreground">
                      —
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Trust Strip */}
      <section className="py-16 bg-muted/20">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Integrated with India's best couriers</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            <span className="font-bold text-xl">Delhivery</span>
            <span className="font-bold text-xl">XpressBees</span>
            <span className="font-bold text-xl">DTDC</span>
            <span className="font-bold text-xl">Ecom Express</span>
            <span className="font-bold text-xl">Shadowfax</span>
          </div>
        </div>
      </section>
    </div>
  )
}
