/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan kode rewrites ini
  async rewrites() {
    return [
      {
        source: '/api/overpass',
        destination: 'https://overpass-api.de/api/interpreter', // Mengelabui CORS
      },
    ];
  },
};

export default nextConfig; // (atau module.exports = nextConfig; jika file .js)