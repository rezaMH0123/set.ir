import baseImages from "@/assets/images";
import EmptyState from "@/components/EmptyState";
import APP_ROUTES from "@/constants/paths";

export default function NotFound() {
  return (
    <div dir="rtl" className="h-screen w-full flex justify-center items-center">
      <EmptyState
        imageSrc={baseImages.emptyFilter}
        title="اوه! اینجا که محصولی پیدا نشد!"
        description="به نظر میرسه محصولی که دنبالش هستی پیدا نشده. اگر مشکلی در مشاهده محصول خود دارید با پشتیبانی در تماس باشید."
        hasButton={true}
        linkHref={APP_ROUTES.LANDING}
        linkText="بازگشت به صفحه اصلی"
      />
    </div>
  );
}
