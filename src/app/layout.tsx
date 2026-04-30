import Providers from "./providers"
import "./globals.css"

export const metadata = {
  title: "Innovation Brindes",
  description: "Listagem de produtos para brindes personalizados",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
