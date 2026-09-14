import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "arizona-permit-path";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Project Pages URL: https://rajmahato111.github.io/arizona-permit-path/
  ...(isGithubPages
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
