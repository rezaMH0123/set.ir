import baseImages from "@/assets/images";
import EmptyContentDLayout from "@/components/EmptyContentDLayout";

export default function PackagesPage() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <EmptyContentDLayout
        className="flex flex-col items-center "
        srcImg={baseImages.emptyContentImage}
        title="هیج محتوای آموزشی ای ندارید"
        textButton="+ افزودن محصول به لیست"
      />
    </div>
  );
}
