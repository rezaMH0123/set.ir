import baseImages from "@/assets/images";
import sampleSlider from "@/assets/images/sampleSlider.png";
import sampleSlider2 from "@/assets/images/sampleSlider2.png";
import sampleSlider3 from "@/assets/images/sampleSlider3.png";
import CategoryCard from "@/components/cards/categoryCard";
import ToastClient from "@/components/ToastClient";
import { BASE_IMAGE_URL } from "@/configs/globals";
import APP_ROUTES from "@/constants/paths";
import { getCachedAppearance } from "@/core/apiCalls/landing";
import Image from "next/image";
import SpecialSlider from "@/components/sliders/SpecialSlider";
import LandingSliders from "@/sections/landing/landingSliders";
import InfiniteSlider from "@/components/sliders/InfiniteSlider";

export const revalidate = 300;

const cartData = [
  {
    image: baseImages.konkoor,
    title: "امتحان نهایی",
    link: APP_ROUTES.FINAL_EXAM,
    className:
      "[background:linear-gradient(102.51deg,#D7A02B_0.22%,#FFC03A_99.78%)] [box-shadow:0px_1px_3.1px_0px_#EFB334]",
  },
  {
    image: baseImages.middleSchool2,
    title: "متوسطه دوم",
    link: APP_ROUTES.HIGH_SCHOOL,
    className:
      "[background:linear-gradient(102.51deg,#2AB751_0.22%,#5BF085_99.78%)] [box-shadow:0px_1px_3.1px_0px_#4CDF75]",
  },
  {
    image: baseImages.middleSchool1,
    title: "متوسطه اول",
    link: APP_ROUTES.MIDDLE_SCHOOL,
    className:
      "[background:linear-gradient(102.51deg,#6B3FE2_0.22%,#A380FF_99.78%)] [box-shadow:0px_1px_3.1px_0px_#926CF6]",
  },
  {
    image: baseImages.elementarySchool,
    title: "ابتدایی",
    link: APP_ROUTES.ELEMENTRY_SCHOOL,
    className:
      "[background:linear-gradient(102.51deg,#CD37A9_0.22%,#FB4ED1_99.78%)] [box-shadow:0px_1px_3.1px_0px_#ED46C5]",
  },
];

export default async function Home() {
  const appearanceJson = await getCachedAppearance();

  // آماده کردن اسلایدها
  const slides = appearanceJson?.["banner-slider"]?.map((slide) => ({
    image: BASE_IMAGE_URL + slide.imageUrl,
    link: slide.link ?? "/",
  })) ?? [
    { image: sampleSlider, link: "/" },
    { image: sampleSlider2, link: "/" },
    { image: sampleSlider3, link: "/" },
  ];

  // جدا کردن تصویر اول برای SSR
  const firstSlide = slides[0];
  const remainingSlides = slides.slice(1);

  return (
    <main
      dir="rtl"
      className="min-h-screen flex flex-col max-w-[1920px] w-screen place-self-center overflow-x-hidden"
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "سِت - آموزش آنلاین",
            url: "https://set-edu.ir",
            logo: "https://set-edu.ir/logo.png",
            sameAs: [
              "https://instagram.com/setedu",
              "https://twitter.com/setedu",
            ],
          }),
        }}
      />

      {/* Meta */}
      <meta
        property="og:description"
        content="فروشگاه ست با ارائه بیش از 4000 محتوای آموزشی با کیفیت و تضمین شده، از پایه اول دبستان تا پایه دوازدهم متوسطه دوم، یادگیری و آموزش را برای تمامی دانش آموزان در سراسر ایران آسان کرده است."
      />
      <meta
        name="description"
        content="فروشگاه ست با ارائه بیش از 4000 محتوای آموزشی با کیفیت و تضمین شده، از پایه اول دبستان تا پایه دوازدهم متوسطه دوم، یادگیری و آموزش را برای تمامی دانش آموزان در سراسر ایران آسان کرده است."
      />
      <h1 className="sr-only">
        فروشگاه ست - ارائه دهنده محتوای آموزشی با کیفیت و تضمین شده
      </h1>

      <section aria-label="بنرها، دسته‌بندی‌ها و محتوای آموزشی اصلی سایت سِت">
        <div className="flex-grow">
          <section className="w-full">
            <aside aria-label="اسلایدر بنرهای ویژه">
              <div className="w-full aspect-[2] md:h-[400px] relative">
                <Image
                  src={firstSlide.image}
                  alt={"بنر ویژه"}
                  width={1920}
                  height={800}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  quality={75}
                />
              </div>

              {remainingSlides.length > 0 && (
                <SpecialSlider slides={remainingSlides} />
              )}
            </aside>
          </section>

          {/* دسته‌بندی مقاطع تحصیلی */}
          <section aria-label="دسته‌بندی‌های مقاطع تحصیلی">
            <div className="md:flex-nowrap justify-stretch flex flex-wrap w-full lg:w-9/12 max-xl:w-11/12 max-lg:w-full md:px-4 md:overflow-x-auto md:gap-6 mx-auto flex-row pt-4 pb-2 md:pt-20">
              {cartData.map((cat) => (
                <CategoryCard
                  key={cat.title}
                  image={cat.image}
                  title={cat.title}
                  link={cat.link}
                  className={cat.className}
                />
              ))}
            </div>
          </section>

          {/* محصولات و دوره‌ها */}
          <section aria-label="محصولات و دوره‌های آموزشی">
            <LandingSliders appearanceJson={appearanceJson} />
          </section>
        </div>
      </section>

      <div className="py-12 pr-1 w-10/12 max-xl:w-11/12 max-lg:w-full mx-auto text-[#3F3F3F] ">
        <section aria-label="چرا سِت؟ آمار و مزایا">
          <h1 className="text-4xl mb-3 text-blue1">فروشگاه محتوا آموزشی سِت</h1>
          <p className="mb-6 max-w-[980px]">
            فروشگاه ست با ارائه بیش از 4000 محتوای آموزشی با کیفیت و تضمین شده،
            از پایه اول دبستان تا پایه دوازدهم متوسطه دوم، یادگیری و آموزش را
            برای تمامی دانش آموزان در سراسر ایران آسان کرده است.
          </p>
          <ul className="container mb-16 mx-auto flex gap-x-28 max-sm:block">
            <li className="gap-8 p-4 pb-0 mx-auto w-full rounded-xl shadow-card1 border border-gray-100">
              <h2 className="text-xl max-lg:text-xl font-semibold mb-2 text-gray-700 h-6">
                ضمانت کیفیت
              </h2>
              <p className="text-gray-600 text-base max-lg:text-base mb-2 h-10">
                با اطمینان از کیفیت محتوا درس بخوان
              </p>
              <div className="relative h-16 flex justify-end">
                <Image
                  src={baseImages.quality}
                  alt="ضمانت کیفیت آموزش و خدمات آموزشی"
                  title="با خیال راحت درس بخون و از کیفیت آموزش مطمئن باش"
                  className="object-contain relative "
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
            </li>

            <li className="gap-8 p-4 pb-0 mx-auto w-full rounded-xl shadow-card1 border border-gray-100">
              <h2 className="text-xl max-lg:text-xl font-semibold mb-2 text-gray-700 h-6">
                4000+ محتوای رایگان
              </h2>
              <p className="text-gray-600 text-base max-lg:text-base mb-2 h-10">
                نمونه سوالات ، آزمون ، خلاصه نکات و ویدیو های آموزشی رایگان
              </p>

              <div className="relative h-16 flex justify-end">
                <Image
                  src={baseImages.contents}
                  alt="محتوای آموزشی رایگان شامل نمونه سوالات، آزمون‌ها و ویدئوهای آموزشی"
                  title="۴۰۰۰+ محتوای آموزشی رایگان برای دانش‌آموزان"
                  className="object-contain relative  "
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
            </li>

            <li className="gap-8 p-4 pb-0 mx-auto w-full rounded-xl shadow-card1 border border-gray-100">
              <h2 className="text-xl max-lg:text-xl font-semibold mb-2 text-gray-700 h-6">
                10,000+ دانش آموز
              </h2>
              <p className="text-gray-600 text-base max-lg:text-base mb-2 h-10">
                10 هزار دانش آموز فعال در حال حاضر
              </p>

              <div className="relative h-16 flex justify-end">
                <Image
                  src={baseImages.students}
                  alt="آموزش آنلاین برای دانش‌آموزان فعال"
                  title="۱۰,۰۰۰+ دانش‌آموز فعال در دوره‌های آموزشی آنلاین"
                  className="object-contain relative"
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
            </li>
          </ul>
        </section>

        <section aria-label="موسسات و همکاران آموزشی - نسخه دسکتاپ">
          <div className="mx-auto flex flex-row max-md:hidden">
            <div className="relative w-[160px] h-14 mx-auto max-lg:h-8 max-sm:mx-5">
              <Image
                src={baseImages.chatinoo}
                alt="موسسه آموزشی چتینوو"
                title="موسسه آموزشی چتینوو - همکاری آموزشی آنلاین"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="relative w-[160px] h-14 mx-auto max-lg:h-8 max-sm:mx-5">
              <Image
                src={baseImages.amoozeshParvaresh}
                alt="موسسه آموزشی آموزش و پرورش"
                title="موسسه آموزشی آموزش و پرورش - دوره‌های آموزشی آنلاین"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>

            <div className="relative w-[160px] h-14 mx-auto max-lg:h-8 max-sm:mx-5">
              <Image
                src={baseImages.khajeNasir}
                alt="دانشگاه خواجه نصیر"
                title="دانشگاه خواجه نصیر - همکاری آموزشی آنلاین"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>

            <div className="relative w-[160px] h-14 mx-auto max-lg:h-8 max-sm:mx-5">
              <Image
                src={baseImages.shiraz}
                alt="دانشگاه شیراز"
                title="دانشگاه شیراز - همکاری آموزشی آنلاین"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>

            <div className="relative w-[160px] h-14 mx-auto max-lg:h-8 max-sm:mx-5">
              <Image
                src={baseImages.sharif}
                alt="دانشگاه صنعتی شریف"
                title="دانشگاه صنعتی شریف - همکاری آموزشی آنلاین"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section aria-label="موسسات و همکاران آموزشی - نسخه موبایل">
          <div className="min-md:hidden">
            <InfiniteSlider>
              <div className="relative w-[128px] h-20 mx-auto max-lg:h-8 max-sm:mx-5">
                <Image
                  src={baseImages.chatinoo}
                  alt="موسسه آموزشی چتینوو"
                  title="موسسه آموزشی چتینوو - همکاری آموزشی آنلاین"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              <div className="relative w-[128px] h-20 mx-auto max-lg:h-8 max-sm:mx-5">
                <Image
                  src={baseImages.amoozeshParvaresh}
                  alt="موسسه آموزشی آموزش و پرورش"
                  title="موسسه آموزشی آموزش و پرورش - دوره‌های آموزشی آنلاین"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              <div className="relative w-[128px] h-20 mx-auto max-lg:h-8 max-sm:mx-5">
                <Image
                  src={baseImages.khajeNasir}
                  alt="دانشگاه خواجه نصیر"
                  title="دانشگاه خواجه نصیر - همکاری آموزشی آنلاین"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              <div className="relative w-[128px] h-20 mx-auto max-lg:h-8 max-sm:mx-5">
                <Image
                  src={baseImages.shiraz}
                  alt="دانشگاه شیراز"
                  title="دانشگاه شیراز - همکاری آموزشی آنلاین"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              <div className="relative w-[128px] h-20 mx-auto max-lg:h-8 max-sm:mx-5">
                <Image
                  src={baseImages.sharif}
                  alt="دانشگاه صنعتی شریف"
                  title="دانشگاه صنعتی شریف - همکاری آموزشی آنلاین"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </InfiniteSlider>
          </div>
        </section>
      </div>

      <ToastClient />
    </main>
  );
}
