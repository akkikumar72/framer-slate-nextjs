import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/", destination: "/b2bizz", permanent: false }];
  },
};

export default config;
