"use client";

import PencilEditIcon from "@/components/icons/PencilEditIcon";
import Link from "next/link";
import SidebarItem from "@/components/sideBar/Sidebar";
import PageTitle from "@/components/PageTitle";
import LogOutIcon from "@/components/icons/LogOutIcon";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useIsMobile from "@/utils/hooks/useIsMobile";
import WalletModal from "@/app/(whithRootLayout)/dashboard/wallet/WalletModal";
import APP_ROUTES from "@/constants/paths";
import { useUser } from "@/context/UserContext";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";

const BaseDashbaord = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, ready } = useIsMobile();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const { user, wallet, logout } = useUser();

  useEffect(() => {
    if (!isMobile) {
      setShowSidebar(true);
    } else {
      setShowSidebar(pathname === APP_ROUTES.DASHBOARD);
    }
  }, [pathname, isMobile]);

  if (!ready) return null;

  return (
    <>
      <div
        dir="rtl"
        className={`flex-1 md:mr-8 ${
          !showSidebar && isMobile ? "block" : isMobile ? "hidden" : "block"
        }`}
      >
        <PageTitle />
        <main className="md:rounded-xl md:shadow-card1 min-h-96 mt-4 flex flex-col justify-start md:justify-center">
          {children}
        </main>
      </div>

      <aside
        className={`min-h-[458px] h-fit w-full md:w-64 md:rounded-xl md:shadow-card1 ${
          showSidebar ? "block" : "hidden"
        }`}
      >
        <div className="mx-7 mt-4 flex flex-col text-right relative">
          <span
            className="text-black font-bold text-[18px] truncate"
            style={{ direction: "rtl" }}
          >
            {" "}
            {!!user?.firstName ? user?.firstName : "پروفایل تکمیل نشده  "}{" "}
            {user?.lastName ?? ""}
          </span>
          <span className="font-normal mt-1 font-vazirFD text-xl">
            {user?.phoneNumber}
          </span>
          <span className="text-xs font-normal mt-1">
            پایه {user?.grade?.name ?? ""}{" "}
          </span>
          <span className="text-xs font-normal mt-1">
            رشته {user?.major?.name ?? ""}
          </span>
          <Link aria-label="APP_ROUTES.PROFILE" href={APP_ROUTES.PROFILE}>
            <PencilEditIcon className="fill-black absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer" />
          </Link>
        </div>
        <div className="mx-7 mt-4 flex flex-col border-y py-3 border-[#C3C3C3] text-right relative">
          <span className="text-black font-semibold text-[18px]">کیف پول</span>
          <WalletModal
            handleClick={() => {
              ///
            }}
            triggerButton={
              <button className="text-blue-700 cursor-pointer text-end mt-1 text-xs font-normal">
                مدیریت موجودی
              </button>
            }
          ></WalletModal>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-normal flex flex-row-reverse gap-1 text-blue-700">
            <span className="font-vazirFD text-sm">
              {!wallet?.amount ? 0 : commaSeperatedDigit(wallet?.amount)}
            </span>{" "}
            تومان
          </span>
        </div>
        <SidebarItem />
        <div className="px-0 md:px-5">
          <button
            onClick={logout}
            className="pb-3 md:pb-0 border-b border-LightGray md:border md:border-red-500 md:text-red-500 md:bg-white md:rounded-lg w-full md:mt-6 md:mb-5 cursor-pointer "
          >
            <span className="px-8 md:px-0 flex md:block justify-end items-center gap-x-3 md:p-1">
              خروج
              <LogOutIcon className="fill-black md:hidden" />
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default BaseDashbaord;
