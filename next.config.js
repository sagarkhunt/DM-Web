/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },
  images: {
    domains: [
      "192.168.1.112",
      "192.168.0.137",
      "192.168.1.183",
      "192.168.1.15",
      "img.freepik.com",
      "apidesignermarketplace.micrasolution.com",
      "e6f2-2405-201-200c-b01e-f408-697b-41a9-4d24.ngrok-free.app",
      "images.unsplash.com",
    ],
  },
  productionBrowserSourceMaps: false,
  env: {
    DESIGNER_MARKETPLACE_API_URL: process.env.NEXT_APP_PUBLIC_URL,
    DESIGNER_MARKETPLACE_ADMIN_URL: process.env.NEXT_APP_RECAPTCHA_SITE_URL,
    DESIGNER_MARKETPLACE_GOOGLE: process.env.REACT_APP_GOOGLE_API_TOKEN,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_APP_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.NEXT_APP_STRIPE_SECRET_KEY,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;

