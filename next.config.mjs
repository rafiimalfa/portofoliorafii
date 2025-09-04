/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // custom domain => biarkan string kosong
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;