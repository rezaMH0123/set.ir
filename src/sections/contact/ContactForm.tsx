"use client";

import { baseIcons } from "@/assets/icons";
import baseImages from "@/assets/images";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ContactForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);
  };

  return (
    <>
      <div className="text-[#262626] w-7/12 max-xl:w-10/12 max-md:w-full px-6 pt-5 pb-1 mx-auto mt-10 mb-6 rounded-[20px] min-md:shadow-[0_2px_6px_0_rgba(0,0,0,0.25)]">
        <div className="mb-10 mt-4">
          <div className="font-medium mb-3">نام و نام خانوادگی</div>
          <input
            type="text"
            className="p-2 w-full rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-0 h-12"
            placeholder="برای مثال محمد پارسا حمداللهی"
          />
        </div>

        <div className="mb-10 mt-4">
          <div className="font-medium mb-3">شماره تماس</div>
          <input
            type="text"
            className="p-2 w-full rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-0 h-12"
            placeholder="09029123543"
          />
        </div>

        <div className="mb-10 mt-4">
          <div className="font-medium mb-3 relative">
            <Image
              alt="arrow-down"
              src={baseIcons.arrowDownIcon}
              className="absolute top-[200%] translate-y-full z-10 left-6"
            />
            موضوع
          </div>
          <select className="relative appearance-none p-2 w-full rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-0 h-12 bg-white text-[#262626]">
            <option>کیفیت و مزیت های رقابتی</option>
            <option>پیشنهادات</option>
            <option>سایر</option>
          </select>
        </div>

        <div className="mb-10 mt-4">
          <div className="font-medium mb-3">متن پیام</div>
          <textarea
            className="p-2 w-full rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-0 h-32 resize-none"
            placeholder="متن پیام خودرا بنویسید و سپس تایید کنید"
          ></textarea>
        </div>

        <div className="mb-10 mt-4">
          <div className="font-medium mb-3">ارسال محتوا</div>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} />
          <div
            className={`rounded-[16px] py-6 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] border-2 ${
              isDragActive
                ? "border-blue-500 border-dashed"
                : "border-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Image
              src={baseImages.filePicking}
              alt="pick-file"
              className="w-48 mx-auto"
            />
            <div className="text-center text-lg font-light my-2">
              محتوای مورد نظر خودرا درگ کنید یا
            </div>
            <div className="w-fit mx-auto font-medium mt-4 mb-2">
              <button
                onClick={handleButtonClick}
                className="rounded-[10px] cursor-pointer py-2 border-2 duration-150 hover:bg-[#224bdf2c] border-[#224CDF] text-[#224CDF] w-36"
              >
                انتخاب فایل
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-sm:w-7/12 mx-auto">
        <div className="w-40 max-sm:w-11/12 max-sm:mx-auto font-medium mt-2 my-8">
          <button className="rounded-[12px] cursor-pointer py-3 bg-[#224CDF] text-white w-full">
            ارسال
          </button>
        </div>
      </div>

      <div className="w-7/12 max-sm:w-11/12 border border-gray-200 mx-auto rounded-3xl overflow-hidden my-10 h-[300px]">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1361.9300526270692!2d51.318006029831395!3d35.72046771795753!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfd9dc59710e9%3A0x6c2d237404aa9090!2z2YXYsdqp2LIg2KLZhdmI2LLYtCDYp9iyINix2KfZhyDYr9mI2LEg2KvZhduM2YYgLSDZhdiv2LHYs9mHINio24zZhiDYp9mE2YXZhNmE24w!5e0!3m2!1sen!2s!4v1744627822089!5m2!1sen!2s"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
