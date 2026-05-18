import { ShipmentStatus } from "@/components/custom/status-pill"

export interface Order {
  id: string
  awb: string
  channel: "Shopify" | "WooCommerce" | "Amazon" | "Flipkart" | "Manual"
  buyer: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  product: {
    name: string
    sku: string
    value: number
    weight: string
    dimensions: string
  }
  shipping: {
    courier: string
    mode: "Surface" | "Air"
    charges: number
    scannedWeight?: string
  }
  payment: {
    method: "COD" | "Prepaid"
    amount: number
  }
  status: ShipmentStatus
  createdAt: string
}

export const mockOrders: Order[] = [
  {
    id: "ORD-92837",
    awb: "DEL192837465",
    channel: "Shopify",
    buyer: {
      name: "Rohan Sharma",
      phone: "+91 9876543210",
      address: "123, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    product: {
      name: "Cotton Casual Shirt",
      sku: "SHIRT-M-BLU",
      value: 1299,
      weight: "0.4 kg",
      dimensions: "20x15x5 cm"
    },
    shipping: {
      courier: "Delhivery",
      mode: "Surface",
      charges: 65,
      scannedWeight: "0.42 kg"
    },
    payment: {
      method: "Prepaid",
      amount: 1299
    },
    status: "delivered",
    createdAt: "2026-05-15T10:30:00Z"
  },
  {
    id: "ORD-92838",
    awb: "XPB982736451",
    channel: "WooCommerce",
    buyer: {
      name: "Priya Patel",
      phone: "+91 9876543211",
      address: "45, Park Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016"
    },
    product: {
      name: "Silk Saree",
      sku: "SAREE-SILK-RED",
      value: 3499,
      weight: "0.8 kg",
      dimensions: "30x20x5 cm"
    },
    shipping: {
      courier: "XpressBees",
      mode: "Air",
      charges: 120,
    },
    payment: {
      method: "COD",
      amount: 3499
    },
    status: "in_transit",
    createdAt: "2026-05-17T14:20:00Z"
  },
  {
    id: "ORD-92839",
    awb: "DTD293847562",
    channel: "Amazon",
    buyer: {
      name: "Amit Kumar",
      phone: "+91 9876543212",
      address: "Sector 14",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122001"
    },
    product: {
      name: "Wireless Earbuds",
      sku: "EAR-WRLS-BLK",
      value: 2499,
      weight: "0.2 kg",
      dimensions: "10x10x5 cm"
    },
    shipping: {
      courier: "DTDC",
      mode: "Air",
      charges: 85,
    },
    payment: {
      method: "Prepaid",
      amount: 2499
    },
    status: "out_for_delivery",
    createdAt: "2026-05-18T08:15:00Z"
  },
  {
    id: "ORD-92840",
    awb: "ECO837465921",
    channel: "Shopify",
    buyer: {
      name: "Neha Singh",
      phone: "+91 9876543213",
      address: "C-42, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    product: {
      name: "Running Shoes",
      sku: "SHOE-RUN-42",
      value: 4999,
      weight: "1.2 kg",
      dimensions: "35x25x15 cm"
    },
    shipping: {
      courier: "Ecom Express",
      mode: "Surface",
      charges: 145,
      scannedWeight: "1.25 kg"
    },
    payment: {
      method: "COD",
      amount: 4999
    },
    status: "rto_initiated",
    createdAt: "2026-05-10T11:45:00Z"
  }
]
