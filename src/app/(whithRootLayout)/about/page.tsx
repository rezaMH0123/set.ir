import baseImages from "@/assets/images";
import Image from "next/image";

export const generateMetadata = () => {
  return {
    title: "درباره ست | آموزش مدرن برای دانش‌آموزان",
    description:
      "ست یک منبع آموزشی معتبر و تضمین‌شده است که به دانش‌آموزان کمک می‌کند تا مفاهیم درسی را بهتر درک کنند و مسیر یادگیری‌شان را هموار سازند.",
    keywords: ["ست", "آموزش", "کنکور", "یادگیری", "وبینار", "هوش مصنوعی"],
    openGraph: {
      title: "درباره ست",
      description: "با ست، یادگیری آسان‌تر از همیشه!",
      url: "https://set.ir/about",
      siteName: "ست",
      images: [
        {
          url: "/icon.png", //TODO: in this place you have to set image you want to detect
          width: 1200,
          height: 630,
          alt: "بنر سایت ست",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    alternates: {
      canonical: "https://set.ir/about",
    },
  };
};

export default function About() {
  return (
    <div dir="rtl" className="">
      <script id="ld-json" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ست",
          url: "https://set.ir",
          logo: "/icon.png",
          sameAs: [
            "https://instagram.com/yourpage",
            "https://twitter.com/yourpage",
          ],
          description:
            "ست منبع آموزشی مدرن، اقتصادی و مؤثر برای دانش‌آموزان فارسی‌زبان است.",
        })}
      </script>
      <div className="relative w-full mx-auto h-96 max-md:h-56 text-white flex items-center">
        <div className="w-7/12 max-lg:w-10/12 max-md:w-11/12 max-md:mx-auto min-xl:mr-28 min-md:mr-16 min-lg:pl-20 min-md:pl-6 h-fit mb-8">
          <h1 className="text-3xl max-md:text-xl max-md:mx-auto font-semibold mb-4">
            سِت از نزدیک تر
          </h1>
          <p className="text-2xl max-md:text-base max-md:mx-auto font-light">
            ست (samin educational tutorials) یک منبع آموزشی معتبر و تضمین‌شده
            است که با تولید و ارائه محتوای باکیفیت، به دانش‌آموزان کمک می‌کند تا
            مفاهیم درسی را بهتر درک کرده و مسیر یادگیری خود را هموارتر کنند.
          </p>
        </div>
        <Image
          src={baseImages.linearBg}
          alt="about-us"
          className="absolute max-lg:hidden -z-10 top-0 left-0 w-full h-full"
          width={1920}
          height={1080}
          priority
        />

        <Image
          src={baseImages.aboutUs}
          alt="about-us"
          className="absolute max-lg:hidden -z-10 top-24 left-44 max-xl:left-28 w-72"
          width={288}
          height={288}
          priority
        />

        <Image
          src={baseImages.linearBgMobile}
          alt="about-us"
          className="absolute min-lg:hidden -z-10 top-0 left-0 w-full h-full"
          width={375}
          height={667}
          priority
        />
      </div>
      <div className="text-[#262626]">
        <div className="mx-auto w-10/12 max-xl:w-11/12 flex flex-col md:flex-row justify-center items-center gap-24 max-lg:gap-8 my-16 max-md:my-10">
          <Image
            className="mx-auto max-md:w-56"
            src={baseImages.about1}
            alt="why-set"
            width={400}
            height={300}
            priority
          />
          <div className="h-fit">
            <h2 className="text-2xl max-md:text-lg font-semibold mb-6 max-md:mb-3">
              چرا ست
            </h2>
            <p className="text-xl max-md:text-base">
              در تیم ست با نوآوری در آموزش و ارائه محتوای به‌روز، سعی داریم
              تجربه‌ای متفاوت و اثر بخش را برای شما رقم بمی‌زنیم. هدف ست این است
              که با هزینه‌ای منطقی، یادگیری را برای همه دسترس‌پذیر کنیم. اگر به
              دنبال آموزشی مدرن، مؤثر و اقتصادی هستید، انتخاب درستی کرده‌اید!
            </p>
          </div>
        </div>
        <div className="mx-auto w-10/12 max-xl:w-11/12 flex flex-col md:flex-row justify-center items-center gap-24 max-lg:gap-8 my-16 max-md:my-10">
          <div className="h-fit order-2 md:order-1">
            <h2 className="text-2xl max-md:text-lg font-semibold mb-6 max-md:mb-3">
              تعهدات ما
            </h2>
            <p className="text-xl max-md:text-base">
              همواره ما در set در تلاشیم که تجربه خوبی رو برای شما به ارمغان
              بیاریم و همیشه کنار شما باشیم نه در مقابل شما تا باهم بتونیم مسیر
              رشد و پیشرفت رو طی کنیم ، از این سو ما قوانینی رو طرح کردیم تا
              حقوق شما حفظ بشه که باید قبل ورود به سامانه مطالعه کنین. همچینین
              تیم پشتیبانی 24ساعته ما پاسخ گو شما خواهد بود
            </p>
          </div>
          <Image
            className="mx-auto max-md:w-56 order-1 md:order-2"
            src={baseImages.about2}
            alt="our-obligations"
            width={400}
            height={300}
            loading="lazy"
          />
        </div>
        <div className="mx-auto w-10/12 max-xl:w-11/12 flex flex-col md:flex-row justify-center items-center gap-24 max-lg:gap-8 my-16 max-md:my-10">
          <Image
            className="mx-auto max-md:w-56"
            src={baseImages.about5}
            alt="webinars"
            width={500}
            height={300}
            loading="lazy"
          />
          <div className="h-fit">
            <h2 className="text-2xl max-md:text-lg font-semibold mb-6 max-md:mb-3">
              کمی از ثمین
            </h2>
            <p className="text-xl max-md:text-base">
              ست یکی از محصولات مهم مجموعه نرم افزاری مهندسی و آموزشی ثمین تراش
              می‌باشد. ما در این مجموعه همواره سعی در این داریم که نیروی حرفه و
              آگاه تربیت کنیم و شما دانش‌آموزان عزیز فارسی زبان را در تمام مسیر
              موفقیت همراهی کنیم.
            </p>
          </div>
        </div>

        <div className="mx-auto w-10/12 max-xl:w-11/12 flex flex-col md:flex-row justify-center items-center gap-24 max-lg:gap-8 my-16 max-md:my-10">
          <div className="h-fit order-2 md:order-1">
            <h2 className="text-2xl max-md:text-lg font-semibold mb-6 max-md:mb-3">
              وبینار و لایو ها
            </h2>
            <p className="text-xl max-md:text-base">
              هر از گاهی پخش زنده هایی رایگان برگزار میکنیم تا از احوال هم دیگه
              مطلع بشیم که از قبل بهتون خبرمیدیم ، این وبینا ها هدفشون اطلاع
              رسانی یکسری اخبار از آینده هستش (مخفیه ) ولی بعضی وقتا جایزه و
              قرعه کشی هم داریم پس خودتو براشون آماده نگهدار
            </p>
          </div>
          <Image
            className="mx-auto max-md:w-56 order-1 md:order-2"
            src={baseImages.about3}
            alt="our-obligations"
            width={600}
            height={400}
            loading="lazy"
          />
        </div>
        <div className="mx-auto w-10/12 max-xl:w-11/12 flex flex-col md:flex-row justify-center items-center gap-24 max-lg:gap-8 my-16 max-md:my-10">
          <Image
            className="mx-auto max-md:w-56"
            src={baseImages.about4}
            alt="webinars"
            width={600}
            height={400}
            loading="lazy"
          />

          <div className="h-fit">
            <h2 className="text-2xl max-md:text-lg font-semibold mb-6 max-md:mb-3">
              سر آغاز تا سرگذشت ما
            </h2>
            <p className="text-xl max-md:text-base">
              تیم ست ابتدا سال 1396 با نفر شروع به کار خود کرد که تمرکز خودش رو
              گذاشته بود روی فیزیک 12م ولی رفته رفته با تقاضای کاربر ها دروس
              دیگر هم پوشش داد و طی این سال های اخیر با گسترش تیم به 26 نفر تمام
              دروس از متوسطه اول تا دوم رو داریم اما امروز در تلاشیم که آموزش
              تماما رایگان رو در سطح کشوری و تمامی پایه ها داشته باشیم که البته
              با کمک شما عزیزان همیشه همراه set محقق میشود
            </p>
          </div>
        </div>
      </div>
      {/* <div className="font-bold text-2xl mx-8 mb-6">خبر های بیشتر از ما</div> */}
      {/* <div className="flex gap-6 w-full mx-auto mb-14">
        <SimpleSlider>
          <NewsCard
            link=""
            image={baseImages.news1}
            text="طی بررسی های انجام شده در سال های گذشته، تحلیل های ارائه شده از سوی نشر روان آموز دارای صحت و اعتبار بالایی بوده است. - طی بررسی های انجام شده در سال های گذشته، تحلیل های ارائه شده از سوی ..."
            title="آخرین زمان برگزاری کنکور"
            date="1404/1/6"
          />
          <NewsCard
            link=""
            image={baseImages.news1}
            text="با هوش مصنوعی خودت رو متوسعه بده : 
بله میتونی خودت رو با هوش مصنوعی ارتقا بدی و هر چیزی که بخوای ازش بپرسی از حوضه ورزشی گرفته تا مسائل فیزیکی سخت فقط لازمه که پرامپت مناسب بهش بدی در ادامه 20 نکته درباره پرامپت درست نوشتن میگیم که حتما کمکتون میکنه به جواب درست خودتون برسید ..."
            title="چگونه با هوش مصنوعی ..."
            date="1404/1/6"
          />
          <NewsCard
            link=""
            image={baseImages.news1}
            text="برای مدیریت هزینه‌های کنکور، ابتدا منابع رایگان و معتبر را بررسی کن، مثل کتاب‌های درسی، جزوه‌های معلمان و ویدیوهای آموزشی رایگان. سپس یک برنامه‌ریزی دقیق داشته باش تا روی مباحث مهم و پرتکرار کنکور تمرکز کنی و نیاز به شرکت در دوره‌های اضافی نداشته باشی. اگر احساس کردی به کلاس یا مشاوره ..."
            title="صرفه جویی در هزینه با ..."
            date="1404/1/6"
          />
          <NewsCard
            link=""
            image={baseImages.news1}
            text="در آپدیت جدید چتینوو، همواره تلاش شده تا هوش مصنوعی را به عنوان یک معلم هوشمند و همراه در مسیر یادگیری کاربران به کار بگیرند. این نسخه جدید امکانات متنوع و جذابی را در اختیار کاربران قرار می‌دهد تا فرآیند آموزش تعاملی‌تر، هوشمندتر و اثربخش‌تر شود."
            title="هوش مصنوعی معلم"
            date="1404/1/6"
          />
          <NewsCard
            link=""
            image={baseImages.news1}
            text="در آپدیت جدید چتینوو، همواره تلاش شده تا هوش مصنوعی را به عنوان یک معلم هوشمند و همراه در مسیر یادگیری کاربران به کار بگیرند. این نسخه جدید امکانات متنوع و جذابی را در اختیار کاربران قرار می‌دهد تا فرآیند آموزش تعاملی‌تر، هوشمندتر و اثربخش‌تر شود."
            title="هوش مصنوعی معلم"
            date="1404/1/6"
          />
        </SimpleSlider>
      </div> */}
    </div>
  );
}
