import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{
      source: "/b2bizz/:path*",
      destination: `${process.env.NEXT_PUBLIC_B2BIZZ_URL ?? "http://localhost:3021/b2bizz"}/:path*`,
      permanent: false,
    }, {
      source: "/alytics/:path*",
      destination: `${process.env.NEXT_PUBLIC_ALYTICS_URL ?? "http://localhost:3015/alytics"}/:path*`,
      permanent: false,
    }, {
      source: "/orbital/:path*",
      destination: `${process.env.NEXT_PUBLIC_ORBITAL_URL ?? "http://localhost:3014/orbital"}/:path*`,
      permanent: false,
    }, {
      source: "/hulio/:path*",
      destination: `${process.env.NEXT_PUBLIC_HULIO_URL ?? "http://localhost:3013/hulio"}/:path*`,
      permanent: false,
    }];
  },
};

export default nextConfig;
