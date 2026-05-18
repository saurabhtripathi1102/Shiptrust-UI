import { currentSeller } from "@/mocks/sellers"
import { mockCouriers } from "@/mocks/couriers"
import { mockOrders } from "@/mocks/orders"
import { mockDisputes } from "@/mocks/disputes"
import { mockWalletTransactions } from "@/mocks/walletTransactions"
import { mockAnalytics } from "@/mocks/analytics"

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const MOCK_LATENCY = 400

export const api = {
  async getSeller() {
    await delay(MOCK_LATENCY)
    return currentSeller
  },
  
  async getCouriers() {
    await delay(MOCK_LATENCY)
    return mockCouriers
  },
  
  async getOrders(statusFilter?: string) {
    await delay(MOCK_LATENCY)
    if (statusFilter && statusFilter !== "all") {
      return mockOrders.filter(o => o.status === statusFilter)
    }
    return mockOrders
  },
  
  async getDisputes(statusFilter?: string) {
    await delay(MOCK_LATENCY)
    if (statusFilter && statusFilter !== "all") {
      return mockDisputes.filter(d => d.status === statusFilter)
    }
    return mockDisputes
  },
  
  async getWalletTransactions() {
    await delay(MOCK_LATENCY)
    return mockWalletTransactions
  },
  
  async getAnalytics() {
    await delay(MOCK_LATENCY)
    return mockAnalytics
  }
}
