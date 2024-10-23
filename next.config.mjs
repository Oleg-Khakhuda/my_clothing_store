/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  env: {
    NEXT_API_URL: "http://localhost:7000",

    FETCH_GENDERCATEGORY: "/api/gendercategories/",
    FETCH_PRODUCTS: "/api/products/allProducts/",
  },
};

export default nextConfig;
