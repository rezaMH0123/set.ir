"use client";

import React, { useState } from "react";
import baseImages from "@/assets/images";
import EmptyContentDLayout from "@/components/EmptyContentDLayout";
import OrderModal from "@/sections/dashboard/orders/OrderModal";
import { fetchOrdersList } from "@/core/apiCalls/dashboard";
import { OrderType } from "@/types/dashboard.type";
import WithPagination from "@/sections/shared/WithPagination";
import { Loader2 } from "lucide-react";
import { formatShamsi } from "@/utils/helpers/dateToJalali";

function getDiscountPercent(item: OrderType): string {
  const totalPrice = Number(item.totalPrice);
  const discount = Number(item.discountAmount);

  if (
    !item ||
    isNaN(totalPrice) ||
    isNaN(discount) ||
    totalPrice + discount === 0
  )
    return "۰٪";

  const percent = Math.round((discount / (totalPrice + discount)) * 100);
  return `${percent}٪`;
}

const OrderItem: React.FC<{ item: OrderType; index: number }> = ({
  item,
  index,
}) => (
  <div className="font-vazirFD">
    {/* Desktop */}
    <div className="w-full max-sm:hidden flex items-center h-12 text-sm max-lg:text-xs max-sm:cursor-pointer">
      <div className="max-sm:min-w-12 w-1/12 min-w-8 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center font-semibold">
        {index + 1}
      </div>
      <div className="max-sm:w-full w-4/12 min-w-14 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center">
        {item.totalPrice}
      </div>
      <div className="w-3/12 min-w-9 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center">
        ({getDiscountPercent(item)}) {item.discountAmount ?? 0}
      </div>
      <div
        dir="ltr"
        className="max-sm:w-full w-3/12 min-w-24 min-sm:border-l border-[#F1F4FF] h-full flex justify-center items-center"
      >
        {formatShamsi(item.createdAt)}
      </div>
      <div className="max-sm:hidden w-2/12 h-full flex justify-center px-5 items-center">
        <OrderModal
          status={item.status}
          refId={item.customRefId}
          orderId={item.id}
          triggerButton={
            <button className="bg-[#F1F4FF] text-[#224CDF] min-w-24 max-xl:min-w-20 max-lg:min-w-fit max-md:min-w-20 px-3 py-1 rounded-md text-sm cursor-pointer">
              مشاهده
            </button>
          }
        />
      </div>
    </div>

    {/* Mobile */}
    <div className="w-full min-sm:hidden flex items-center h-12 text-xs cursor-pointer">
      <OrderModal
        orderId={item.id}
        status={item.status}
        refId={item.customRefId}
        triggerButton={
          <div className="w-full flex">
            <div className="w-2/12 min-w-14 border-[#F1F4FF] h-full flex justify-center items-center font-semibold">
              {index + 1}
            </div>
            <div className="w-5/12 min-w-14 border-[#F1F4FF] h-full flex justify-center items-center">
              {item.totalPrice}
            </div>
            <div className="w-5/12 min-w-14 max-sm:hidden border-[#F1F4FF] h-full flex justify-center items-center">
              {item.discountAmount ?? 0} ({getDiscountPercent(item)})
            </div>
            <div className="w-5/12 min-w-24 border-[#F1F4FF] h-full flex justify-center items-center">
              {formatShamsi(item.createdAt)}
            </div>
          </div>
        }
      />
    </div>
  </div>
);

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState<
    "Pending" | "Completed" | "Failed"
  >("Pending");

  const tabItems = [
    { key: "Pending", label: "در انتظار پرداخت" },
    { key: "Completed", label: "موفق" },
    { key: "Failed", label: "ناموفق" },
  ] as const;

  const fetcher = async (pageIndex: number, perPage: number) => {
    const data = await fetchOrdersList([
      "",
      perPage,
      pageIndex + 1,
      selectedTab,
    ]);
    return {
      items: data.items,
      totalCount: data.totalCount,
      totalPages: Math.ceil(data.totalCount / perPage),
    };
  };

  return (
    <div className="w-10/12 mb-auto max-xl:w-full max-md:w-11/12 max-sm:w-full max-xl:px-4 max-sm:px-0 mx-auto">
      {/* Tabs */}
      <div className="flex max-sm:mx-auto my-8 justify-center text-sm bg-[#F6F6F6] rounded-[8px] shadow-[inset_0_0_1px_0_rgba(0,0,0,0.26)] py-1.5 px-4 w-fit mb-6 gap-2">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`cursor-pointer px-4 py-1.5 rounded-[6px] transition ${
              selectedTab === tab.key
                ? "bg-white text-[#262626] shadow-[0_0_1px_0_rgba(0,0,0,0.26)]"
                : "bg-transparent text-[#4D4D4D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Headers */}
      <div className="flex font-medium max-xl:text-sm mb-2 max-sm:px-2">
        <div className="max-sm:w-2/12 w-1/12 min-w-8 px-1 flex justify-center items-center">
          شماره
        </div>
        <div className="max-sm:w-5/12 w-4/12 min-w-14 px-1 flex justify-center items-center">
          هزینه <span className="font-light text-xs ml-1">(تومان)</span>
        </div>
        <div className="max-sm:hidden w-3/12 min-w-9 px-1 flex justify-center items-center">
          تخفیف
        </div>
        <div className="max-sm:w-5/12 w-3/12 min-w-24 px-1 flex justify-center items-center">
          تاریخ
        </div>
        <div className="max-sm:hidden w-2/12 min-w-24 max-lg:min-w-20 px-1 flex justify-center items-center">
          مشاهده
        </div>
      </div>

      <WithPagination<OrderType>
        keyPrefix={selectedTab}
        key={`orders-${selectedTab}`}
        fetcher={fetcher}
        itemComponent={OrderItem}
        perPage={10}
        loadingMoreText={
          <div className="w-full place-items-center">
            <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          </div>
        }
        containerProps={{
          className:
            "min-sm:border border-[#D9D9D9] rounded-xl overflow-hidden divide-y divide-[#D9D9D9]",
        }}
        notFoundComponent={
          <div className="flex justify-center items-center min-h-[300px]">
            <EmptyContentDLayout
              className="flex flex-col items-center"
              srcImg={baseImages.empyOrdersImage}
              title={`هیچ تراکنش ${tabItems.find((tab) => tab.key === selectedTab)?.label}ی ندارید`}
            />
          </div>
        }
      />
    </div>
  );
}
