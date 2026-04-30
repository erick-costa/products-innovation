import { LoginResponse } from "@/types/auth"
import { Product } from "@/types/product"

const BASE_URL =
  "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica"

export async function login(
  email: string,
  senha: string,
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/login/acessar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })

  const data: LoginResponse = await res.json()

  if (data.status === "0") {
    throw new Error(data.message)
  }

  return data
}

export async function getProducts(token: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/produtos/listar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    throw new Error("unauthorized")
  }

  return res.json()
}
