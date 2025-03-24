/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    turbopack: false, // Disable Turbopack to use Webpack instead
  },
};

module.exports = nextConfig;
