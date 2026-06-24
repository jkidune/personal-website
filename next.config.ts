import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      { source: "/works", destination: "/work", permanent: true },
      { source: "/works/:slug", destination: "/work/:slug", permanent: true },
      { source: "/insights", destination: "/archive", permanent: true },
      { source: "/insights/:slug", destination: "/archive/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
