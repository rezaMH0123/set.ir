import baseImages from "@/assets/images";
import Image from "next/image";
import FAQItem from "../../../sections/faq/FaqItem";
import Link from "next/link";
import { OpportunitiesReadme } from "@/sections/opportunities/Readme";
import APP_ROUTES from "@/constants/paths";
import Head from "next/head";
import { baseIcons } from "@/assets/icons";

export const generateMetadata = () => {
  return {
    title: "فرصت‌های شغلی | ست - آموزش مدرن برای دانش‌آموزان",
    description:
      "اگر به دنبال محیطی پویا برای رشد و یادگیری هستید، فرصت‌های شغلی ست را بررسی کنید و به تیم ما بپیوندید.",
    keywords: ["فرصت شغلی", "استخدام", "شغل", "ست", "کار", "آموزش", "همکاری"],
    openGraph: {
      title: "فرصت‌های شغلی | ست",
      description:
        "بررسی موقعیت‌های شغلی و همکاری با تیم ست در محیطی خلاق و پویا.",
      url: "https://set.ir/opportunities",
      siteName: "ست",
      images: [
        {
          url: "/icon.png",
          width: 1200,
          height: 630,
          alt: "فرصت‌های شغلی ست",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    alternates: {
      canonical: "https://set.ir/opportunities",
    },
  };
};

export default function opportunities() {
  const opportunities = [
    {
      title: "طراحی",
      image: baseImages.opportunities1,
      icon: baseIcons.OpDesign,
    },
    {
      title: "پشتیبانی",
      image: baseImages.opportunities2,
      icon: baseIcons.OpOp,
    },
    {
      title: "تولید محتوا",
      image: baseImages.opportunities3,
      icon: baseIcons.OpCP,
    },
    {
      title: "برنامه نویسی",
      image: baseImages.opportunities4,
      icon: baseIcons.OpDev,
    },
  ];
  const faqs = [
    {
      question: "چجوری میتونم درخواست خودم رو بدم و رزومه بفرستم؟",
      answer:
        "برای ارسال درخواست، فرم مربوطه را تکمیل کنید و رزومه خود را ضمیمه نمایید.",
    },
    {
      question: "اگر فرم رو کامل کنم کی و چجوری بهم اطلاع میدید؟",
      answer:
        "پس از بررسی درخواست شما، از طریق ایمیل یا تماس تلفنی اطلاع‌رسانی خواهد شد.",
    },
    {
      question: "همکاری با شما چه مزیت‌هایی داره؟",
      answer:
        "ما فرصت رشد حرفه‌ای، محیط کاری پویا و پروژه‌های متنوع را برای همکاران فراهم می‌کنیم.",
    },
    {
      question: "نحوه کار با شما به صورت فریلنسری هستش یا حضوری؟",
      answer:
        "امکان همکاری به صورت فریلنسری یا حضوری بسته به نوع پروژه و توافق وجود دارد.",
    },
    {
      question: "آیا امکان ارتقای شغلی هم وجود داره؟",
      answer: "بله، در صورت عملکرد مناسب، فرصت‌های ارتقای شغلی فراهم است.",
    },
    {
      question: "محدودیت‌های شما برای همکاری با من چیه؟",
      answer:
        "محدودیت‌ها بستگی به نوع پروژه و تخصص مورد نیاز دارد که در زمان مصاحبه توضیح داده می‌شود.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div dir="rtl" className="">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <OpportunitiesReadme />
      <div className="relative w-full mx-auto h-96 max-md:h-56 text-white flex items-center">
        <div className="w-7/12 max-lg:w-10/12 max-md:w-11/12 max-md:mx-auto min-xl:mr-28 min-md:mr-16 min-lg:pl-20 min-md:pl-6 h-fit max-md:mb-8 mb-14">
          <h2 className="text-3xl max-md:text-xl max-md:mx-auto font-semibold mb-4">
            فرصت‌های شغلی
          </h2>
          <p className="text-2xl max-md:text-base max-md:mx-auto font-light">
            اگر به دنبال محیطی پویا برای رشد و یادگیری هستید، ما از همکاری با
            افراد مستعد و خلاق استقبال می‌کنیم. فرصت‌های شغلی ما را بررسی کنید و
            در صورت تمایل، به خانواده ما بپیوندید.
          </p>
        </div>
        <Image
          src={baseImages.linearBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute max-lg:hidden -z-10 top-0 left-0 w-full h-full"
          aria-hidden="true"
        />

        <Image
          src={baseImages.opportunities}
          alt="تصویر فرصت‌های شغلی"
          width={288}
          height={288}
          className="absolute max-lg:hidden -z-10 top-24 left-44 max-xl:left-28 w-72"
        />

        <Image
          src={baseImages.linearBgMobile}
          alt=""
          width={375}
          height={667}
          className="absolute min-lg:hidden -z-10 top-0 left-0 w-full h-full"
          aria-hidden="true"
        />
      </div>
      <section className="w-fit px-4 mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8">موقعیت های شغلی</h2>
        <div className="flex flex-wrap gap-8 max-md:gap-4 justify-center items-center">
          {opportunities.map((item, index) => (
            <Link
              aria-label="APP_ROUTES.COOPRATION"
              href={`${APP_ROUTES.COOPRATION}${APP_ROUTES.COOPRATION_FORM}`}
              key={index}
              className="relative w-[210px] max-sm:w-[150px] h-[290px] max-sm:h-[200px] cursor-pointer rounded-lg overflow-hidden shadow-md group"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#00000062] bg-opacity-40 flex items-center justify-center">
                <div className="place-items-center place-content-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    unoptimized
                    className="w-10 h-10 mb-10 mt-10"
                  />
                  <span className="text-white text-lg font-bold">
                    {item.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="w-8/12 max-md:w-10/12 max-sm:w-11/12 mx-auto my-14 mb-14 max-sm:mb-0">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
