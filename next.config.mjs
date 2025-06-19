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
  publicRuntimeConfig: {
    // Force no caching for public runtime config
    useCache: false,
  },
  // Force dynamic rendering for all pages
  staticPageGenerationTimeout: 0,
  // Disable etags to prevent browser caching
  generateEtags: false,
  // Disable response compression
  compress: false,
  // Force revalidation on each request
  experimental: {
    // Disable all experimental caching features
  },
};

export default nextConfig;
