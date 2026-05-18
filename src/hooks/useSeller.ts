"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useSeller() {
  return useQuery({
    queryKey: ["seller"],
    queryFn: () => api.getSeller()
  })
}
