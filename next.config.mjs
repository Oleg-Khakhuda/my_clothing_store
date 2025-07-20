/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
