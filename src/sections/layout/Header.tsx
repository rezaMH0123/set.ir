"use client";

import BookIcon from "@/components/icons/BookIcon";
import CategoryIcon from "@/components/icons/Category";
import HomeIcon from "@/components/icons/HomeIcon";
import UserIcon from "@/components/icons/UserIcon";
import MenueX from "@/components/MultiLevelMenu/MenueX";
import { useUser } from "@/context/UserContext";
import { BookText, ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import AuthStepController from "@/components/auth/AuthStepController";
import SearchBox from "@/components/SearchBox";
import APP_ROUTES from "@/constants/paths";
import MobileCategories from "@/components/MobileCategories";
import { useCart } from "@/context/CartContext";
import { baseIcons } from "@/assets/icons";
import { NavbarMenu } from "@/types/menu";

type TnavigateBottom = {
  title: string;
  link: string;
  icon: React.ElementType;
  isCategory?: boolean;
};

const navigateBottom: TnavigateBottom[] = [
  { title: "پروفایل", icon: UserIcon, link: APP_ROUTES.DASHBOARD },
  { title: "محتوای من ", icon: BookIcon, link: APP_ROUTES.MY_CONTENT },
  { title: "دسته بندی ها ", icon: CategoryIcon, isCategory: true, link: "#" },
  { title: "خانه", icon: HomeIcon, link: APP_ROUTES.LANDING },
];

export default function Header({ menu }: { menu: NavbarMenu[] }) {
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const { totalItems } = useCart();
  const [query, setQuery] = useState(() => searchParams.get("Title") || "");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    router.prefetch(APP_ROUTES.FILTER);
  }, [router]);

  useEffect(() => {
    const q = searchParams.get("Title") || "";
    setQuery(q);
  }, [searchParams]);

  return (
    <header className="sticky left-0 top-0 z-50">
      {/* HEADER */}
      <div className="w-full flex justify-center  bg-white border-b border-LightGray">
        <div className="h-20 w-full max-w-[1600px] px-4 md:px-12 flex items-center justify-between gap-x-2">
          <form>
            <div className="h-full flex flex-col justify-center md:justify-normal md:flex-row items-center">
              {/* Show skeleton before client hydration or while loading */}
              {!isClient || isLoading ? (
                <div className="flex gap-x-3 items-center">
                  <div className="animate-pulse rounded-xl bg-gray-200 w-10 h-10" />

                  <div
                    className={`animate-pulse rounded-xl bg-gray-200 w-44 h-10 hidden md:block`}
                  />
                </div>
              ) : (
                <>
                  <Link
                    aria-label=" "
                    className="md:mr-3"
                    href={APP_ROUTES.BASKET}
                  >
                    <div className="relative z-0 rounded-xl bg-blue1 w-10 h-10 place-items-center place-content-center">
                      <div className="absolute z-20 -top-1 -right-1 md:-right-1.5 w-3.5 h-3.5 text-xs flex justify-center items-center pt-0.5 border border-blue1 text-blue1 bg-white rounded-full font-vazirFD">
                        {totalItems}
                      </div>
                      <ShoppingBasket className="h-8 w-8 stroke-white cursor-pointer" />
                    </div>
                  </Link>

                  {isLoggedIn && (
                    <>
                      <div className="pl-3 border-l-2 border-blue1 hidden md:block">
                        <Link
                          aria-label="APP_ROUTES.DASHBOARD"
                          href={APP_ROUTES.DASHBOARD}
                        >
                          <div className="w-10 h-10 border border-blue1 rounded-[10px] flex justify-center items-center cursor-pointer">
                            <User className="stroke-blue1 w-8 h-8" />
                          </div>
                        </Link>
                      </div>

                      <Link href={APP_ROUTES.MY_CONTENT}>
                        <div className="text-base font-bold w-28 ml-6 cursor-pointer hidden md:flex flex-row items-center gap-x-1">
                          <span className="text-blue1">محتوای من</span>
                          <BookText className="stroke-blue1 w-6 h-6" />
                        </div>
                      </Link>
                    </>
                  )}

                  {!isLoggedIn && (
                    <AuthStepController
                      triggerButton={
                        <div className="px-4 py-2 border border-blue1 text-blue1 text-sm rounded-lg hidden md:block">
                          ثبت نام / ورود
                        </div>
                      }
                      id="basketlogin"
                    />
                  )}
                </>
              )}
            </div>
          </form>
          <div className="flex items-center gap-x-3 h-full w-[570px]">
            <Suspense>
              <SearchBox
                value={query}
                onChange={setQuery}
                onSubmit={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (query.trim()) {
                    params.set("Title", query.trim());
                  } else {
                    params.delete("Title");
                  }
                  router.push(`/filter?${params.toString()}`);
                }}
                className="w-full md:max-w-[470px]"
              />
            </Suspense>
            <Link
              aria-label="صفحه اصلی سایت ست"
              href={APP_ROUTES.LANDING}
              className="relative w-[88px] h-[44px] hidden md:block"
            >
              <Image
                src={baseIcons.setBlueIcon}
                alt="لوگوی برند ست - لینک به صفحه اصلی"
                title="صفحه اصلی ست"
                fill
              />
            </Link>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="w-full justify-center bg-white border-b border-LightGray hidden md:flex">
        <div className="h-12 w-full max-w-[1600px] px-6 flex flex-row-reverse justify-start items-center gap-x-8">
          <div className="h-full flex items-center px-2">
            {menu.map((item, index) => (
              <div key={index} className="h-full flex items-center">
                <MenueX categories={item} />
              </div>
            ))}
          </div>
          <div className="border-l border-gray-300 h-8" />
          <Link target="_blank" href="https://chat.chatinoo.ir/">
            <span className="block cursor-pointer opacity-60">چتینوو</span>
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU */}

      <nav className="flex gap-x-1 bg-white fixed bottom-0 left-0 h-[75px] w-full z-10 md:z-40 md:hidden shadow-card4">
        {navigateBottom.map((item, index) => {
          const Icon = item.icon;

          const isPrivate =
            item.title === "پروفایل" || item.title === "محتوای من";

          return (
            <div
              key={index}
              className="flex-1 flex justify-center items-center"
            >
              {isPrivate && isClient && !isLoading && !isLoggedIn ? (
                <AuthStepController
                  triggerButton={
                    <div className="flex flex-col gap-y-1.5 justify-center items-center">
                      <Icon className="fill-MediumGray" />
                      <span className="text-sm text-black2">{item.title}</span>
                    </div>
                  }
                />
              ) : item.isCategory ? (
                <MobileCategories
                  categories={menu}
                  triggerButton={
                    <>
                      <Icon className="fill-MediumGray" />
                      <span className="text-sm text-black2">{item.title}</span>
                    </>
                  }
                />
              ) : (
                <Link
                  aria-label="item.link"
                  href={item.link}
                  className="flex flex-col gap-y-1.5 justify-center items-center w-full"
                >
                  <Icon className="fill-MediumGray" />
                  <span className="text-sm text-black2">{item.title}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </header>
  );
}
