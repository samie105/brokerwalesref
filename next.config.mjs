/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ["wilsonbank.vercel.app", "*.vercel.app"],
    },
  },
};
