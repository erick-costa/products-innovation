import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://imgprodutos.s3.us-east-2.amazonaws.com/**"),
    ],
  },
}

export default nextConfig
