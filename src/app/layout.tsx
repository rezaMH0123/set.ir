import type { Metadata, Viewport } from "next";
import "../app/globals.css";
import WelcomeModal from "@/sections/WelcomeModal";
import { getCachedAppearance } from "@/core/apiCalls/landing";
import localFont from "next/font/local";
import { WebVitals } from "@/components/web-vitals";

const vazir = localFont({
  src: [
    {
      path: "../../public/fonts/Vazirmatn-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-FD-Medium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
});

const vazirFD = localFont({
  src: [
    {
      path: "../../public/fonts/Vazirmatn-FD-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-FD-Medium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazirFD",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://set.ir"),
  title: "فروشگاه محتوا آموزشی ست",
  description:
    "فروشگاه محتوا آموزشی ست، فروشگاه محتوای آموزشی با کیفیت و تضمین شده SET.IR",
  openGraph: {
    title: "فروشگاه محتوا آموزشی ست",
    description: "خرید محتوای آموزشی با کیفیت از فروشگاه محتوا آموزشی ست",
    url: "https://set.ir",
    siteName: "SET.IR",
    images: [
      {
        url: "https://set.ir/og-image.jpg", // تصویر OG
        width: 1200,
        height: 630,
        alt: "فروشگاه محتوا آموزشی ست",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه محتوا آموزشی ست",
    description: "محتوای آموزشی تضمین شده و با کیفیت",
    images: ["https://set.ir/og-image.jpg"],
    creator: "@set_ir", // اگر اکانت توییتر داری اینجا بذار
  },
  alternates: {
    canonical: "https://set.ir",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appearanceJson = await getCachedAppearance();
  return (
    <html lang="fa" className={`${vazir.variable} ${vazirFD.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        {/* Structured Data برای گوگل */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "فروشگاه محتوا آموزشی ست",
              url: "https://set.ir",
              logo: "https://set.ir/logo.png",
              sameAs: [
                "https://www.instagram.com/yourpage",
                "https://www.linkedin.com/company/yourpage",
              ],
            }),
          }}
        />
      </head>
      <body style={{ overflowX: "hidden" }} className={`antialiased`}>
        <WebVitals />
        {children}
        <WelcomeModal
          mobile={appearanceJson?.modal?.mobileImageUrl ?? ""}
          desktop={appearanceJson?.modal?.desktopImageUrl ?? ""}
          link={appearanceJson?.modal?.link ?? ""}
        />
      </body>
    </html>
  );
}
