"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/services/api"
import { useAuthStore } from "@/store/authStore"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")

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
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 border rounded">
        <h1 className="text-xl mb-4">Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-black text-white p-2">
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
