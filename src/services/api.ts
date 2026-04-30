const BASE_URL = "/api/innova-dinamica"

export async function login(data) {
  const res = await fetch(`${BASE_URL}/login/acessar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

export async function getProducts(token: string) {
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
