import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eiei-swarchitecture.s3.amazonaws.com",
        pathname: "/**", // อนุญาตทุก path ใน bucket
      },
    ],
  },
};

export default nextConfig;
