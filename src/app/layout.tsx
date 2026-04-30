import Providers from "./providers"

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
