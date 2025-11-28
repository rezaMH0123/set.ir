import React from "react";

type LoaderProps = {
  className?: string;
};
export default function Loader({ className }: LoaderProps) {
  return (
    <div dir="rtl" className={`w-full place-content-center ${className}`}>
      <div className="animate-pulse flex gap-x-5 w-full place-content-center">
        <div className="w-[666px] px-2 space-y-2 ">
          <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
          <div className="h-10 bg-gray-300 rounded-xl w-full"></div>
          <div className="h-[320px] bg-gray-300 rounded-2xl w-full"></div>
          <div className="w-full space-y-2 mt-8">
            <div className="flex flex-row gap-2">
              <div className="h-8 bg-gray-300 rounded-xl w-[80px]"></div>
              <div className="h-8 bg-gray-300 rounded-xl w-[80px]"></div>
              <div className="h-8 bg-gray-300 rounded-xl w-[80px]"></div>
            </div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-4/5"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-3/5"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-2/5"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-full"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-4/5"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-3/5"></div>
            <div className="h-5 bg-gray-300 rounded-xl w-2/5"></div>
          </div>
        </div>
        <div className="h-80 bg-gray-300 rounded-xl w-96 hidden md:block"></div>
      </div>
    </div>
  );
}
