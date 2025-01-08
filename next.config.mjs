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
    ],
  },
  // env: {
  //   NEXT_API_URL: "http://localhost:7000",

  //   FETCH_GENDERCATEGORY: "/api/gendercategories/",
  //   FETCH_PRODUCTS: "/api/products/allProducts/",
  //   FETCH_PRODUCTS_BY_MAINCAT: "/api/products/genderCategory/",
  //   FETCH_PRODUCTS_BY_CAT: "/api/products/category/",
  //   FETCH_CATEGORY: "/api/categories/",
  //   FETCH_PRODUCT_BY_ID: "/api/products/",
  //   ADD_PRODUCT: "/api/products/",
  // },
}

export default nextConfig
