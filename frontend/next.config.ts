import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.210", "*.local", "localhost:3000"],
};

export default nextConfig;
