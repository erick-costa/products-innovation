import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/services/api"
import { Product } from "@/types/product"

export function useProducts(token: string) {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => getProducts(token),
    enabled: !!token,
  })
}
