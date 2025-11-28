"use client";

import ModalWrapper from "@/components/modal/ModalWrapper";
import React from "react";
import toast from "react-hot-toast";
import { useModal } from "@/context/ModalContext";
import { useForm, FormProvider } from "react-hook-form";
import SelectField from "@/components/SelectField";
import TextArea from "@/components/TextArea";
import { priorityOptions } from "@/constants/support/ticketOptions";
import { mutate } from "swr";
import SWR_KEYS from "@/core/swrKeys";
import { createTicket } from "@/core/apiCalls/dashboard";

interface AddTicketModalProps {
  triggerButton: React.ReactNode;
}

export default function AddTicketModal({ triggerButton }: AddTicketModalProps) {
  const { closeModal } = useModal();

  const methods = useForm({
    defaultValues: {
      subject: "",
      priority: "",
      messageText: "",
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const subjectOptions = [
    { name: "کیف پول", id: "کیف پول" },
    { name: "ثبت سفارش و پرداخت", id: "ثبت سفارش و پرداخت" },
    { name: "حساب کاربری", id: "حساب کاربری" },
    { name: "مشاهده آموزش ها", id: "مشاهده آموزش ها" },
    { name: "سایر", id: "سایر" },
  ];

  const onSubmit = async (data: {
    subject: string;
    priority: string;
    messageText: string;
  }) => {
    try {
      await createTicket(data);
      mutate(SWR_KEYS.ticketList);
      reset();
      toast.success("تیکت شما با موفقیت ثبت شد.", {
        style: {
          direction: "rtl",
        },
      });

      closeModal("AddTicketModal");
    } catch {}
  };

  return (
    <ModalWrapper modalId="AddTicketModal" triggerButton={triggerButton}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          dir="rtl"
          className="w-[350px] flex flex-col mt-8"
        >
          <div className="grid gap-y-4">
            <SelectField
              id="subject"
              label="موضوع و دسته بندی"
              options={subjectOptions}
              register={register("subject", {
                required: "انتخاب موضوع الزامی است",
              })}
              error={errors.subject}
            />

            <SelectField
              id="priority"
              label="اولویت بندی"
              options={priorityOptions}
              register={register("priority", {
                required: "انتخاب اولویت الزامی است",
              })}
              error={errors.priority}
            />

            <TextArea
              label="جزئیات درخواست"
              rows={4}
              {...register("messageText", {
                required: "توضیحات الزامی است",
              })}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-[10px] text-lg font-medium bg-[#224CDF] text-white py-2"
          >
            ثبت
          </button>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
