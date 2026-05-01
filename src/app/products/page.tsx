"use client"

import { useAuthStore } from "@/store/authStore"
import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import Header from "@/components/Header"
import { useState } from "react"
import ProductModal from "@/components/ProductModal"
import { useInView } from "react-intersection-observer"
import { useFavoritesStore } from "@/store/favoritesStore"

export default function ProdutosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)
  const token = useAuthStore((state) => state.token)
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  const { data, isLoading } = useProducts(token)
  const favorites = useFavoritesStore((state) => state.favorites)

  const ITEMS_PER_PAGE = 10

  const visibleProducts = data?.slice(0, page * ITEMS_PER_PAGE) ?? []

  const filteredProducts = showFavorites
    ? visibleProducts.filter((product) => favorites.includes(product.codigo))
    : visibleProducts

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

      <div className="max-w-7xl mx-auto mt-8 px-4  flex items-center justify-between mb-4">
        <h1 className="text-2xl">Produtos</h1>

        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
          Mostrar apenas favoritos
        </label>
      </div>

      {!isLoading ? (
        <div className="max-w-7xl w-full mx-auto px-4 my-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-11">
            {filteredProducts.map((product) => (
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
          </div>
          {visibleProducts.length < (data?.length || 0) && (
            <p className="w-full text-center mt-4 text-gray-500">
              Carregando mais...
            </p>
          )}

          {filteredProducts.length === 0 && (
            <p className="w-full text-center mt-10 text-gray-500">
              Nenhum produto favorito encontrado
            </p>
          )}
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
