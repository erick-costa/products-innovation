"use client"

import { Phone, Mail, User } from "lucide-react"
import Image from "next/image"
import { useAuthStore } from "@/store/authStore"

export default function Header() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="w-full bg-[#7dc700]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-innovation.png"
            alt="Logo da empresa"
            width={120}
            height={40}
            priority
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Telefone"
            className="
              p-2
              rounded-full
              hover:bg-gray-100
              transition
            "
          >
            <Phone className="w-5 h-5 text-white" />
          </button>

          <button
            aria-label="Email"
            className="
              p-2
              rounded-full
              hover:bg-gray-100
              transition
            "
          >
            <Mail className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-2">
            <div
              className="
                p-2
                rounded-full
                bg-gray-100
              "
            >
              <User className="w-5 h-5 text-gray-700" />
            </div>

            <span className="text-sm font-medium text-white">
              {user?.nome_usuario ?? "Usuário"}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
