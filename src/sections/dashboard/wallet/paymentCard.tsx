"use client";

import React from "react";
import Image from "next/image";
import { baseIcons } from "@/assets/icons";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";
import { formatShamsi } from "@/utils/helpers/dateToJalali";
import { CircleXIcon } from "lucide-react";

interface PaymentCardProps {
  type: "FailedCharge" | "Charge" | "Purchase";
  purpose: "OrderPurchase" | "WalletDeposit";
  amount: string;
  date: string;
  refId: string;
}

export default function PaymentCard({
  type,
  amount,
  date,
  purpose,
  refId,
}: PaymentCardProps) {
  const isMobile = window.innerWidth < 640;

  return (
    <div
      className={`flex justify-between items-center rounded-[14px] py-2 px-6 max-sm:px-1 border border-[#D9D9D9] ${
        isMobile
          ? type === "Charge"
            ? "bg-[#C9D3FF]"
            : "bg-[#FFB6B6]"
          : "bg-white"
      }`}
    >
      <div className="flex justify-center items-center">
        <div
          className={`flex justify-center items-center w-10 h-10 max-sm:w-7 max-sm:h-7 p-2 max-sm:p-1.5 rounded-full mx-2 ${
            type === "Charge" ? "bg-[#C9D3FF]" : "bg-[#FFB6B6]"
          }`}
        >
          {type === "FailedCharge" && purpose === "WalletDeposit" ? (
            <CircleXIcon className="text-gray-700" />
          ) : (
            <Image
              src={baseIcons.paymentIcon}
              alt="payment"
              className="w-full"
            />
          )}
        </div>
        <span className="font-medium max-sm:text-[13px]">
          {type === "FailedCharge" &&
            purpose === "WalletDeposit" &&
            "شارژ ناموفق کیف پول"}
          {type === "Purchase" && "خرید محصول با کیف پول"}
          {type === "Charge" && purpose === "WalletDeposit" && "شارژ کیف پول"}
          {type === "Charge" &&
            purpose === "OrderPurchase" &&
            "شارژ کیف پول برای خرید محصول"}
        </span>
      </div>
      <div className="mx-2 text-end py-1 max-sm:py-0.5">
        <div className=" max-sm:text-[13px] font-vazirFD">
          {commaSeperatedDigit(amount) == "0" ? (
            "رایگان"
          ) : (
            <>{commaSeperatedDigit(amount)} تومان</>
          )}
        </div>
        <div className="text-sm max-sm:text-xs font-vazirFD">
          {formatShamsi(date)}
        </div>

        {!!refId && (
          <div className="text-sm max-sm:text-xs font-vazirFD">
            {refId} :کد پیگیری
          </div>
        )}
      </div>
    </div>
  );
}
