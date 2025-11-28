"use client";

import httpService from "@/core/services/http-services";
import React, { ReactNode, useEffect, useState } from "react";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import OTPInput from "react-otp-input";

type OTPFieldProps<T extends { otp: string }> = {
  phoneNumber: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  children: ReactNode;
};

const OTPField = <T extends { otp: string }>({
  control,
  errors,
  children,
  phoneNumber,
}: OTPFieldProps<T>) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleResendCode = async () => {
    setTimeLeft(120);
    setCanResend(false);
    try {
      await httpService.post("Authentication/CheckUserPhoneNumber", {
        phoneNumber: phoneNumber,
      });
    } catch {}
  };

  return (
    <div className="flex flex-col items-center mb-8">
      {children && (
        <label className="block text-sm font-bold text-[#262626] text-right mb-2">
          {children}
        </label>
      )}
      <Controller
        name={"otp" as const as Path<T>}
        control={control}
        render={({ field }) => {
          const { value, onChange } = field;

          const otpInputProps = {
            value,
            onChange: (otpValue: string) => {
              if (/^\d*$/.test(otpValue)) {
                const numericValue = otpValue.slice(0, 4);
                onChange(numericValue);
              }
            },
            renderInput: (
              props: React.InputHTMLAttributes<HTMLInputElement>
            ) => <input {...props} />,
            numInputs: 4,
            containerStyle: "gap-3 dir-ltr ",
            inputStyle: `!w-10 !h-[45px] border ${
              errors.otp ? "border-red-500" : "border-[#D9D9D9]"
            } rounded-lg text-center text-lg outline-none focus:border-[#224CDF]`,
          };

          return (
            <>
              <OTPInput key={`otp-${field.name}`} {...otpInputProps} />
              {errors.otp && (
                <span className="text-red-500 text-xs mt-1">
                  {String(errors.otp.message)}
                </span>
              )}
            </>
          );
        }}
      />

      {!canResend && (
        <div className="mt-2 text-sm font-medium text-[#999999] font-vazir">
          ارسال کد جدید پس از {formatTime(timeLeft)}
        </div>
      )}
      {canResend && (
        <button
          onClick={handleResendCode}
          className="mt-2 text-blue-500 underline"
        >
          ارسال مجدد کد
        </button>
      )}
    </div>
  );
};

export default OTPField;
