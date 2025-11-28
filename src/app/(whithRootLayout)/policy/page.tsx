/* eslint-disable react/no-unescaped-entities */
import baseImages from "@/assets/images";
import Image from "next/image";

export default function Policy() {
  return (
    <div dir="rtl">
      <div className="relative w-full mx-auto h-96 max-md:h-56 text-white flex items-center">
        <div className="w-7/12 max-lg:w-10/12 max-md:w-11/12 max-md:mx-auto min-xl:mr-28 min-md:mr-16 min-lg:pl-20 min-md:pl-6 h-fit max-md:mb-8 mb-14">
          <h2 className="text-3xl max-md:text-xl max-md:mx-auto font-semibold mb-4">
            قوانین و مقررات فروشگاه ست
          </h2>
          <p className="text-2xl max-md:text-base max-md:mx-auto font-light">
            در حوزه فروش دوره‌های درسی فعالیت می‌کند و تمامی محتواها توسط تیم ما
            تولید شده‌اند. استفاده از خدمات این سایت به منزله پذیرش تمامی قوانین
            و مقررات زیر است. لطفاً قبل از استفاده از سایت، این موارد را به دقت
            مطالعه کنید.
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
          src={baseImages.policy}
          alt="تصویر قوانین و مقررات فروشگاه ست"
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

      <div className="text-[#262626] w-8/12 max-xl:w-10/12 max-md:w-11/12 mx-auto my-10">
        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            تعاریف و اصطلاحات
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            در این سند، "کاربر" به هر شخصی که از سایت استفاده می‌کند اطلاق
            می‌شود. "دوره آموزشی" شامل تمامی محتوای آموزشی ارائه شده در سایت
            است. "حساب کاربری" به پروفایلی گفته می‌شود که کاربران برای دسترسی به
            دوره‌های خریداری شده ایجاد می‌کنند.
          </p>
        </section>

        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            شرایط استفاده از خدمات
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            کاربران موظف‌اند هنگام ثبت‌نام و خرید دوره‌ها اطلاعات صحیح و دقیق
            ارائه دهند. دسترسی به دوره‌های خریداری‌شده صرفاً برای استفاده شخصی
            کاربران مجاز است و انتشار، فروش مجدد یا ارائه آن به اشخاص دیگر ممنوع
            است. هرگونه تخلف در این زمینه پیگرد قانونی خواهد داشت. کاربران مسئول
            حفظ اطلاعات حساب خود هستند و در صورت هرگونه سوءاستفاده از حساب
            کاربری، سایت "ست" هیچ‌گونه مسئولیتی نخواهد داشت.
          </p>
        </section>

        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            مالکیت معنوی و حقوق محتوا
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            تمامی محتواهای آموزشی، ویدئوها، فایل‌ها و سایر مطالب ارائه‌شده در
            سایت "ست" به‌صورت انحصاری متعلق به این سایت بوده و مشمول قوانین
            مالکیت معنوی هستند. کاربران به هیچ وجه مجاز به ضبط، تکثیر، انتشار یا
            استفاده تجاری از محتواهای سایت بدون دریافت مجوز رسمی از "ست" نیستند.
            هرگونه تخلف در این زمینه موجب مسدود شدن حساب کاربری و پیگیری قانونی
            خواهد شد.
          </p>
        </section>

        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            پرداخت و بازگشت وجه
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            تمامی پرداخت‌ها از طریق درگاه‌های معتبر بانکی انجام می‌شود و کاربران
            موظف به بررسی اطلاعات خود قبل از تکمیل خرید هستند. به دلیل ماهیت
            دیجیتالی دوره‌های آموزشی، امکان بازگشت وجه وجود ندارد، مگر در مواردی
            که اشکال فنی از سمت سایت تأیید شده باشد. در چنین شرایطی، درخواست
            کاربر بررسی شده و در صورت تأیید، اقدامات لازم صورت خواهد گرفت. امکان
            برداشت از کیف پول وجود ندارد به همین جهت هنگام شارژ کیف حتما توجه به
            این مورد داشته باشید که فقط خرید انجام میشه.
          </p>
        </section>

        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            حریم خصوصی و امنیت اطلاعات
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            "ست" متعهد به حفظ اطلاعات شخصی کاربران بوده و این اطلاعات صرفاً برای
            ارائه خدمات بهتر استفاده می‌شوند. کاربران موظف‌اند از اشتراک‌گذاری
            اطلاعات ورود به حساب خود با دیگران خودداری کنند. در صورت مشاهده
            هرگونه سوءاستفاده یا دسترسی غیرمجاز، کاربر موظف است موضوع را به تیم
            پشتیبانی اطلاع دهد.
          </p>
        </section>

        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            تغییر در قوانین و مقررات
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            "ست" حق دارد هر زمان که لازم باشد، این قوانین را تغییر دهد یا
            به‌روزرسانی کند. نسخه جدید قوانین در همین صفحه منتشر خواهد شد و
            ادامه استفاده از سایت پس از اعمال تغییرات، به منزله پذیرش قوانین
            جدید است.
          </p>
        </section>

        <section className="mx-auto my-4">
          <h3 className="text-xl max-md:text-lg font-semibold mt-10 mb-3">
            ارتباط با پشتیبانی
          </h3>
          <p className="text-lg min-md:font-medium max-md:text-base">
            در صورت بروز هرگونه مشکل یا سوال، کاربران می‌توانند از طریق بخش
            پشتیبانی سایت یا ایمیل رسمی با ما در ارتباط باشند. تیم ما همواره
            آماده پاسخگویی و رفع مشکلات کاربران خواهد بود.
          </p>
        </section>
      </div>
    </div>
  );
}
