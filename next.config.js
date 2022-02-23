/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  experimental: {
    reactRoot: true,
    runtime: 'edge',
    serverComponents: true,
  },
};

module.exports = nextConfig;
