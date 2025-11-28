import { getFiltersMenuServerSide } from "@/core/apiCalls/menu";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ catIds: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { catIds } = await params;
  const search = await searchParams;

  const filters = await getFiltersMenuServerSide();
  console.log("Filters Data:", filters);

  if (catIds.length !== 1 && catIds.length !== 2) {
    return notFound();
  }

  const categories = Array.isArray(search.categories)
    ? search.categories
    : search.categories
      ? [search.categories]
      : [];

  const majors = Array.isArray(search.majors)
    ? search.majors
    : search.majors
      ? [search.majors]
      : [];

  if (catIds.length === 1) {
    const [grade] = catIds;
    return (
      <div>
        <h1>Categories: {categories.join(", ")}</h1>
        <h1>Majors: {majors.join(", ")}</h1>
        <h1>Grade: {grade}</h1>
      </div>
    );
  }

  if (catIds.length === 2) {
    const [grade, lesson] = catIds;
    return (
      <div>
        <h1>Categories: {categories.join(", ")}</h1>
        <h1>Majors: {majors.join(", ")}</h1>
        <h1>Grade: {grade}</h1>
        <h1>Lesson: {lesson}</h1>
      </div>
    );
  }
}
