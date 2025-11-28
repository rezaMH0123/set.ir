"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  priorityOptions,
  ticketStatusTypes,
} from "@/constants/support/ticketOptions";
import toast from "react-hot-toast";
import { useTicketMessages } from "@/core/swrHooks/dashboard";
import { mutate } from "swr";
import SWR_KEYS from "@/core/swrKeys";
import { messageType } from "@/types/dashboard.type";
import { sendMessage } from "@/core/apiCalls/dashboard";
import { formatShamsi } from "@/utils/helpers/dateToJalali";

export default function DashboardChat() {
  const [reply, setReply] = useState("");
  const { id } = useParams();
  const { messages } = useTicketMessages(String(id));

  const isClosed = messages?.ticket?.status?.trim() === "Closed";

  const handleSend = async () => {
    if (!reply.trim() || isClosed) return;

    try {
      await sendMessage(String(id), reply);
      setReply("");
      mutate(SWR_KEYS.ticketMessages(String(id)));
    } catch {
      toast.error("پیام ارسال نشد. لطفا دوباره تلاش کنید.", {
        style: { direction: "rtl" },
      });
    }
  };

  if (!messages) {
    return <div className="p-4 text-center mx-auto">در حال بارگذاری...</div>;
  }

  return (
    <div dir="rtl" className="p-4 max-sm:p-2 w-full max-w-[800px] mx-auto">
      {/* اطلاعات تیکت */}
      <div className="bg-white w-full max-xl:w-full mx-auto border border-[#D9D9D9] rounded-xl overflow-hidden text-center">
        <div className="grid grid-cols-4 max-sm:flex justify-between items-center text-sm max-sm:text-xs font-medium border-b border-[#F6F6F6]">
          <div className="p-2 flex max-sm:w-5/12 justify-center items-center">
            عنوان پرسش یا درخواست
          </div>
          <div className="p-2 flex max-sm:w-3/12 justify-center items-center">
            تاریخ
          </div>
          <div className="p-2 flex max-sm:w-1/12 justify-center items-center">
            اولویت
          </div>
          <div className="p-2 flex max-sm:w-2/12 justify-center items-center">
            وضعیت
          </div>
        </div>
        <div className="grid grid-cols-4 max-sm:flex justify-between items-center text-sm text-[#4D4D4D] max-sm:text-xs">
          <div className="p-2 flex max-sm:w-5/12 justify-center items-center">
            {messages?.ticket?.subject}
          </div>
          <div
            dir="ltr"
            className="p-2 flex max-sm:w-3/12 justify-center items-center font-vazirFD"
          >
            {messages?.ticket?.createdAt
              ? formatShamsi(messages?.ticket?.createdAt)
              : "نامشخص"}
          </div>
          <div className="p-2 flex max-sm:w-1/12 justify-center items-center">
            {priorityOptions.find((p) => p.id === messages?.ticket?.priority)
              ?.name ??
              messages?.ticket?.priority ??
              "—"}
          </div>
          <div className="p-2 flex max-sm:w-2/12 justify-center items-center">
            {ticketStatusTypes.find(
              (t) => t.status === messages?.ticket?.status
            )?.name ??
              messages?.ticket?.status ??
              "—"}
          </div>
        </div>
      </div>

      {/* پیام‌ها */}
      <div className="w-full max-xl:w-full mx-auto mt-7 p-4 max-sm:p-2 bg-[#F6F6F6] max-h-[400px] overflow-y-auto border border-gray-200 rounded-[10px] text-[#4D4D4D]">
        {messages?.messages?.map((msg: messageType, idx: string) => (
          <div
            key={idx}
            className={`flex mb-5 ${
              !msg.isAdmin ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[50%] max-lg:max-w-[95%] p-3 mx-8 max-lg:mx-2 max-sm:mx-0 rounded-lg text-sm ${
                !msg.isAdmin ? "bg-white text-right" : "bg-[#EAEEFF] text-left"
              }`}
            >
              <div className="flex gap-x-2 justify-between">
                <div className="text-xs mb-2">
                  {!msg.isAdmin ? "شما" : "پشتیبانی"}
                </div>
                <div dir="ltr" className="text-xs mb-1">
                  {formatShamsi(msg.createdAt)}
                </div>
              </div>
              <p className="font-medium max-sm:text-[13px] break-words whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* فرم پاسخ */}
      <div className="w-full max-xl:w-full mx-auto mt-5 max-sm:p-2 text-[#4D4D4D]">
        <label className="block mb-2 font-medium">پاسخ</label>
        <textarea
          rows={3}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          disabled={isClosed}
          className={`w-full bg-[#F6F6F6] shadow-[inset_0_0_4px_0_rgba(0,0,0,0.12)] rounded-lg p-2 text-[#4D4D4D] max-sm:text-[13px] focus:outline-none ${
            isClosed ? "cursor-not-allowed opacity-50" : ""
          }`}
          placeholder="متن پاسخ خود را وارد کنید..."
        />
        <button
          onClick={handleSend}
          disabled={!reply.trim() || isClosed}
          className="cursor-pointer mt-2 w-24 py-1.5 bg-[#224CDF] text-white rounded-md disabled:cursor-default disabled:opacity-50"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
