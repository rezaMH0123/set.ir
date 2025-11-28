import baseImages from "@/assets/images";
import Image from "next/image";
import FAQItem from "../../../sections/faq/FaqItem";

export const generateMetadata = () => {
  return {
    title: "سوالات پرتکرار | ست - آموزش مدرن برای دانش‌آموزان",
    description:
      "به رایج‌ترین سوالات کاربران درباره دوره‌ها، خرید و دسترسی به محتوای آموزشی پاسخ داده‌ایم. در صورت نیاز، تیم پشتیبانی آماده پاسخگویی است.",
    keywords: [
      "سوالات پرتکرار",
      "FAQ",
      "ست",
      "آموزش",
      "پشتیبانی",
      "دوره آموزشی",
    ],
    openGraph: {
      title: "سوالات پرتکرار | ست",
      description:
        "پاسخ به سوالات رایج درباره دوره‌ها، خرید و دسترسی به آموزش‌ها.",
      url: "https://set.ir/faq",
      siteName: "ست",
      images: [
        {
          url: "/icon.png",
          width: 1200,
          height: 630,
          alt: "سوالات پرتکرار ست",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    alternates: {
      canonical: "https://set.ir/faq",
    },
  };
};

export default function Faq() {
  const faqs = [
    {
      title: "ورود و ثبت‌نام",
      questions: [
        {
          question: "چرا نمی‌توانم ثبت‌نام کنم؟ (پیغام خطایی نشان داده می‌شود)",
          answer:
            "ابتدا از صحیح بودن شماره و رمز عبور مطمئن شوید. اگر پیام «شماره تکراری» آمد یعنی قبلاً ثبت‌نام شده از بازیابی رمز استفاده کنید. در صورتی که مشکل غیر از این بود، مرورگر خود را ببندید و دوباره باز کنید (یا کش را پاک کنید) و دوباره تلاش کنید. اگر باز هم مشکل حل نشد، اسکرین‌شات خطا را همراه با اطلاعات دستگاه و نام مرورگر برای پشتیبانی ارسال کنید.",
        },
        {
          question: "رمز عبورم را فراموش کردم، چطور بازیابی کنم؟",
          answer:
            "روی «فراموشی رمز» کلیک کنید، شماره‌تان را وارد کنید؛ کد بازیابی برای شما ارسال می‌شود. اگر پیامک را دریافت نکردید پوشه‌ی spam را چک کنید و در صورت نیاز درخواست ارسال مجدد دهید.",
        },
        {
          question:
            "بعد از ثبت‌نام، وارد حسابم نمی‌شوم (خطای ورود) چه کار کنم؟",
          answer:
            "مطمئن شوید حساب‌تان فعال شده (ممکن است توسط پشتیبانی مسدود شده باشید). کوکی‌ها/کش مرورگر را پاک کنید یا با یک مرورگر دیگر تست کنید. اگر از فیلترشکن استفاده می‌کنید، آن را خاموش کنید و دوباره تلاش کنید. اگر باز هم مشکل بود به پشتیبانی پیام دهید و اطلاعات خطا را ارسال کنید.",
        },
      ],
    },
    {
      title: "سبد خرید",
      questions: [
        {
          question: "چطور یک دوره را به سبد خرید اضافه کنم؟",
          answer:
            "روی دکمه‌ی «افزودن به سبد» در صفحه‌ی محصول کلیک کنید. به صفحه‌ی سبد هدایت می‌شوید و «ادامه به پرداخت» را انتخاب کنید.",
        },
        {
          question: "آیتم‌ها در سبد خرید ذخیره نمی‌شوند؛ چرا؟",
          answer:
            "احتمالاً کوکی‌ها یا local storage مرورگر غیرفعال است یا شما در حالت ناشناس (incognito) هستید. کوکی‌ها را فعال کنید یا وارد حساب کاربری شوید تا سبد ذخیره شود. اگر مشکل غیر از این هست، پیام خطا را برای پشتیبانی ارسال کنید.",
        },
        {
          question:
            "چطور می‌توانم یک کالا را از سبد حذف یا تعداد را تغییر دهم؟",
          answer:
            "به صفحه‌ی سبد بروید، روی آیکون حذف یا فیلد تعداد کلیک کنید و تغییر را تأیید کنید. در صورت نمایش قیمت قدیمی، صفحه را رفرش کنید.",
        },
      ],
    },
    {
      title: "شارژ کیف پول",
      questions: [
        {
          question: "چگونه کیف پولم را شارژ کنم؟",
          answer:
            "وارد حساب شوید ← منوی کیف پول/ موجودی ← «شارژ کیف پول» را انتخاب کنید ← مبلغ را وارد و درگاه پرداخت را انتخاب کنید ← پرداخت را تکمیل کنید. بعد از موفقیت، موجودی بلافاصله به‌روزرسانی می‌شود.",
        },
        {
          question: "بعد از پرداخت، موجودی به‌روزرسانی نشده باید چه کنم؟",
          answer:
            "ابتدا رسید پرداخت و وضعیت تراکنش بانکی را بررسی کنید. در صورت موفق بودن تراکنش، اسکرین‌شات رسید (شماره تراکنش، زمان، مبلغ) را در تیکت ارسال کنید تا بررسی و دستی‌سازی شود. معمولاً این فرآیند حداکثر چند دقیقه طول می‌کشد مگر در شرایط خاص.",
        },
        {
          question: "آیا امکان بازگشت وجه از کیف پول وجود دارد؟",
          answer:
            "بازگشت وجه بستگی در حالتی که مشکل از محصول باشد وجود دارد. برای درخواست بازگشت وجه، تیکت بزنید و دلیل + اطلاعات تراکنش را ارسال کنید تا پشتیبانی راهنمایی کند.",
        },
      ],
    },
    {
      title: "ثبت تیکت",
      questions: [
        {
          question: "چگونه تیکت ثبت کنم و پاسخ چه‌قدر طول می‌کشد؟",
          answer:
            "وارد حساب → منوی کاربری/تیکت‌ها → «ثبت تیکت جدید» → موضوع، توضیح و در صورت امکان اسکرین‌شات را بارگذاری کنید. زمان پاسخ‌دهی بسته به بار کاری متفاوت است؛ معمولاً ظرف 24–72 ساعت کاری پاسخ اولیه داده می‌شود.",
        },
        {
          question: "چه اطلاعاتی موقع ثبت تیکت قرار بدهم؟",
          answer:
            "شرح دقیق مشکل، مراحل تکرار مشکل، لینک صفحه یا محصول، اسکرین‌شات یا ویدئو، نوع دستگاه و نام مرورگر و زمان رخداد. این موارد کمک می‌کند سریع‌تر مشکل بررسی و رفع شود.",
        },
        {
          question: "اگر تیکت جواب نگرفت چه کار کنم؟",
          answer:
            "تیکت قبلی را باز کنید و با عنوان «فوری» پاسخ دهید یا یک تیکت جدید با ارجاع به شماره تیکت قبلی ثبت کنید. می‌توانید از کانال‌های پشتیبانی دیگر (چت زنده، ایمیل) هم استفاده کنید.",
        },
      ],
    },
    {
      title: "عدم نمایش محتوا",
      questions: [
        {
          question: "محتوای خریداری شده برای من ظاهر نمی‌شود، چرا؟",
          answer:
            "ابتدا وارد حسابی شوید که با آن خرید انجام شده است. اگر محتوا در بخش «محتوا من» نیست، بررسی کنید پرداخت با موفقیت ثبت شده باشد. اسکرین‌شات فاکتور یا شماره سفارش را برای پشتیبانی ارسال کنید تا محتوای شما فعال شود.",
        },
        {
          question: "بعضی فصل‌ها یا ویدئوها خطای «موجود نیست» نشان می‌دهند.",
          answer:
            "ممکن است محتوایی تازه آپلودش کامل نشده باشد یا فایل به‌صورت موقت حذف شده باشد. تیکت بزنید تا تیم فنی وضعیت فایل را بررسی و در صورت نیاز با تولیدکننده هماهنگ کند.",
        },
      ],
    },
    {
      title: "باز نشدن یک صفحه",
      questions: [
        {
          question:
            "وقتی روی یک صفحه کلیک می‌کنم، صفحه باز نمی‌شود یا ارور ۵۰۰/۴۰۴ می‌دهد، دلیلش چیست؟",
          answer:
            "خطای ۴۰۴ یعنی صفحه وجود ندارد یا لینک اشتباه است؛ خطای ۵۰۰ نشان‌دهنده مشکل سروری است. ابتدا صفحه را رفرش کنید، کوکی و کش را پاک کنید، یا با مرورگر/دستگاه دیگر تست کنید. اگر مشکل ادامه دارد، آدرس صفحه و زمان وقوع را در تیکت ارسال کنید تا بررسی شود.",
        },
        {
          question:
            "صفحه دانلود باز نمی‌شود یا دانلود قطع می‌شود باید چکار کنم؟",
          answer:
            "مطمئن شوید اتصال اینترنت پایدار است و از download manager یا مرورگر دیگر استفاده کنید. اگر فایل حجیم است، از اتصال پرسرعت یا وای‌فای استفاده کنید. در صورت خطای سرور، تیکت بزنید تا لینک جایگزین یا رفع مشکل انجام شود.",
        },
      ],
    },
    {
      title: "عدم نمایش نتیجه موقع جست‌وجوی محتوا",
      questions: [
        {
          question:
            "وقتی کلمه‌ای را جست‌وجو می‌کنم، نتیجه‌ای نشان داده نمی‌شود درحالی‌که محتوا وجود دارد.",
          answer:
            "احتمالاً کلمات کلیدی محصول با عبارت جست‌وجویی شما مطابق نیستند؛ از کلیدواژه‌های اصلی (عنوان، نویسنده، موضوع) استفاده کنید. اگر هنوز پیدا نمی‌شود، لینک یا عنوان محتوا را برای ما ارسال کنید تا ایندکس جست‌وجو بررسی شود.",
        },
        {
          question: "جست‌وجو فقط چند نتیجه نشان می‌دهد یا خطا می‌دهد.",
          answer:
            "ممکن است فیلترها (دسته، قیمت، سطح) فعال باشند؛ فیلترها را ریست کنید. اگر خطای سیستمی است، تیکت بزنید تا تیم فنی بررسی کند.",
        },
      ],
    },
    {
      title: "توقع وجود محتوای غیر‌درسی",
      questions: [
        {
          question:
            "توقع داشتم محتوای سرگرمی/تفریحی در سایت باشد؛ چرا فقط محتوای آموزشی است؟",
          answer:
            "سایت ما تمرکز بر فروش محتوای آموزشی دارد. اگر نوع خاصی از محتوای غیر درسی مدنظرتان است (مثلاً پادکست‌های سبک‌زندگی یا دوره‌های مهارتی سبک)، می‌توانید پیشنهاد دهید تا بررسی کنیم یا از تولیدکنندگان مناسبدعوت کنیم.",
        },
        {
          question: "آیا می‌توانم محتوای غیردرسی در سایت پیدا کنیم؟",
          answer:
            "درحال حاضر در مجموعه ست در حال تهیه محتوای آموزشی و مهارتی نیز هستیم تا بتونیم به دانش‌آموزان عزیز در راستای یادگیری و رشد کمک کنیم.",
        },
      ],
    },
    {
      title: "علت هزینه کم محتواها",
      questions: [
        {
          question: "چرا بعضی محتواها قیمت پایینی دارند؟ آیا کیفیت پایین است؟",
          answer:
            "قیمت محتوا به چند عامل بستگی دارد: طول محتوا، عمق آموزشی، سطح مدرس، هدف فروش و سیاست قیمت‌گذاری مجموعه ست بر عوامل دیگری پایه گذاری شده. علت محتوای ارزان کیفیت پایین نیست بلکه برعکس سعی ما بر این بوده تا این امکان رو فراهم کنیم که مخاطبان بیشتری جذب محتوای با کیفیت کنیم و امکان خرید توسط افراد با سطح درآمدی کم هم فراهم باشد.",
        },
        {
          question: "آیا محتواهای ارزان شامل پشتیبانی یا آپدیت می‌شوند؟",
          answer:
            "تمام محتوای های مجموعه ست دارای پشتیبانی طولانی مدت هستند و پشتیابانان ما پاسخ گوی شم هستند.",
        },
      ],
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((section) =>
      section.questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      }))
    ),
  };

  return (
    <div dir="rtl" className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative w-full mx-auto h-96 max-md:h-56 text-white flex items-center">
        <div className="w-7/12 max-lg:w-10/12 max-md:w-11/12 max-md:mx-auto min-xl:mr-28 min-md:mr-16 min-lg:pl-20 min-md:pl-6 h-fit max-md:mb-8 mb-14">
          <h2 className="text-3xl max-md:text-xl max-md:mx-auto font-semibold mb-4">
            سوالات پر تکرار
          </h2>
          <p className="text-2xl max-md:text-base max-md:mx-auto font-light">
            در این بخش به رایج‌ترین سوالات کاربران درباره دوره‌ها، خرید و دسترسی
            به محتوای آموزشی پاسخ داده‌ایم. مطالعه این صفحه می‌تواند بسیاری از
            ابهامات شما را برطرف کند. با این حال، اگر سوال خاصی داشتید، تیم
            پشتیبانی ما آماده پاسخگویی است.
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
          src={baseImages.faq}
          alt="تصویر سوالات متداول"
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

      {/* 
      سه بخش سوال
      <div className="w-6/12 max-md:hidden mt-10 mb-10 mx-auto flex justify-center gap-20 max-lg:gap-12 font-medium text-xl items-center text-[#224CDF]">
        <div className="py-2 min-w-fit flex justify-center items-center">
          <Image alt="login" src={baseIcons.loginLockIcon} className=" ml-2" />
          ثبت نام و ورود
        </div>
        <div className="py-2 min-w-fit flex justify-center items-center border-b-[3px] border-[#224CDF]">
          <Image alt="login" src={baseIcons.clipIcon} className=" ml-2" />
          محتوا ها
        </div>
        <div className="py-2 min-w-fit flex justify-center items-center">
          <Image alt="login" src={baseIcons.basketIcon} className=" ml-2" />
          سفارش ها و خرید ها
        </div>
      </div> */}
      <div className="w-8/12 max-md:w-10/12 max-sm:w-11/12 mx-auto my-14 mb-14 max-sm:mb-0">
        {faqs.map((faqsSection, index) => {
          return (
            <div key={index}>
              <h2 className="text-2xl mt-6 font-bold">{faqsSection.title}</h2>
              {faqsSection.questions.map(({ answer, question }, i) => (
                <FAQItem key={i} question={question} answer={answer} />
              ))}
            </div>
          );
        })}
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
