"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Product } from "@/types/product"
import { formatPrice } from "@/utils/formatPrice"
import { useFavoritesStore } from "@/store/favoritesStore"

type Props = {
  product: Product
  onOpen: (product: Product) => void
}

export default function ProductCard({ product, onOpen }: Props) {
  const { favorites, toggleFavorite } = useFavoritesStore()

  const isFavorite = favorites.includes(product.codigo)

  return (
    <div className="relative flex flex-col items-center">
      <div className="text-center mb-2">
        <h2
          className="text-sm font-semibold leading-tight line-clamp-1"
          title={product.nome}
        >
          {product.nome}
        </h2>
        <span className="text-xs text-gray-500">Código: {product.codigo}</span>
      </div>

      <div
        className="
          relative
          bg-white
          shadow-sm
          border
          border-gray-300
          p-4
          pt-6
          w-full
          flex
          flex-col
          justify-between
        "
      >
        <button
          aria-label="Favoritar produto"
          onClick={() => toggleFavorite(product.codigo)}
          className="
            absolute
            top-3
            left-3
            rounded-full
          bg-white/10
            backdrop-blur
            transition
            hover:bg-white
            hover:scale-110
            active:scale-95
          "
        >
          <Heart
            className={`
              w-5 h-5
              transition
              ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }
            `}
          />
        </button>

        <span
          className="
            absolute
            top-0
            right-0
            text-xs
            font-semibold
            bg-gray-100
            text-sky-500
            px-2
            py-1
          "
        >
          EXCLUSIVO!
        </span>

        <div className="relative w-full h-40 mb-4">
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            className="object-contain"
          />
        </div>

        <p
          className="text-sm text-gray-700 line-clamp-2 mb-2"
          title={product.descricao}
        >
          {product.descricao}
        </p>

        <span className="text-lg font-bold flex justify-end">
          {formatPrice(product.preco)}
        </span>
      </div>

      <button
        onClick={() => onOpen(product)}
        className="
          mt-3
          bg-[#7dc700]
          text-white
          text-sm
          px-6
          py-2
          hover:bg-lime-800
          focus:outline-none
          w-full
        "
      >
        CONFIRA
      </button>
    </div>
  )
}
