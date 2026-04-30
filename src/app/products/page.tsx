"use client"

import { useAuthStore } from "@/store/authStore"
import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import Header from "@/components/Header"

export default function ProdutosPage() {
  const token = useAuthStore((state) => state.token)

  const { data, isLoading, error } = useProducts(token)

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Erro ao carregar</p>
  }

  return (
    <main>
      <Header />

      <div className="max-w-7xl mx-auto px-4 my-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-11">
          {data?.map((product: Product) => (
            <ProductCard
              key={product.codigo}
              product={product}
              onOpen={(p) => console.log("abrir modal", p)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
