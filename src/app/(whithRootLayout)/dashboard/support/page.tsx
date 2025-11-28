"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import baseImages from "@/assets/images";
import AddTicketModal from "@/sections/dashboard/support/AddTicketModal";
import WithPagination from "@/sections/shared/WithPagination";
import APP_ROUTES from "@/constants/paths";
import { ticketStatusTypes } from "@/constants/support/ticketOptions";
import { fetchTicketListByUser } from "@/core/apiCalls/dashboard";
import { Loader2 } from "lucide-react";
import { formatShamsi } from "@/utils/helpers/dateToJalali";

export type itemType = {
  id: string;
  subject: string;
  priority: string;
  createdAt: string;
  status: string;
};

const SupportItem: React.FC<{ item: itemType; index: number }> = ({
  item,
  index,
}) => {
  return (
    <>
      <div className="max-sm:hidden w-full flex items-center h-12 text-sm text-[#4D4D4D] font-vazirFD">
        <div className=" w-1/12 min-w-8 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center font-semibold">
          {index + 1}
        </div>
        <div className="w-4/12 min-w-24 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center">
          {item.subject}
        </div>
        <div
          dir="ltr"
          className="w-2/12 min-w-16 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center"
        >
          {formatShamsi(item.createdAt)}
        </div>
        <div className="w-3/12 min-w-16 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center">
          {ticketStatusTypes.find((t) => t.status === item.status)?.name ??
            item.status}
        </div>
        <div className="w-2/12 min-w-28 h-full flex justify-center items-center px-2">
          <Link href={`${APP_ROUTES.SUPPORT}${APP_ROUTES.chat(item.id)}`}>
            <button className="bg-[#F1F4FF] cursor-pointer text-[#224CDF] w-full px-4 py-1 rounded-md text-sm">
              مشاهده
            </button>
          </Link>
        </div>
      </div>

      <Link
        aria-label="{APP_ROUTES.SUPPORT}"
        href={`${APP_ROUTES.SUPPORT}${APP_ROUTES.chat(item.id)}`}
      >
        <div className="min-sm:hidden w-full flex items-center border-b border-[#D9D9D9] justify-center h-fit py-1 text-sm text-[#4D4D4D] cursor-pointer">
          <div className="w-1/12 px-4 h-full flex justify-center items-center font-semibold">
            {index + 1}
          </div>
          <div className="w-7/12 h-full text-start items-center font-medium">
            {item.subject}
          </div>
          <div className="w-4/12">
            <div
              dir="ltr"
              className="w-full flex justify-center items-center py-1 font-medium"
            >
              {formatShamsi(item.createdAt)}
            </div>
            <div className="w-full flex justify-center items-center py-1 font-medium">
              {ticketStatusTypes.find((t) => t.status === item.status)?.name ??
                item.status}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default function SupportPage() {
  const fetcher = async (pageIndex: number, perPage: number) => {
    const tickets = await fetchTicketListByUser({
      pageSize: perPage,
      pageNumber: pageIndex + 1,
    });
    const totalPages = Math.ceil(tickets.totalCount / perPage);

    return {
      items: tickets.items,
      totalCount: tickets.totalCount,
      totalPages: totalPages,
    };
  };

  return (
    <div className="w-10/12 max-xl:w-full max-md:w-11/12 max-sm:w-full max-xl:px-4 max-sm:px-0 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between font-medium max-xl:text-sm mb-2 mt-6">
        <div className="hidden md:flex  items-center justify-end md:justify-center pl-2">
          <AddTicketModal
            triggerButton={
              <button className="bg-white cursor-pointer rounded-md border border-[#224CDF] text-[#224CDF] font-medium py-1 px-3 max-sm:mx-5">
                درخواست جدید +
              </button>
            }
          />
        </div>
        <div className="flex px-2 md:px-0 items-center justify-center md:justify-end gap-2">
          <a
            href="mailto:set.ir.levelup@gmail.com"
            className="flex flex-col md:flex-row flex-1 items-center min-w-[220px] max-w-[210px] gap-2 bg-[#EBEFFF] cursor-pointer rounded-md border border-[#EBEFFF] font-semibold py-1 px-3"
            title="ارسال ایمیل به مجموعه"
          >
            <Image
              src={baseImages.sighn}
              alt="ارسال ایمیل"
              width={40}
              height={40}
            />
            <div className="flex flex-col items-center md:items-start break-words">
              <span>ایمیل مجموعه:</span>
              <span className="text-sm font-normal break-words">
                set.ir.levelup@gmail.com
              </span>
            </div>
          </a>

          <a
            href="tel:02144064273"
            className="flex flex-col md:flex-row flex-1 items-center min-w-[220px] max-w-[210px] gap-2 bg-[#EBEFFF] cursor-pointer rounded-md border border-[#EBEFFF] font-semibold py-1 px-3"
            title="تماس با واحد پشتیبانی"
          >
            <Image
              src={baseImages.call}
              alt="تماس با پشتیبانی"
              width={35}
              height={30}
            />
            <div className="flex flex-col items-center md:items-start break-words">
              <span className="whitespace-nowrap text-sm font-normal break-words">
                واحد پشتیبانی:
              </span>
              <span className="font-normal break-words">021-44064273</span>
            </div>
          </a>
        </div>
      </div>

      <div className="max-sm:hidden flex font-medium max-xl:text-sm mb-2 mt-6">
        <div className="w-1/12 min-w-8 px-1 flex justify-center items-center">
          شماره
        </div>
        <div className="w-4/12 min-w-24 px-1 flex justify-center items-center">
          عنوان
        </div>
        <div className="w-2/12 min-w-16 px-1 flex justify-center items-center">
          تاریخ
        </div>
        <div className="w-3/12 min-w-16 px-1 flex justify-center items-center">
          وضعیت
        </div>
        <div className="w-2/12 min-w-28 px-1 flex justify-center items-center">
          مشاهده
        </div>
      </div>

      <WithPagination
        keyPrefix="support"
        fetcher={fetcher}
        itemComponent={SupportItem}
        perPage={10}
        loadingMoreText={
          <div className="w-full place-items-center">
            <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          </div>
        }
        notFoundComponent={
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="flex flex-col items-center">
              <Image
                alt="emptyImage"
                src={baseImages.emptySupportImage}
                height={200}
                width={200}
              />
              <span className="mt-2 text-[15px] font-medium font-vazir">
                هیچ تیکتی ثبت نشده تا الان
              </span>
              <div className="w-fit mx-auto">
                <AddTicketModal
                  triggerButton={
                    <button className="border border-[#224cdf] bg-white rounded-lg p-1 px-2 mt-4 text-[#224cdf] cursor-pointer">
                      درخواست جدید +
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        }
        containerProps={{
          className:
            "min-sm:border border-[#D9D9D9] rounded-xl overflow-hidden divide-y divide-[#D9D9D9]",
        }}
        // wrapUpComponent={
        //     <div className="text-center mt-4">تمام تیکت‌ها نمایش داده شدند.</div>
        // }
      />
    </div>
  );
}
