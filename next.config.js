/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "m.media-amazon.com",
            "lh3.googleusercontent.com"
        ]
    },
    async redirects() {
        return [
          {
            source: '/login',
            destination: '/authorization/login',
            permanent: true,
          },
          {
            source: '/register',
            destination: '/authorization/register',
            permanent: true,
          }
        ]
      },
}

module.exports = nextConfig
