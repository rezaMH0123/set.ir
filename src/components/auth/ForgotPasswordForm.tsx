"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../TextFild";
import httpService from "@/core/services/http-services";
import { Loader2 } from "lucide-react";
import { mobileRegExp } from "@/utils/regex";
import Link from "next/link";
import OTPField from "../OTPField";
import toast from "react-hot-toast";
import APP_ROUTES from "@/constants/paths";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import { baseIcons } from "@/assets/icons";

type ForgotPasswordFormProps = {
  phoneNumber: string;
  onBackAction: () => void;
};

export const mobileSchema = z.object({
  mobile: z
    .string()
    .nonempty("لطفاً شماره موبایل خود را وارد کنید")
    .regex(mobileRegExp, "شماره موبایل وارد شده معتبر نیست"),
});

const otpSchema = z
  .object({
    otp: z.string().length(4, "کد باید ۴ رقمی باشد"),
    newPassword: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .nonempty("رمز عبور را وارد کنید"),
    confirmPassword: z.string().nonempty("تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordForm({
  phoneNumber,
  onBackAction,
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(phoneNumber || "");

  const { closeModal } = useModal();
  const router = useRouter();

  const phoneMethods = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: phoneNumber },
  });

  const otpMethods = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "", newPassword: "" },
  });

  const handleSendOtp = async (data: { mobile: string }) => {
    try {
      setLoading(true);
      const res = await httpService.post("Authentication/ForgotPassword", {
        phoneNumber: data.mobile,
      });
      setLoading(false);
      if (res.data.success) {
        setMobile(data.mobile);
        setStep(2);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleResetPassword = async (data: {
    otp: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);
      const res = await httpService.put("Authentication/ResetPassword", {
        phoneNumber: mobile,
        otp: data.otp,
        password: data.newPassword,
      });
      setLoading(false);
      if (res.data.success) {
        toast.success("رمز عبور با موفقیت تغییر یافت");
        onBackAction();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-3">
      <div className="relative flex flex-col items-center">
        <Image
          alt="set"
          src={baseIcons.setBlueIcon}
          className="mx-auto mb-4 max-sm:mb-2 w-[88px] h-[44px]"
        />
        <h2 className="text-[#224CDF] font-vazir text-2xl font-bold w-fit mb-2">
          بازیابی رمز عبور
        </h2>
      </div>

      {step === 1 && (
        <FormProvider {...phoneMethods}>
          <form
            onSubmit={phoneMethods.handleSubmit(handleSendOtp)}
            className="flex flex-col items-center mt-5"
          >
            <TextField
              name="mobile"
              label="شماره موبایل"
              placeholder="09121234567"
              type="tel"
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
          </form>
          <p className="w-full text-center text-xs font-vazir mt-4">
            ورود به ست به معنای پذیرفتن{" "}
            <Link
              onClick={() => {
                closeModal("auth");
                router.push(APP_ROUTES.POLICY);
              }}
              className="text-[#224CDF] underline"
              href={APP_ROUTES.POLICY}
            >
              قوانین
            </Link>{" "}
            ست میباشد
          </p>
        </FormProvider>
      )}

      {step === 2 && (
        <FormProvider {...otpMethods}>
          <form
            onSubmit={otpMethods.handleSubmit(handleResetPassword)}
            className="flex flex-col gap-4"
          >
            <OTPField
              phoneNumber={mobile}
              control={otpMethods.control}
              errors={otpMethods.formState.errors}
            >
              کد ۴ رقمی ارسال شده به شماره{" "}
              <span className="text-[#999999]">{mobile}</span> را وارد کنید
            </OTPField>

            <TextField
              name="newPassword"
              label="رمز عبور جدید"
              placeholder="رمز عبور جدید"
              type="password"
            />
            <TextField
              name="confirmPassword"
              label="تکرار رمز عبور"
              placeholder="تکرار رمز عبور"
              type="password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#224CDF] text-white rounded-lg flex justify-center items-center"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "تغییر رمز عبور"
              )}
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
