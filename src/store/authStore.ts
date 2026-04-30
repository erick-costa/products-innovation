import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  nome_usuario: string
}

type AuthStore = {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => {
        localStorage.setItem("token", token)

        set({
          token,
          user,
        })
      },
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
