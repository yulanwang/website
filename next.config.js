/** @type {import('next').NextConfig} */
nextConfig = {
  images: {
    remotePatterns: [{ hostname: "media.licdn.com" }],
  },
};

module.exports = nextConfig;
