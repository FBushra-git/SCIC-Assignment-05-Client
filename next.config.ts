import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://skillforge-ai-server.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
