/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4ty1ftzt6ic9j6hh.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
