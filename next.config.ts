import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // نگهداری source map برای پروفایلینگ
  swcMinify: true, // کاهش حجم JS با SWC
  experimental: {
    scrollRestoration: true, // بهبود تجربه کاربری هنگام اسکرول
    optimizeCss: true, // بهینه‌سازی CSS (در نسخه‌های جدید Next.js)
  },
  async headers() {
    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800", // 1 روز cache، 7 روز stale
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.set.ir",
      },
      {
        protocol: "http",
        hostname: "172.16.20.33",
      },
    ],
    qualities: [75, 80, 90, 100], // فقط کیفیت‌های مورد استفاده، default نیست
  },
};

export default nextConfig;
