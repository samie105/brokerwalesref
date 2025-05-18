/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  // Disable all caching in the application
  serverRuntimeConfig: {
    cache: false,
  },
  // Force dynamic rendering for all pages
  staticPageGenerationTimeout: 0,
};

export default nextConfig;
