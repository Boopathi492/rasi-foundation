/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev and production artifacts apart. A build must not replace chunks the
  // running dev server is using (and the dev server must not mutate production output).
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === 'development' ? '.next-dev' : '.next'),
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
    // Reduce image quality slightly for faster loading
    // 1920/2048 added so the full-width hero banners (2048px wide artwork) stay sharp on large screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  // Optimize production builds
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Powered by header removal for security
  poweredByHeader: false,
  
  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
