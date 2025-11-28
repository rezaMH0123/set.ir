"use client";

import APP_ROUTES from "@/constants/paths";
import { useModal } from "@/context/ModalContext";
import httpService from "@/core/services/http-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import OTPField from "../OTPField";
import TextField from "../TextFild";
import { useUser } from "@/context/UserContext";
import { preparegetExpierTimeToken } from "@/utils/helpers/jwtCookies";
import { AxiosResponse } from "axios";
import { ApiResponse, LoginRespons } from "@/types/http-service.type";
import { baseIcons } from "@/assets/icons";

export const loginSchema = z.object({
  otp: z.string().length(4, "کد تایید باید ۴ رقم باشد"),
  password: z
    .string()
    .nonempty("لطفاً رمز عبور خود را وارد کنید")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

type UpdateUserFormProps = {
  phoneNumber: string;
};

export default function UpdateUserForm({ phoneNumber }: UpdateUserFormProps) {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "", otp: "" },
  });
  const { closeModal } = useModal();
  const { login } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormData) => {
    const sessionKey = localStorage.getItem("sessionKey");
    let url = "";

    const payload = {
      phoneNumber: phoneNumber,
      password: data.password,
      otp: data.otp,
      ...(sessionKey && { sessionKey }),
    };
    if (sessionKey) {
      url = "Authentication/UpdateUserInNewSet";
    } else {
      url = "Authentication/UpdateOldUserPassword";
    }

    try {
      setLoading(true);
      const res: AxiosResponse<ApiResponse<LoginRespons>> =
        await httpService.put(url, payload);
      setLoading(false);
      localStorage.removeItem("sessionKey");
      if (res.data.success && res.data.data) {
        setCookie("token", res.data.data.token, {
          maxAge: preparegetExpierTimeToken(res.data.data.accessExpiresAt),
          path: APP_ROUTES.LANDING,
        });
        setCookie("refreshToken", res.data.data.refreshToken, {
          maxAge: preparegetExpierTimeToken(res.data.data.refreshExpiresAt),
          path: APP_ROUTES.LANDING,
        });
        login();
        toast.success("با موفقیت وارد شدید");
        closeModal("auth");
      }
    } catch {
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

        <div className="w-full h-full mt-10">
          <OTPField<LoginFormData>
            phoneNumber={phoneNumber}
            control={methods.control}
            errors={methods.formState.errors}
          >
            کد 4 رقمی ارسال شده به شماره{" "}
            <span className="text-[#999999]">{phoneNumber}</span> وارد کنید
          </OTPField>
          <TextField
            name="password"
            label="رمز عبور"
            type="password"
            placeholder="@#@#12121212"
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
      </form>
    </FormProvider>
  );
}
