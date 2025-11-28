"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { menuItems } from "./sideBarItem.data";
import Image from "next/image";

export default function SidebarItem() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const openMenuForPath = menuItems.find((item) =>
      pathname.startsWith(item.path)
    );
    if (openMenuForPath) {
      setOpenMenu(openMenuForPath.path);
    }
  }, [pathname]);

  return (
    <ul className="text-right py-3 mt-2 ">
      {menuItems.map((item) => (
        <li
          key={item.path}
          className="px-0 p-2 md:px-5  text-[18px]  overflow-hidden relative"
        >
          {pathname.startsWith(item.path) && (
            <div className="rounded-2xl bg-blue1 h-10 w-2 absolute top-0.5 -right-1 hidden md:block"></div>
          )}

          {item.subItems ? (
            <div
              className={`px-8 md:px-0 cursor-pointer flex flex-row-reverse justify-between items-center pb-3 md:p-0 border-b border-LightGray md:border-none ${
                pathname.startsWith(item.path) ? "" : ""
              }`}
              onClick={() =>
                setOpenMenu(openMenu === item.path ? null : item.path)
              }
            >
              <span className="flex items-center gap-x-2">
                {item.name}
                {item.icon && <Image src={item.icon} alt="icon" className="" />}
              </span>
              <span className="w-fit">
                {openMenu === item.path ? (
                  <ChevronUp className="stroke-black w-5" />
                ) : (
                  <ChevronDown className="stroke-black w-5" />
                )}
              </span>
            </div>
          ) : (
            <Link
              aria-label="item.path"
              href={item.path}
              className={`px-8 md:px-0 flex justify-end pb-3 md:p-0 border-b border-LightGray md:border-none `}
            >
              <span className="flex items-center gap-x-2">
                {item.name}
                {item.icon && <Image src={item.icon} alt="icon" className="" />}
              </span>
            </Link>
          )}

          {item.subItems && openMenu === item.path && (
            <ul className="ml-4 mt-2 px-10 md:px-0">
              {item.subItems.map((sub) => (
                <li key={sub.path} className="p-1 text-sm mb-2">
                  <Link
                    aria-label="sub.path"
                    href={sub.path}
                    className={`block ${
                      pathname === sub.path
                        ? "md:text-MediumGray"
                        : "text-black"
                    }`}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
