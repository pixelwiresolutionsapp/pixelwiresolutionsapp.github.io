import type { NextConfig } from "next";

const isGitHubPages = process.env.BUILD_TARGET === "github-pages";
const isStaticExport = process.env.BUILD_TARGET === "static";

const nextConfig: NextConfig = {
  // For GitHub Pages static export, use 'export'; otherwise use 'standalone' for Vercel
  output: isStaticExport ? "export" : "standalone",

  // GitHub Pages user/org sites (pixelwiresolutionsapp.github.io) serve from root, so basePath is '/'
  // If deploying to a repo subpath (e.g., github.com/org/repo), set basePath to '/repo-name'
  basePath: process.env.NEXT_BASE_PATH || "",

  // Trailing slashes work better with GitHub Pages
  trailingSlash: isGitHubPages || isStaticExport ? true : false,

  // Static export requires unoptimized images
  images: isStaticExport ? { unoptimized: true } : undefined,

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
