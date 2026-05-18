export const mockAnalytics = {
  overview: {
    totalShipments: 1245,
    delivered: 1102,
    rto: 98,
    inTransit: 45,
    avgShippingCost: 82.50,
  },
  costPerDelivered: [
    { orderValue: 500, cost: 65, rto: false },
    { orderValue: 1200, cost: 185, rto: true },
    { orderValue: 2500, cost: 90, rto: false },
    { orderValue: 800, cost: 145, rto: true },
    { orderValue: 3400, cost: 120, rto: false },
    { orderValue: 1500, cost: 85, rto: false },
    { orderValue: 4999, cost: 320, rto: true },
    { orderValue: 999, cost: 75, rto: false },
  ],
  pincodePerformance: [
    { pincode: "110001", orders: 145, rtoRate: 12.4, avgCost: 65, recommendation: "Good performance" },
    { pincode: "400001", orders: 120, rtoRate: 8.5, avgCost: 70, recommendation: "Excellent performance" },
    { pincode: "812001", orders: 45, rtoRate: 52.0, avgCost: 145, recommendation: "Disable COD - High RTO risk" },
    { pincode: "700016", orders: 85, rtoRate: 15.2, avgCost: 85, recommendation: "Good performance" },
    { pincode: "560038", orders: 110, rtoRate: 10.1, avgCost: 75, recommendation: "Good performance" },
  ],
  shipmentsTrend: [
    { date: "May 12", picked: 45, inTransit: 30, delivered: 40 },
    { date: "May 13", picked: 52, inTransit: 35, delivered: 42 },
    { date: "May 14", picked: 38, inTransit: 40, delivered: 35 },
    { date: "May 15", picked: 65, inTransit: 32, delivered: 45 },
    { date: "May 16", picked: 48, inTransit: 45, delivered: 50 },
    { date: "May 17", picked: 55, inTransit: 38, delivered: 60 },
    { date: "May 18", picked: 42, inTransit: 42, delivered: 55 },
  ]
}
