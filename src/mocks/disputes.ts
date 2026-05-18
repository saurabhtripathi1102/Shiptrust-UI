export interface DisputeMessage {
  id: string
  sender: "seller" | "ops" | "system"
  text: string
  timestamp: string
}

export interface Dispute {
  id: string
  awb: string
  courier: string
  status: "open" | "awaiting_evidence" | "resolved_won" | "resolved_lost"
  declaredWeight: string
  scannedWeight: string
  disputedAmount: number
  slaDeadline: string
  createdAt: string
  evidence: {
    src: string
    alt: string
    metadata: {
      timestamp: string
      scaleId: string
      dimensions: string
    }
  }[]
  messages: DisputeMessage[]
}

export const mockDisputes: Dispute[] = [
  {
    id: "DSP-10492",
    awb: "DEL192837499",
    courier: "Delhivery",
    status: "open",
    declaredWeight: "0.5 kg",
    scannedWeight: "2.1 kg",
    disputedAmount: 185.50,
    slaDeadline: new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString(), // 14 hours from now
    createdAt: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
    evidence: [
      {
        src: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop",
        alt: "Box on conveyor",
        metadata: {
          timestamp: "2026-05-16 14:32:11",
          scaleId: "DEL-BOM-SCL-04",
          dimensions: "24x18x12 cm"
        }
      }
    ],
    messages: [
      {
        id: "msg-1",
        sender: "system",
        text: "Weight discrepancy flagged by courier. Declared: 0.5 kg, Scanned: 2.1 kg.",
        timestamp: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg-2",
        sender: "ops",
        text: "We have paused the billing for this difference. Please verify the scanned image and accept or dispute the charge.",
        timestamp: new Date(Date.now() - 33 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "DSP-10493",
    awb: "XPB982736452",
    courier: "XpressBees",
    status: "awaiting_evidence",
    declaredWeight: "1.2 kg",
    scannedWeight: "3.5 kg",
    disputedAmount: 240.00,
    slaDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(),
    evidence: [],
    messages: [
      {
        id: "msg-1",
        sender: "system",
        text: "Weight discrepancy flagged by courier. Declared: 1.2 kg, Scanned: 3.5 kg.",
        timestamp: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg-2",
        sender: "seller",
        text: "This is a single pair of shoes. It cannot weigh 3.5kg.",
        timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg-3",
        sender: "ops",
        text: "Understood. We are pulling the scan images from the XpressBees hub. Please allow 12 hours.",
        timestamp: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "DSP-10488",
    awb: "ECO837465999",
    courier: "Ecom Express",
    status: "resolved_won",
    declaredWeight: "0.8 kg",
    scannedWeight: "4.0 kg",
    disputedAmount: 320.00,
    slaDeadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    evidence: [
      {
        src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
        alt: "Box on conveyor scale",
        metadata: {
          timestamp: "2026-05-14 09:12:44",
          scaleId: "ECO-DEL-SCL-12",
          dimensions: "40x30x20 cm"
        }
      }
    ],
    messages: [
      {
        id: "msg-1",
        sender: "seller",
        text: "The image clearly shows someone else's hand on the scale pressing it down.",
        timestamp: new Date(Date.now() - 70 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg-2",
        sender: "ops",
        text: "You are absolutely right. We have escalated this to Ecom Express hub manager and reversed the charge immediately.",
        timestamp: new Date(Date.now() - 68 * 60 * 60 * 1000).toISOString(),
      }
    ]
  }
]
