import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "https://preview-chat-4b9b9773-e149-4fc6-80dd-3ae55e1f8e36.space-z.ai",
    "http://preview-chat-4b9b9773-e149-4fc6-80dd-3ae55e1f8e36.space-z.ai",
  ],
};

export default nextConfig;
