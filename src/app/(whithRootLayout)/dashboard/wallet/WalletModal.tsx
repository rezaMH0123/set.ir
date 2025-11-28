"use client";

import ModalWrapper from "@/components/modal/ModalWrapper";
import { useUser } from "@/context/UserContext";
import { postCreateWalletPaymentLink } from "@/core/apiCalls/dashboard";
import PaymentCard from "@/sections/dashboard/wallet/paymentCard";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";
import React, { useState } from "react";

interface WalletModalProps {
  handleClick: () => void;
  triggerButton: React.ReactNode;
}

export default function WalletModal({ triggerButton }: WalletModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSbumitting] = useState(false);

  const { wallet } = useUser();

  const quickCharges = [
    { label: "شارژ ۲۰۰,۰۰۰ تومان", value: "200000" },
    { label: "شارژ ۱۰۰,۰۰۰ تومان", value: "100000" },
    { label: "شارژ ۵۰,۰۰۰ تومان", value: "50000" },
  ];

  const handleQuickCharge = (val: string) => {
    setAmount(val);
  };

  const handlePayment = async () => {
    setIsSbumitting(true);
    try {
      const paymentLink = await postCreateWalletPaymentLink(amount);
      setIsSbumitting(false);
      window.open(paymentLink, "_blank", "noopener,noreferrer");
    } catch {
      setIsSbumitting(false);
    }
  };

  return (
    <ModalWrapper modalId="WalletModal" triggerButton={triggerButton}>
      <div className="h-[70vh]">
        <div className="overflow-auto h-full w-full bg-white rounded-[10px] text-[#262626] mt-8 md:p-8 border-[#F6F6F6] md:shadow-[inset_0_-2px_12px_0_rgba(0,0,0,0.26)]">
          <div>
            <div className="text-center mb-4">
              <span className="block text-4xl max-sm:text-xl mt-1 font-vazirFD">
                <span className="text-base font-normal"> موجودی کیف پول: </span>
                {commaSeperatedDigit(wallet?.amount ?? 0)}{" "}
                <span className="text-base font-normal"> تومان </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-4">
              {quickCharges.map((qc) => (
                <button
                  key={qc.label}
                  disabled={!amount && !qc.value}
                  onClick={() => handleQuickCharge(qc.value)}
                  className={`w-36 max-sm:w-40 max-sm:py-3 px-3 py-2 rounded-[10px] text-white bg-[#224CDF] ${
                    !amount && !qc.value
                      ? "opacity-50"
                      : "cursor-pointer opacity-100"
                  }`}
                >
                  {qc.label}
                </button>
              ))}
            </div>

            <div className="relative w-6/12 max-sm:w-10/12 mx-auto my-6 gap-2">
              <input
                type="text"
                className="w-full border font-vazirFD text-xs border-[#D9D9D9] rounded-[10px] px-2 py-2 max-lg:text-sm focus:outline-none focus:ring-1 focus:ring-[#D9D9D9] text-start"
                placeholder="مبلغ دلخواه را وارد کنید"
                value={commaSeperatedDigit(amount)}
                onChange={(e) => setAmount(e.target.value.replaceAll(",", ""))}
              />
              <button
                onClick={handlePayment}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? "70%" : 1 }}
                className="absolute top-1/2 -translate-y-1/2 -left-4 max-sm:-left-1 bg-[#224CDF] text-white cursor-pointer px-4 py-1 rounded-[10px]"
              >
                تایید و پرداخت
              </button>
            </div>

            <div className="rounded-lg mb-2">
              {!!wallet?.transitionsDetail?.length ? (
                <h3 className="text-lg mr-4 font-semibold mb-3">تراکنش ها</h3>
              ) : (
                <h3 className="text-lg mr-4 font-semibold mt-20 text-center">
                  تاریخچه تراکنش‌ها خالیست
                </h3>
              )}
              <div className="space-y-2 px-4 h-2/5 max-sm:px-1">
                {wallet?.transitionsDetail.map((tx, i) => (
                  <PaymentCard
                    key={i}
                    type={tx.type}
                    amount={tx.amount}
                    date={tx.transitionsnDate}
                    purpose={tx.purpose}
                    refId={tx.customRefId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
