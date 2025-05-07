/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
