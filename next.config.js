/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    reactRoot: true,
    serverComponents: true,
    runtime: "edge",
  },
};

module.exports = nextConfig;
