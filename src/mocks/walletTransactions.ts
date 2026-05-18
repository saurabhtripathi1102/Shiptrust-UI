export interface WalletTransaction {
  id: string
  timestamp: string
  type: "debit" | "credit"
  amount: number
  reason: string
  awb?: string
}

export const mockWalletTransactions: WalletTransaction[] = [
  { id: "TXN-001", timestamp: "2026-05-18T09:15:00Z", type: "debit", amount: 65.00, reason: "Shipping charge (0.5kg)", awb: "DEL192837465" },
  { id: "TXN-002", timestamp: "2026-05-18T10:30:00Z", type: "debit", amount: 120.00, reason: "Shipping charge (1.0kg)", awb: "XPB982736451" },
  { id: "TXN-003", timestamp: "2026-05-17T14:20:00Z", type: "credit", amount: 320.00, reason: "Dispute won reversal", awb: "ECO837465999" },
  { id: "TXN-004", timestamp: "2026-05-16T11:00:00Z", type: "credit", amount: 10000.00, reason: "Wallet Top-up via UPI" },
  { id: "TXN-005", timestamp: "2026-05-15T16:45:00Z", type: "debit", amount: 185.50, reason: "Weight discrepancy adjustment (0.5kg -> 2.1kg)", awb: "DEL192837499" },
  { id: "TXN-006", timestamp: "2026-05-14T09:12:00Z", type: "debit", amount: 85.00, reason: "Shipping charge (0.5kg)", awb: "DTD293847562" },
]
