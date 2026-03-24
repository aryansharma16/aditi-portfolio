import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimise images served via next/image
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Compress responses
  compress: true,
  // Strict mode for better dev warnings
  reactStrictMode: true,
  // Remove X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
