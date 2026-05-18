import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-24">
      <div className="bg-card border rounded-2xl p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
        <p className="text-muted-foreground text-sm mb-8">Start shipping with complete transparency</p>
        
        <form className="space-y-4 text-left mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="firstName">First name</label>
              <Input id="firstName" placeholder="Aarav" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
              <Input id="lastName" placeholder="Kapoor" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Work Email</label>
            <Input id="email" type="email" placeholder="name@company.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phone">Phone Number</label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" />
          </div>
          <Link href="/app" className="block mt-6">
            <Button className="w-full">Create Account</Button>
          </Link>
        </form>
        
        <p className="mt-8 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
