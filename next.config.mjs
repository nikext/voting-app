/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "hardy-marlin-146.convex.cloud",
        },
      ],
    },
  };
  
  export default nextConfig;