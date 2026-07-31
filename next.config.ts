import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the on-screen dev route indicator badge.
  devIndicators: false,
  // Allow tunneled origins (ngrok, etc.) to load dev assets so the page
  // hydrates when shared over a tunnel in `next dev`.
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
