"use client"

import { useAuthStore } from "@/store/authStore"
import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import Header from "@/components/Header"
import { useState } from "react"
import ProductModal from "@/components/ProductModal"
import { useInView } from "react-intersection-observer"

export default function ProdutosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)
  const token = useAuthStore((state) => state.token)
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { data, isLoading } = useProducts(token)

  const ITEMS_PER_PAGE = 10

  const visibleProducts = data?.slice(0, page * ITEMS_PER_PAGE) ?? []

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (
        inView &&
        data &&
        visibleProducts.length < data.length &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true)

        setTimeout(() => {
          setPage((prev) => prev + 1)
          setIsLoadingMore(false)
        }, 500)
      }
    },
  })

  return (
    <main>
      <Header />

      {!isLoading ? (
        <div className="max-w-7xl mx-auto px-4 my-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-11">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.codigo}
                product={product}
                onOpen={(p) => {
                  setSelectedProduct(p)
                  setOpen(true)
                }}
              />
            ))}

            <div ref={ref} className="h-10" />

            {visibleProducts.length < (data?.length || 0) && (
              <p className="w-full text-center mt-4 text-gray-500">
                Carregando mais...
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="w-full text-center mt-4 text-gray-500">Carregando...</p>
      )}

      <ProductModal
        product={selectedProduct}
        open={open}
        onOpenChange={setOpen}
      />
    </main>
  )
}
