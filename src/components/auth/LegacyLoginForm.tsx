"use client";

import React, { useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../TextFild";
import { Headset, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import httpService from "@/core/services/http-services";
import APP_ROUTES from "@/constants/paths";
import { useModal } from "@/context/ModalContext";
import { baseIcons } from "@/assets/icons";

const legacyLoginSchema = z.object({
  email: z
    .string()
    .nonempty("لطفاً ایمیل خود را وارد کنید")
    .email("ایمیل معتبر نیست"),
  password: z
    .string()
    .nonempty("لطفاً رمز عبور خود را وارد کنید")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

type LegacyLoginFormData = z.infer<typeof legacyLoginSchema>;

type LegacyLoginFormProps = {
  onNextStep: (step: "oldUserPhoneCkeck") => void;
};

export default function LegacyLoginForm({ onNextStep }: LegacyLoginFormProps) {
  const methods = useForm<LegacyLoginFormData>({
    resolver: zodResolver(legacyLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { closeModal } = useModal();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LegacyLoginFormData) => {
    try {
      setLoading(true);
      const res = await httpService.post("Authentication/CheckLogin", {
        email: data.email,
        password: data.password,
      });

      if (res.data.success) {
        setLoading(false);
        const sessionKey = res.data.data;
        localStorage.setItem("sessionKey", sessionKey);
        onNextStep("oldUserPhoneCkeck");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-3"
      >
        <div className="relative flex flex-col items-center">
          <Image
            alt="set"
            src={baseIcons.setBlueIcon}
            className="mx-auto mb-4 max-sm:mb-2 w-[88px] h-[44px]"
          />
          <h2 className="text-[#224CDF] font-vazir text-2xl font-bold w-fit">
            ساخت رمز ورود
          </h2>
        </div>

        <p className="w-96 text-center text-sm font-bold font-vazir mt-4">
          <span className="text-red-500">توجه: </span>
          برای امنیت بیشتر حساب کاربری لازم است که در مرحله بعد، بعد از{" "}
          <span className="underline">تایید شماره تلفن</span> یک{" "}
          <span className="underline">رمز عبور جدید</span> ایجاد کنید.
        </p>

        <div className="w-full h-full mt-4 space-y-2">
          <TextField
            name="email"
            label="آدرس ایمیل"
            type="text"
            placeholder="user@example.com"
          />
          <TextField
            name="password"
            label="رمز ورود"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className={`mt-6 w-full py-2 px-4 bg-[#224CDF] cursor-pointer 
            font-vazir text-white rounded-lg text-base font-bold hover:bg-[#1a3d91]
             focus:outline-none focus:ring-2 focus:ring-[#224CDF] flex justify-center items-center`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <span>تایید</span>
            )}
          </button>

          <span className="text-[14px] block mt-4 text-center">
            در صورت فراموشی رمز عبور با پشتیبانی تماس بگیرید
          </span>

          <Link
            className="flex justify-center items-center w-full py-2 gap-x-2 mt-4 rounded-lg text-blue1 border border-blue1"
            href={APP_ROUTES.CONTACT_US}
            onClick={() => closeModal("auth")}
          >
            <Headset className="w-4 h-4" />
            <span>تماس با پشتیبانی</span>
          </Link>

          <p className="w-full text-center text-xs font-vazir mt-4">
            ورود به ست به معنای پذیرفتن{" "}
            <Link
              onClick={() => closeModal("auth")}
              className="text-[#224CDF] underline"
              href={APP_ROUTES.POLICY}
            >
              قوانین
            </Link>{" "}
            ست می‌باشد
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
