"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/services/api"
import { useAuthStore } from "@/store/authStore"
import { User, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const [remember, setRemember] = useState(false)

  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  async function handleLogin() {
    try {
      const data = await login(email, senha)

      setAuth(data.token_de_acesso, data.dados_usuario)

      document.cookie = `token=${data.token_de_acesso}`

      router.push("/products")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro inesperado")
      }
    }
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >
      <div className="w-full max-w-xl text-center">
        <h1 className="text-[#7dc700] text-3xl font-bold mb-10">
          Bem-vindo a Innovation Brindes
        </h1>

        <div className="bg-[#7dc700] p-20 rounded-2xl shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleLogin()
            }}
          >
            <div className="relative mb-4">
              <User className="absolute left-5 top-5 w-5 h-5 text-gray-500" />
              <input
                placeholder="Usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  pl-12
                  p-5
                  rounded-full
                  outline-none
                  bg-white
                "
              />
            </div>

            <div className="relative mb-4">
              <Lock className="absolute left-5 top-5 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="
                  w-full
                  pl-12
                  p-5
                  rounded-full
                  outline-none
                  bg-white
                "
              />
            </div>

            {error && <p className="text-red-200 text-sm mb-3">{error}</p>}

            <div className="flex items-center justify-between mb-4 text-white text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Manter logado
              </label>

              <button type="button" className="underline hover:text-gray-200">
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              className="
                bg-white
                text-gray-600
                p-5
                rounded-full
                hover:bg-gray-200
                transition
                w-1/2
                mt-4
              "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
