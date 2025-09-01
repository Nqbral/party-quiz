import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@love-letter/shared'],
  devIndicators: false,
};

export default nextConfig;
