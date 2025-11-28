"use client";

import { usePathname } from "next/navigation";
import { menuItems } from "./sideBar/sideBarItem.data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import APP_ROUTES from "@/constants/paths";
import AddTicketModal from "@/sections/dashboard/support/AddTicketModal";
import React from "react";

export default function PageTitle() {
  const pathname = usePathname();

  const allMenuItems = [
    ...menuItems,
    { name: "پروفایل", path: APP_ROUTES.PROFILE },
  ];

  const currentMenuItem = allMenuItems.find((item) =>
    pathname.startsWith(item.path)
  );

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-[18px] mt-4 text-black2 flex md:block gap-3 px-4 md:px-0 font-vazir font-semibold">
          <Link aria-label="APP_ROUTES.DASHBOARD " href={APP_ROUTES.DASHBOARD}>
            <ArrowRight className="stroke-black text-black2 md:hidden" />
          </Link>
          {currentMenuItem?.name}
        </h1>
      </div>
      <div className="md:hidden flex mt-3 items-center justify-end md:justify-center ">
        <AddTicketModal
          triggerButton={
            <button className="bg-white cursor-pointer rounded-md border border-[#224CDF] text-[#224CDF] font-medium py-1 px-3 max-sm:mx-5">
              درخواست جدید +
            </button>
          }
        />
      </div>
    </div>
  );
}
