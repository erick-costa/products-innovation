import { getProducts } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export function useProducts(token: string) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(token),
  })
}
