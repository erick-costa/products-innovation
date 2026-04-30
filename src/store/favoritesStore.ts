import { create } from "zustand"
import { persist } from "zustand/middleware"

type FavoritesStore = {
  favorites: string[]
  toggleFavorite: (id: string) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) => {
        const { favorites } = get()

        if (favorites.includes(id)) {
          set({
            favorites: favorites.filter((f) => f !== id),
          })
        } else {
          set({
            favorites: [...favorites, id],
          })
        }
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
)
