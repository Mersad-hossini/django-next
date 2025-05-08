export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.mander.ir/:path*",
      },
    ];
  },
};
