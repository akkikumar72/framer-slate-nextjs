import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/', destination: '/hulio', permanent: false }];
  },
};
export default nextConfig;
