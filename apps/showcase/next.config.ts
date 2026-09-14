import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{
      source: "/hulio/:path*",
      destination: `${process.env.NEXT_PUBLIC_HULIO_URL ?? "http://localhost:3013/hulio"}/:path*`,
      permanent: false,
    }];
  },
};

export default nextConfig;
