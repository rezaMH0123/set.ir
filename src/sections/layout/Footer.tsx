import aparatIcon from "@/assets/icons/aparat-icon.svg";
import telegramIcon from "@/assets/icons/telegram-icon.svg";
import instagramIcon from "@/assets/icons/instagram-icon.svg";
import Image from "next/image";
import Link from "next/link";
import APP_ROUTES from "@/constants/paths";
import { baseIcons } from "@/assets/icons";

const Footer: React.FC = () => {
  return (
    <footer dir="rtl" className="px-8">
      <div className=" mb-32 min-md:rounded-[30px]  min-md:mb-6 w-full mt-12 font-vazir bg-white text-[#4D4D4D] min-md:pt-16 min-md:shadow-[0_0_32px_0_rgba(0,0,0,0.32)]">
        <div className="max-w-[1600px] mx-auto w-full min-md:rounded-[30px] px-4">
          <div className="flex max-md:block w-full justify-center mx-auto gap-8 max-lg:gap-4">
            <div className="w-5/12 max-md:w-full grid pr-10 max-lg:pr-0 text-sm max-md:text-base font-medium max-md:font-normal">
              <Image
                alt="set"
                src={baseIcons.setBlueIcon}
                height={88}
                width={88}
                className="mx-auto mb-3 max-md:mb-2"
              />
              <p className="text-center mb-6 max-md:mb-4">
                ست، فروشگاه محتوای آموزشی با کیفیت و تضمین شده
              </p>
              <address className="text-center mb-7 max-md:mb-3">
                آدرس : اتوبان ستاری، بلوار فردوس شرق، خ رامین جنوبی کوچه سروی ،
                پلاک 25
              </address>

              <p className="text-center font-vazirFD mb-2">
                شماره تماس:
                <a
                  href="tel:+982144064273"
                  className="font-bold hover:underline"
                  style={{ direction: "rtl" }}
                >
                  44064273-021
                </a>
              </p>

              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=205845&Code=CvregDaFEZu3ChdoW5IG"
                title="مشاهده اعتبار نماد اعتماد الکترونیکی فروشگاه"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=205845&Code=CvregDaFEZu3ChdoW5IG"
                  alt="لوگوی نماد اعتماد الکترونیکی (اینماد)"
                  className="cursor-pointer w-20 h-20 mx-auto"
                  title="نماد اعتماد الکترونیکی فروشگاه"
                  data-code="CvregDaFEZu3ChdoW5IG"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...({ code: "CvregDaFEZu3ChdoW5IG" } as any)}
                />
              </a>
            </div>

            {/* لینک‌ها */}
            <div className="w-7/12 max-md:w-full flex flex-row pt-5 max-md:pt-12">
              <div className="w-fit mx-auto text-center flex flex-col gap-5 text-sm max-md:text-xs max-md:font-medium">
                <label className="font-semibold text-xl max-md:text-base mb-2 max-md:mb-0">
                  درباره ما
                </label>
                <Link href={APP_ROUTES.ABOUT}>درباره سِت</Link>
                <Link target="_blank" href="https://samin.co.ir/about-page/">
                  درباره ثمین
                </Link>
                <Link href={APP_ROUTES.COOPRATION}>همکاری با ما</Link>
                {/* <Link href={APP_ROUTES.CONTACT_US}>تماس با ما</Link> */}
              </div>
              <div className="w-fit mx-auto text-center flex flex-col gap-5 text-sm max-md:text-xs max-md:font-medium">
                <label className="font-semibold text-xl max-md:text-base mb-2 max-md:mb-0">
                  قوانین
                </label>
                <Link href={APP_ROUTES.POLICY}>قوانین و مقررات</Link>
                <Link href={APP_ROUTES.PRIVACY}>حریم خصوصی</Link>
                <Link href={APP_ROUTES.FAQ}>سوالات متداول</Link>
              </div>
              <div className="w-fit mx-auto text-center flex flex-col gap-5 text-sm max-md:text-xs max-md:font-medium">
                <label className="font-semibold text-xl max-md:text-base mb-2 max-md:mb-0">
                  مقاطع
                </label>
                <Link href={APP_ROUTES.ELEMENTRY_SCHOOL}>ابتدایی</Link>
                <Link href={APP_ROUTES.MIDDLE_SCHOOL}>متوسطه اول</Link>
                <Link href={APP_ROUTES.HIGH_SCHOOL}>متوسطه دوم</Link>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row justify-center items-center mt-2 mb-4 max-md:my-10 gap-4">
            <a
              href="https://www.aparat.com/SET.IR_LEVELUP"
              aria-label="آپارات فروشگاه ست"
              target="_blank"
            >
              <Image
                alt="aparat icon"
                src={aparatIcon}
                height={80}
                width={80}
                className="w-8 h-8 mx-1"
              />
            </a>
            <a
              href="https://t.me/set_ir_levelup"
              aria-label="کانال تلگرام فروشگاه ست"
              target="_blank"
            >
              <Image
                alt="telegram icon"
                src={telegramIcon}
                height={80}
                width={80}
                className="w-7 h-7 mx-1"
              />
            </a>
            <a
              href="https://www.instagram.com/set.ir.shop"
              aria-label="صفحه اینستاگرام فروشگاه ست"
              target="_blank"
            >
              <Image
                alt="instagram icon"
                src={instagramIcon}
                height={80}
                width={80}
                className="w-7 h-7 mx-1"
              />
            </a>
          </div>
        </div>

        <div className="w-full flex justify-center items-center gap-x-2 min-md:rounded-b-[28px] bg-[#224CDF] text-white text-center text-xs p-2">
          <p>تمامی حقوق مادی و معنوی این سایت متعلق به ثمین میباشد .</p>
          <span aria-hidden="true">©</span> ۱۴۰۴-۲۰۲۵ ثمین
        </div>
      </div>
    </footer>
  );
};

export default Footer;
