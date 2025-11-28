import React from "react";

export default function LoaderBasket() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        dir="rtl"
        className="px-2 py-6 md:p-9 flex flex-col items-center md:flex-row md:justify-between gap-x-8 md:items-start animate-pulse"
      >
        {/* بخش محصولات */}
        <div className="w-full md:w-[854px] space-y-6">
          <div className="w-full h-[74px] bg-gray-200 rounded-3xl"></div>

          {/* اسکلت کارت‌ها */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-28 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* سایدبار پرداخت */}
        <div className="w-full md:w-[436px] bg-white shadow-card1 sticky top-24 mt-8 rounded-xl py-10 space-y-6">
          <div className="space-y-4 px-10">
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-28 h-5 bg-gray-300 rounded"></div>
              <div className="w-20 h-5 bg-gray-300 rounded"></div>
            </div>

            {/* کیف پول */}
            <div className="w-full border border-LightGray rounded-2xl px-4 py-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-24 h-3 bg-gray-200 rounded ml-8"></div>
            </div>
          </div>

          <div className="mt-10 px-7">
            <div className="hidden md:block w-full h-12 bg-gray-300 rounded-lg"></div>

            <div className="flex items-center gap-x-3 h-10 mt-6">
              <div className="flex-grow h-10 bg-gray-200 rounded"></div>
              <div className="w-16 h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* فوتر موبایل */}
        <div className="md:hidden w-full h-[115px] bg-white z-30 fixed left-0 bottom-[70px] p-5">
          <div className="flex justify-between">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 w-full h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
