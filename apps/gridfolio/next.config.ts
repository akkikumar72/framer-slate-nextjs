import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/", destination: "/gridfolio", permanent: false },
    ];
  },
};
export default config;
