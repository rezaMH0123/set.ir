import { baseIcons } from "@/assets/icons";
import baseImages from "@/assets/images";
import Image from "next/image";

const listData = [
  {
    icon: baseIcons.cloudIcon,
    alt: "cloud",
    title: "نحوه استفاده از اطلاعات",
    desc: "پردازش سفارش‌ها، ارسال اطلاعیه‌ها، ارائه پشتیبانی فنی و بهبود کیفیت دوره‌ها و تجربه کاربری.",
  },
  {
    icon: baseIcons.dataIcon,
    alt: "data",
    title: "جمع‌آوری اطلاعات",
    desc: "ما برای بهبود تجربه کاربری، اطلاعاتی مانند نام، ایمیل، شماره تماس و جزئیات پرداخت (در صورت خرید) را جمع‌آوری می‌کنیم.",
  },
  {
    icon: baseIcons.cookiesIcon,
    alt: "cookies",
    title: "کوکی‌ها و فناوری‌های مشابه",
    desc: "ما برای بهبود تجربه کاربری از کوکی‌ها استفاده می‌کنیم. کاربران می‌توانند از طریق تنظیمات مرورگر خود، این ویژگی را غیرفعال کنند.",
  },
  {
    icon: baseIcons.secureIcon,
    alt: "security",
    title: "امنیت اطلاعات",
    desc: "ما با روش‌های امنیتی مناسب از اطلاعات کاربران محافظت کرده و از دسترسی، تغییر یا افشای غیرمجاز جلوگیری می‌کنیم.",
  },
  {
    icon: baseIcons.editIcon,
    alt: "edit",
    title: "تغییرات در سیاست‌های حریم خصوصی",
    desc: "ما ممکن است این سیاست‌ها را به‌روزرسانی کنیم و تغییرات از طریق همین صفحه اعلام خواهند شد.",
  },
  {
    icon: baseIcons.sharingIcon,
    alt: "sharing",
    title: "اشتراک‌گذاری اطلاعات با اشخاص ثالث",
    desc: "ما اطلاعات کاربران را نمی‌فروشیم یا منتقل نمی‌کنیم، مگر برای ارائه خدمات، رعایت قوانین یا حفظ امنیت کاربران و سایت.",
  },
  {
    icon: baseIcons.shieldIcon,
    alt: "shield",
    title: "حقوق کاربران",
    desc: "کاربران حق دارند اطلاعات خود را مشاهده، ویرایش یا حذف کنند. در صورت درخواست برای حذف حساب، لطفاً با پشتیبانی ما تماس بگیرید.",
  },
];

export const generateMetadata = () => {
  return {
    title: "حریم خصوصی | ست - آموزش مدرن برای دانش‌آموزان",
    description:
      "ما متعهد به حفاظت از اطلاعات شما هستیم. نحوه جمع‌آوری و استفاده از داده‌ها در صفحه حریم خصوصی ست.",
    keywords: [
      "حریم خصوصی",
      "حفاظت اطلاعات",
      "کوکی",
      "داده‌ها",
      "ست",
      "امنیت",
      "سیاست‌های حریم خصوصی",
    ],
    openGraph: {
      title: "حریم خصوصی | ست",
      description:
        "تعهد ما به حفاظت از داده‌های کاربران و شرح سیاست‌های حریم خصوصی در ست.",
      url: "https://set.ir/privacy",
      siteName: "ست",
      images: [
        {
          url: "/icon.png",
          width: 1200,
          height: 630,
          alt: "حریم خصوصی ست",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    alternates: {
      canonical: "https://set.ir/privacy",
    },
  };
};

export default function Privacy() {
  return (
    <div dir="rtl" className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "حریم خصوصی | ست",
            description:
              "ما متعهد به حفاظت از اطلاعات شما هستیم. نحوه جمع‌آوری و استفاده از داده‌ها در صفحه حریم خصوصی ست.",
            url: "https://set.ir/privacy",
            publisher: {
              "@type": "Organization",
              name: "ست",
              logo: {
                "@type": "ImageObject",
                url: "https://set.ir/icon.png",
              },
            },
          }),
        }}
      />
      <div className="relative w-full mx-auto h-96 max-md:h-56 text-white flex items-center">
        <div className="w-7/12 max-lg:w-10/12 max-md:w-11/12 max-md:mx-auto min-xl:mr-28 min-md:mr-16 min-lg:pl-20 min-md:pl-6 h-fit mb-8">
          <h2 className="text-3xl max-md:text-xl max-md:mx-auto font-semibold mb-4">
            حریم خصوصی
          </h2>
          <p className="text-2xl max-md:text-base max-md:mx-auto font-light">
            ما متعهد به حفاظت از اطلاعات شما هستیم. در این صفحه، نحوه جمع‌آوری و
            استفاده از داده‌ها را شفاف توضیح داده‌ایم. لطفاً مطالعه کنید و در
            صورت سوال با ما در تماس باشید.
          </p>
        </div>
        <Image
          src={baseImages.linearBg}
          alt="about-us"
          className="absolute max-lg:hidden -z-10 top-0 left-0 w-full h-full"
          priority
          loading="eager"
          sizes="100vw"
        />
        <Image
          src={baseImages.privacy}
          alt="about-us"
          className="absolute max-lg:hidden -z-10 top-24 left-44 max-xl:left-28 w-60"
          priority
          loading="eager"
          sizes="15rem"
        />
        <Image
          src={baseImages.linearBgMobile}
          alt="about-us"
          className="absolute min-lg:hidden -z-10 top-0 left-0 w-full h-full"
          priority
          loading="eager"
          sizes="100vw"
        />
      </div>

      <div
        className="text-[#262626] w-10/12 mx-auto gap-8 text-center flex flex-wrap"
        role="list"
      >
        {listData.map(({ icon, alt, title, desc }, i) => (
          <article key={i} className="mx-auto w-[340px] my-4" role="listitem">
            <Image
              className="mx-auto"
              src={icon}
              alt={alt}
              loading={i < 2 ? "eager" : "lazy"}
              priority={i < 2}
              sizes="(max-width: 768px) 50vw, 340px"
            />
            <h3 className="text-xl max-md:text-lg font-semibold mt-6 mb-4">
              {title}
            </h3>
            <p className="text-lg max-md:text-base">{desc}</p>
          </article>
        ))}
      </div>

      {/* <div className="w-[70%] max-xl:w-10/12 max-lg:w-11/12 mt-7 mb-16 mx-auto py-6 max-sm:py-3 min-md:px-12 rounded-[32px] min-md:shadow-[0_1px_6px_0_rgba(0,0,0,0.25)] text-[#262626]">
        <div className="min-md:flex justify-between items-center">
          <div className="min-md:w-6/12 max-md:mb-8">
            <div className="text-[22px] max-md:text-lg flex justify-start items-center font-medium mt-6 mb-3">
              <Image alt="support" src={baseIcons.supportIcon} />
              تماس با پشتیبانی
            </div>
            <div className="min-sm:text-lg">
              درصورت داشتن هر گونه ابهام و یا مشکل میتونید شماره تماس خودرا
              بگذارید تا از طرف تیم ست با شما تماس گرفته شود
            </div>
          </div>
          <div className="min-md:w-5/12">
            <div>
              <div className="text-lg">در چه حوزه ای سوال پیش اومده؟</div>
              <div className="">
                <input
                  type="text"
                  placeholder="مثلا : درباره چگونگی استفاده از اطلاعات شک دارم "
                  className="rounded-full border w-full h-10 pr-3 border-[#D9D9D9] focus:outline-0 mt-2 mb-6"
                />
              </div>
            </div>
            <div>
              <div className="text-lg">شماره تماس</div>
              <div className="">
                <input
                  type="text"
                  placeholder="مثلا : درباره چگونگی استفاده از اطلاعات شک دارم "
                  className="rounded-full border w-full h-10 pr-3 border-[#D9D9D9] focus:outline-0 mt-2 mb-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-md:justify-center justify-end items-center text-xl w-full">
          <button className=" py-2 w-28 rounded-full text-white bg-[#224CDF]">
            ثبت
          </button>
        </div>
      </div> */}
    </div>
  );
}
