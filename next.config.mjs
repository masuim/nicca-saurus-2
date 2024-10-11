/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  fonts: [
    {
      google: {
        families: ['DotGothic16'],
      },
    },
  ],
};

export default nextConfig;