"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useSeller } from "@/hooks/useSeller"
import { format } from "date-fns"
import { Plus, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DataTable } from "@/components/custom/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { WalletTransaction } from "@/mocks/walletTransactions"
import { AwbCode } from "@/components/custom/awb-code"

export default function WalletPage() {
  const { data: seller, isLoading: isLoadingSeller } = useSeller()
  const { data: transactions, isLoading: isLoadingTxns } = useQuery({
    queryKey: ["wallet-transactions"],
    queryFn: () => api.getWalletTransactions()
  })

  const columns: ColumnDef<WalletTransaction>[] = [
    {
      accessorKey: "timestamp",
      header: "Date & Time",
      cell: ({ row }) => {
        return (
          <span className="font-mono text-sm">
            {format(new Date(row.getValue("timestamp")), "dd MMM yyyy, HH:mm")}
          </span>
        )
      },
    },
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "awb",
      header: "AWB",
      cell: ({ row }) => {
        const awb = row.getValue("awb") as string
        if (!awb) return <span className="text-muted-foreground">—</span>
        return <AwbCode awb={awb} />
      },
    },
    {
      accessorKey: "reason",
      header: "Description",
      cell: ({ row }) => <span className="max-w-[300px] truncate block" title={row.getValue("reason")}>{row.getValue("reason")}</span>,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const type = row.original.type
        const amount = parseFloat(row.getValue("amount"))
        const formatted = amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
        
        return (
          <div className={`flex items-center justify-end gap-1 font-mono font-medium ${type === 'credit' ? 'text-success' : ''}`}>
            {type === 'credit' ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
            {type === 'credit' ? '+' : '-'}₹{formatted}
          </div>
        )
      },
    },
  ]

  if (isLoadingSeller || isLoadingTxns) {
    return <div className="p-8 animate-pulse text-muted-foreground">Loading wallet...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet & Billing</h1>
          <p className="text-muted-foreground mt-1">Manage your prepaid shipping balance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download Statement
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Recharge Wallet
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight font-mono">
              ₹{seller?.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-primary-foreground/80 mt-2">
              Auto-recharge is disabled.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Recharges (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">₹25,000.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spends (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">₹14,280.50</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A complete ledger of every deduction and credit to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={transactions || []} 
            searchKey="awb" 
            searchPlaceholder="Search by AWB..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
