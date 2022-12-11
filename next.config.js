/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXTAUTH_SECRET: "a123vq245fva245zc4",
    JWT_SECRET: "a123vq245fva245zc4",
    NEXTAUTH_URL: "http://localhost:3000/api/auth",
    NEXT_URL: "http://localhost:3000/api",
    MONGO_URI: "mongodb://0.0.0.0:27017/e-commerce"
  },
  images: {
    //domains: ["http://localhost:3000"] 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/product-images/**'
      },
    ],
  }
}

module.exports = nextConfig
