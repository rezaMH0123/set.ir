"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../TextFild";
import { mobileRegExp } from "@/utils/regex";
import Link from "next/link";
import httpService from "@/core/services/http-services";
import { Loader2 } from "lucide-react";
import APP_ROUTES from "@/constants/paths";
import { useModal } from "@/context/ModalContext";
import { baseIcons } from "@/assets/icons";

export const mobileSchema = z.object({
  mobile: z
    .string()
    .nonempty("لطفاً شماره موبایل خود را وارد کنید")
    .regex(mobileRegExp, "شماره موبایل وارد شده معتبر نیست"),
});

type MobileFormData = z.infer<typeof mobileSchema>;

type MainAuthProps = {
  onNextStep: (
    step: "login" | "register" | "legacyLogin" | "updateUser",
    mobile: string
  ) => void;
};

export default function MainAuth({ onNextStep }: MainAuthProps) {
  const methods = useForm<MobileFormData>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: "" },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { closeModal } = useModal();

  const onSubmit = async (data: MobileFormData) => {
    try {
      setLoading(true);
      const res = await httpService.post(
        "Authentication/CheckUserPhoneNumber",
        {
          phoneNumber: data.mobile,
        }
      );
      setLoading(false);

      if (res.data.data.exists && !res.data.data.isOldUser) {
        onNextStep("login", data.mobile);
      } else if (!res.data.data.exists && !res.data.data.isOldUser) {
        onNextStep("register", data.mobile);
      } else {
        onNextStep("updateUser", data.mobile);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-3"
        >
          <div className="relative">
            <Image
              alt="set"
              src={baseIcons.setBlueIcon}
              className="mx-auto mb-4 max-sm:mb-2 w-[88px] h-[44px]"
            />
            <h2 className="text-[#224CDF] font-vazir text-2xl font-bold">
              ورود / ثبت‌نام
            </h2>
          </div>
          <div className="w-full h-full mt-10">
            <TextField
              name="mobile"
              label="شماره تماس"
              type="tel"
              placeholder="09029123543"
            />
            <button
              type="submit"
              className={`mt-6 w-full py-2 px-4 bg-[#224CDF] cursor-pointer 
            font-vazir text-white rounded-lg text-base font-bold hover:bg-[#1a3d91]
             focus:outline-none focus:ring-2 focus:ring-[#224CDF] flex justify-center items-center`}
              disabled={loading && true}
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <span>تایید</span>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
      <div className="mt-5 flex flex-col items-center">
        <span>در صورتی که کاربر قدیمی ست هستید وارد لینک زیر شوید</span>

        <button
          type="button"
          onClick={() => onNextStep("legacyLogin", "")}
          className="w-full p-2 rounded-lg mt-3 cursor-pointer text-blue1 border border-blue1"
        >
          ورود با ایمیل (درگاه قدیمی)
        </button>
        <p className="w-full text-center text-xs font-vazir mt-4">
          ورود به ست به معنای پذیرفتن{" "}
          <Link
            onClick={() => closeModal("auth")}
            className="text-[#224CDF] underline"
            href={APP_ROUTES.POLICY}
          >
            قوانین
          </Link>{" "}
          ست میباشد
        </p>
      </div>
    </>
  );
}
