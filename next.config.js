/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.postimg.cc', 'res.cloudinary.com', 'cdn.dribbble.com'],
  },
}

module.exports = nextConfig
