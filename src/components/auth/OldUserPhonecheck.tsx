import httpService from "@/core/services/http-services";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { mobileRegExp } from "@/utils/regex";
import TextField from "../TextFild";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import APP_ROUTES from "@/constants/paths";
import { useModal } from "@/context/ModalContext";
import { baseIcons } from "@/assets/icons";

const legacyLoginSchema = z.object({
  mobile: z
    .string()
    .nonempty("لطفاً شماره موبایل خود را وارد کنید")
    .regex(mobileRegExp, "شماره موبایل معتبر نیست"),
});

type OldUserPhoneCheckData = z.infer<typeof legacyLoginSchema>;

type OldUserPhoneCheckProps = {
  onNextStep: (step: "updateUser", phoneNumber: string) => void;
};

export default function OldUserPhoneCheck({
  onNextStep,
}: OldUserPhoneCheckProps) {
  const methods = useForm<OldUserPhoneCheckData>({
    resolver: zodResolver(legacyLoginSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { closeModal } = useModal();

  const onSubmit = async (data: OldUserPhoneCheckData) => {
    try {
      setLoading(true);
      const sessionKey = localStorage.getItem("sessionKey");
      const res = await httpService.post("Authentication/OtpForPhoneNumber", {
        sessionKey: sessionKey,
        phoneNumber: data.mobile,
      });
      if (res.data.success) {
        setLoading(false);
        onNextStep("updateUser", data.mobile);
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

        <div className="w-full h-full mt-10 space-y-2">
          <TextField
            name="mobile"
            label="شماره موبایل"
            type="tel"
            placeholder="09XXXXXXXXX"
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
