import Link from "next/link"

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/40 text-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight mb-4">
              <div className="bg-primary text-primary-foreground h-6 w-6 rounded flex items-center justify-center text-sm font-black">
                S
              </div>
              ShipTrust
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The shipping platform that never silently deducts from your wallet.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#integrations" className="hover:text-foreground">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#docs" className="hover:text-foreground">Documentation</Link></li>
              <li><Link href="#api" className="hover:text-foreground">API Reference</Link></li>
              <li><Link href="#support" className="hover:text-foreground">Support Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/legal/compliance" className="hover:text-foreground">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
          <p>© {new Date().getFullYear()} ShipTrust Logistics Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
