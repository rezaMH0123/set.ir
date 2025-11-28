import baseImages from "@/assets/images";
import EmptyState from "@/components/EmptyState";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <div dir="rtl" className="h-screen w-full flex justify-center items-center">
      <EmptyState
        imageSrc={baseImages.notFound}
        title="وای! اینطور که به نظر میرسه گم شدیم!"
        description="بهتره برگردیم صفحه نخست تا از اونجا دوباره راهمون رو پیدا کنیم"
        linkHref="/"
        linkText="بازگشت به خانه"
        Icon={House}
        hasButton={true}
      />
    </div>
  );
}
