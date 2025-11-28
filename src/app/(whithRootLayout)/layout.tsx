import type { Metadata } from "next";
import Header from "@/sections/layout/Header";
import WithFooter from "@/sections/layout/WithFooter";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import { FavoriteProvider } from "@/context/FavoritesContext";
import { FooterProvider } from "@/context/FooterContext";
import "./../globals.css";
import { Suspense } from "react";
import Script from "next/script";
import GoftinoConfiger from "@/utils/helpers/GoftinoConfiger";
import Campain from "@/components/Campain";
import { FilterProvider } from "@/context/FilterContext";
import { getNavbarMenuServerSide } from "@/core/apiCalls/menu";

const IS_DEVELOPMENT = process.env.DEVELOPMENT ?? "";

export const metadata: Metadata = {
  title: "فروشگاه محتوا آموزشی ست | خرید محصولات با کیفیت",
  description:
    "فروشگاه اینترنتی ست (SET.IR) ارائه دهنده محصولات اورجینال و تضمین شده با بهترین قیمت.",
  keywords: [
    "خرید آنلاین",
    "فروشگاه اینترنتی",
    "محصولات با کیفیت",
    "ست",
    "set.ir",
  ],
  authors: [{ name: "SET.IR", url: "https://set.ir" }],
  openGraph: {
    title: "فروشگاه محتوا آموزشی ست",
    description: "خرید آنلاین محصولات اورجینال و تضمین شده از فروشگاه ست.",
    url: "https://set.ir",
    siteName: "فروشگاه ست",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه محتوا آموزشی ست",
    description: "ست فروشگاه اینترنتی محصولات با کیفیت و تضمین شده.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navBarRes = await getNavbarMenuServerSide();
  return (
    <div className={`antialiased`}>
      <NextTopLoader
        height={2}
        color="#224cdf"
        showSpinner={false}
        zIndex={1000}
        showForHashAnchor
      />
      <ModalProvider>
        <CartProvider>
          <UserProvider>
            <FavoriteProvider>
              <FilterProvider>
                <FooterProvider>
                  <Campain />
                  <Suspense fallback={<div className="h-[80] w-full" />}>
                    <Header menu={navBarRes.data ?? []} />
                  </Suspense>

                  <div className="max-w-[1920px] mx-auto w-full overflow-x-clip">
                    {children}
                  </div>
                  <Script
                    id="goftino-widget"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
                    !function()
                    {
                      var i="Yt9HMy",a=window,d=document;
                      function g()
                      {
                        var g = d.createElement("script"),
                            s = "https://www.goftino.com/widget/" + i,
                            l = localStorage.getItem("goftino_" + i);
                        g.async=!0,
                        g.src=l?
                          s+"?o="+l:
                          s;
                        d.getElementsByTagName("head")[0].appendChild(g);
                      }
                      "complete"===d.readyState?
                        g():
                        a.attachEvent?
                          a.attachEvent("onload",g):
                          a.addEventListener("load",g,!1);
                    }();
                    `,
                    }}
                  />
                  {!IS_DEVELOPMENT && (
                    <>
                      <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-NEPKV6SPT6"
                        strategy="afterInteractive"
                      />
                      <Script id="gtag-init" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-NEPKV6SPT6', {
                            page_path: window.location.pathname,
                        });
                        `}
                      </Script>
                      <Script
                        id="hotjar"
                        strategy="afterInteractive"
                        src="https://t.contentsquare.net/uxa/80e7af5a9bde1.js"
                      />
                    </>
                  )}
                  <GoftinoConfiger />
                  <WithFooter />
                </FooterProvider>
              </FilterProvider>
            </FavoriteProvider>
          </UserProvider>
        </CartProvider>
      </ModalProvider>
      <Toaster containerStyle={{ direction: "rtl" }} />
    </div>
  );
}
