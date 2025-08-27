import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // Enable static exports for GitHub Pages
  output: 'export',
  
  // Set the base path for GitHub Pages (will be /theropist-site in production)
  basePath: isProd ? '/theropist-site' : '',
  
  // Asset prefix for proper loading on GitHub Pages
  assetPrefix: isProd ? '/theropist-site/' : '',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  
  // Strict mode for better development experience
  reactStrictMode: true,
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // TypeScript and ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Trailing slashes for consistent GitHub Pages behavior
  trailingSlash: true,
}

export default nextConfig