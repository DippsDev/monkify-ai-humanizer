import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence "inferred workspace root" warning: the real app root is
    // <workspace>/monkify (the nested folder holding package.json).
    root: path.join(__dirname),
  },
};

export default nextConfig;
