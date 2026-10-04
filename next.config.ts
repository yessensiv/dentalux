import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/api/*": ["./.private/**/*", "./tests/**/*", "./artifacts/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
