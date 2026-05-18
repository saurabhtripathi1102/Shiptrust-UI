"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { format } from "date-fns"
import { Search, Filter, MessageSquare, AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EvidenceCard } from "@/components/custom/evidence-card"
import { SlaCountdown } from "@/components/custom/sla-countdown"
import { AwbCode } from "@/components/custom/awb-code"

export default function DisputesPage() {
  const [selectedDisputeId, setSelectedDisputeId] = React.useState<string | null>(null)
  const { data: disputes, isLoading } = useQuery({
    queryKey: ["disputes"],
    queryFn: () => api.getDisputes()
  })

  // We set the first dispute as selected by default if none is selected
  React.useEffect(() => {
    if (disputes && disputes.length > 0 && !selectedDisputeId) {
      setSelectedDisputeId(disputes[0].id)
    }
  }, [disputes, selectedDisputeId])

  const selectedDispute = disputes?.find(d => d.id === selectedDisputeId)

  if (isLoading) return <div className="p-8 animate-pulse text-muted-foreground">Loading disputes...</div>

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 md:-m-6 lg:-m-8">
      {/* Left Pane - List */}
      <div className="w-full md:w-[350px] lg:w-[400px] border-r flex flex-col bg-muted/10">
        <div className="p-4 border-b space-y-4 bg-background z-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Disputes</h1>
            <p className="text-sm text-muted-foreground mt-1">Weight discrepancies & issues</p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search AWB or ID..." className="pl-9 h-9" />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {disputes?.map((dispute) => (
            <div 
              key={dispute.id}
              onClick={() => setSelectedDisputeId(dispute.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${selectedDispute?.id === dispute.id ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' : 'bg-card hover:bg-muted/50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold text-muted-foreground">{dispute.id}</span>
                {dispute.status === "open" && <span className="flex h-2 w-2 rounded-full bg-destructive" />}
              </div>
              <div className="mb-2">
                <p className="font-medium font-mono text-sm tracking-tight">{dispute.awb}</p>
                <p className="text-xs text-muted-foreground mt-1">{dispute.courier}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="font-bold text-sm tracking-tight font-mono text-destructive">₹{dispute.disputedAmount.toFixed(2)}</p>
                {dispute.status === "open" || dispute.status === "awaiting_evidence" ? (
                  <SlaCountdown targetDate={dispute.slaDeadline} />
                ) : (
                  <span className={`text-xs font-semibold ${dispute.status === 'resolved_won' ? 'text-success' : 'text-destructive'}`}>
                    {dispute.status === 'resolved_won' ? 'Won' : 'Lost'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane - Details */}
      {selectedDispute ? (
        <div className="hidden md:flex flex-1 flex-col h-full bg-background overflow-hidden">
          {/* Detail Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center bg-card">
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
                Dispute details 
                <span className="text-sm font-normal text-muted-foreground ml-2">#{selectedDispute.id}</span>
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 font-mono">
                  <AwbCode awb={selectedDispute.awb} />
                </span>
                <span>•</span>
                <span>{selectedDispute.courier}</span>
                <span>•</span>
                <span>{format(new Date(selectedDispute.createdAt), "dd MMM yyyy, HH:mm")}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">Escalate</Button>
              {selectedDispute.status === 'open' && (
                <Button>Submit Evidence</Button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-4xl mx-auto space-y-8">
              
              {/* Discrepancy Overview */}
              <Card>
                <CardContent className="p-0 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x">
                  <div className="flex-1 p-6 text-center">
                    <p className="text-sm text-muted-foreground font-medium mb-1">Declared Weight</p>
                    <p className="text-2xl font-bold font-mono">{selectedDispute.declaredWeight}</p>
                  </div>
                  <div className="flex-1 p-6 text-center bg-destructive/5">
                    <p className="text-sm text-destructive font-medium mb-1">Scanned Weight</p>
                    <p className="text-2xl font-bold font-mono text-destructive">{selectedDispute.scannedWeight}</p>
                  </div>
                  <div className="flex-1 p-6 text-center">
                    <p className="text-sm text-muted-foreground font-medium mb-1">Disputed Amount</p>
                    <p className="text-2xl font-bold font-mono text-destructive">₹{selectedDispute.disputedAmount.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Evidence Section */}
              <div>
                <h3 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Courier Evidence
                </h3>
                {selectedDispute.evidence.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDispute.evidence.map((ev, i) => (
                      <EvidenceCard
                        key={i}
                        src={ev.src}
                        alt={ev.alt}
                        metadata={ev.metadata}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border rounded-xl bg-muted/30 text-center flex flex-col items-center">
                    <AlertTriangle className="h-8 w-8 text-warning mb-3 opacity-80" />
                    <p className="font-medium">Evidence Pending</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">The courier has not provided the scale images yet. We are actively following up with the hub.</p>
                  </div>
                )}
              </div>

              {/* Communication Timeline */}
              <div>
                <h3 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" /> Resolution Thread
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-muted ml-2">
                  {selectedDispute.messages.map((msg) => (
                    <div key={msg.id} className="relative pl-6">
                      <div className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-background ${
                        msg.sender === 'system' ? 'bg-muted-foreground' : 
                        msg.sender === 'ops' ? 'bg-primary' : 'bg-success'
                      }`} />
                      <div className={`p-4 rounded-xl inline-block max-w-[85%] ${
                        msg.sender === 'seller' ? 'bg-primary/10 border border-primary/20' : 
                        msg.sender === 'system' ? 'bg-muted text-muted-foreground' : 'bg-card border shadow-sm'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-xs uppercase tracking-wider">
                            {msg.sender === 'seller' ? 'You' : msg.sender === 'ops' ? 'ShipTrust Support' : 'System'}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{format(new Date(msg.timestamp), "MMM dd, HH:mm")}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Reply Box */}
          {selectedDispute.status !== 'resolved_won' && selectedDispute.status !== 'resolved_lost' && (
            <div className="p-4 border-t bg-card">
              <div className="flex gap-2 max-w-4xl mx-auto">
                <Input placeholder="Type your response or provide evidence..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-muted/5">
          <div className="text-center text-muted-foreground">
            <ShieldAlert className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Select a dispute to view details</p>
          </div>
        </div>
      )}
    </div>
  )
}
