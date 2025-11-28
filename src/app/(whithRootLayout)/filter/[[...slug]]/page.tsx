import { Suspense } from "react";
import FilterContent from "@/sections/filter/MainPage";
import { getFiltersMenuServerSide } from "@/core/apiCalls/menu";
import { convertBackendDataToAccordionItems } from "@/utils/helpers/filtersFunc";

export default async function FilterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slug = resolvedParams.slug || [];

  let gradesValue: string | null = null;
  let lessonsValue: string | null = null;

  slug.forEach((part) => {
    if (part.startsWith("grades-")) gradesValue = part.replace("grades-", "");
    if (part.startsWith("lessons-"))
      lessonsValue = part.replace("lessons-", "");
  });

  if (resolvedSearchParams.grades)
    gradesValue = resolvedSearchParams.grades.toString();
  if (resolvedSearchParams.lessons)
    lessonsValue = resolvedSearchParams.lessons.toString();

  const FilterMenuRes = await getFiltersMenuServerSide();
  const rawAccordionData = convertBackendDataToAccordionItems(FilterMenuRes);

  const accordionData = rawAccordionData.map((item) => ({
    ...item,
    content: item.content.map((c) => ({
      ...c,
      products: [],
    })),
  }));

  return (
    <Suspense>
      <FilterContent
        accordionData={accordionData}
        initialGrades={gradesValue ?? undefined}
        initialLessons={lessonsValue ?? undefined}
      />
    </Suspense>
  );
}
