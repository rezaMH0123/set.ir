import React from "react";
import successImg from "@/assets/images/success.svg";
import Image from "next/image";
import Link from "next/link";
import { getVerifyPayment } from "@/core/apiCalls/verifyPayment";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";
import { formatShamsi } from "@/utils/helpers/dateToJalali";
import unsuccessImg from "@/assets/images/unsuccess.svg";
import APP_ROUTES from "@/constants/paths";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ searchParams }: any) {
  const props = await searchParams;
  const Status = props.Status ?? "";
  const Authority = props.Authority ?? "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any = {
    status: false,
  };
  try {
    res = await getVerifyPayment(Authority, Status);
  } catch {}

  return (
    <div dir="rtl" className="h-screen flex justify-center items-center">
      <div>
        Test date:{" "}
        {new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Asia/Tehran",
        }).format(new Date("2025-09-24T08:28:21.887Z"))}
      </div>

      <div className="w-full md:w-[740px] px-8 md:px-0 flex flex-col items-center">
        {res?.status ? (
          <>
            <Image
              className="h-[74px] w-[74px] md:h-[110px] md:w-[110px]"
              src={successImg}
              alt="success-img"
            />
            <span className="mt-6 text-xs md:text-lg font-semibold">
              تراکنش با موفقیت انجام شد.
            </span>
          </>
        ) : (
          <>
            <Image
              className="h-[74px] w-[74px] md:h-[110px] md:w-[110px]"
              src={unsuccessImg}
              alt="success-img"
            />
            <span className="mt-6 text-xs md:text-lg font-semibold">
              مشکلی در انجام تراکنش به وجود آمده
            </span>
            <span className="mt-6 text-xs md:text-lg font-semibold">
              درصورت کسری وجه از موجودی شما تا 42 ساعت آینده برمیگردد
            </span>
          </>
        )}
        <Link
          href={APP_ROUTES.MY_CONTENT}
          className="bg-white border text-sm md:text-lg border-blue1 rounded-lg text-blue1 mt-8 p-2 px-4"
        >
          بازگشت به صفحه محصولات
        </Link>

        <div className="w-full h-[195px] mx-8 rounded-lg border border-LightGray mt-9 px-8 py-6 flex flex-col justify-between text-xs md:text-lg">
          {!!res?.amount && (
            <div className="flex items-center justify-between p-2">
              {res?.amount && (
                <>
                  <span>مبلغ پرداخت</span>
                  <span className="font-vazirFD">
                    {commaSeperatedDigit(res?.amount + "") == "0" ? (
                      "رایگان"
                    ) : (
                      <>{commaSeperatedDigit(res?.amount + "")} تومان</>
                    )}
                  </span>
                </>
              )}
            </div>
          )}
          {!!res?.date && (
            <div className="flex items-center justify-between p-2">
              {res?.date && (
                <>
                  <span>تاریخ</span>
                  <span className="font-vazirFD">
                    {formatShamsi(res?.date ?? "")}
                  </span>
                </>
              )}
            </div>
          )}
          {!!res?.trackingCode && (
            <div className="flex items-center justify-between p-2">
              {res?.trackingCode && (
                <>
                  <span>کد رهگیری</span>
                  <span className="font-vazirFD">
                    {res?.trackingCode ?? ""}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
