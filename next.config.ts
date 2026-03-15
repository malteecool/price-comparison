import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'store.storeimages.cdn-apple.com' },
      { hostname: 'images.samsung.com' },
      { hostname: 'www.sony.com' },
      { hostname: 'assets.bose.com' },
    ],
  },
};

export default nextConfig;
