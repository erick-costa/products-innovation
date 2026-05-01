"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import Image from "next/image"
import { Product } from "@/types/product"
import { formatPrice } from "@/utils/formatPrice"

type Props = {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProductModal({ product, open, onOpenChange }: Props) {
  if (!product) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed inset-0
            bg-black/50
            backdrop-blur-sm
            animate-in fade-in
          "
        />

        <Dialog.Content
          className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[90%] max-w-lg
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            outline-none
          "
        >
          <Dialog.Close
            aria-label="Fechar modal"
            className="
              absolute
              top-4 right-4
              p-2
              rounded-full
              hover:bg-gray-100
            "
          >
            <X className="w-5 h-5" />
          </Dialog.Close>

          <Dialog.Title className="text-lg font-bold mb-4">
            {product.nome}
          </Dialog.Title>

          <div className="relative w-full h-48 mb-4">
            <Image
              src={product.imagem}
              alt={product.nome}
              fill
              className="object-contain"
            />
          </div>

          <Dialog.Description className="text-sm text-gray-600 mb-4">
            {product.descricao}
          </Dialog.Description>

          <span className="text-xl font-bold text-green-600">
            {formatPrice(product.preco)}
          </span>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
