import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? undefined,
  turbopack: {
    root: path.join(__dirname, '../')
  }
};

export default nextConfig;
