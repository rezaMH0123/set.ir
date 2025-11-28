import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Category } from "@/types/menu";
import APP_ROUTES from "@/constants/paths";
import { translateWordToPersion } from "@/utils/helpers/translateWords";
import { findPathByThreadId } from "@/components/MultiLevelMenu/helperFunction";

type FilterItem = {
  id: string;
  label: string;
};

type Item = { id: string; label: string };

export function convertTmpFiltersToCategoriesSlug(items: Item[]): string {
  const grade = items.find((i) => i.id.startsWith("grades-"));
  const lesson = items.find((i) => i.id.startsWith("lessons-"));
  const parts: string[] = [];
  if (grade) parts.push(grade.id);
  if (lesson) parts.push(lesson.id);
  return parts.join("/");
}

type HandleClickArgs = {
  threadId: string;
  categories: Category | Category[];
  goToCategory?: boolean;
  setSelectedFilters: (filters: FilterItem[]) => void;
  router: AppRouterInstance;
  resetCurrentCategory?: () => void;
  closeModal?: () => void;
};

export function handleCategoryClick({
  threadId,
  categories,
  goToCategory = false,
  setSelectedFilters,
  router,
  closeModal,
  resetCurrentCategory,
}: HandleClickArgs) {
  if (!threadId || !categories) return;

  const rootCategory: Category = Array.isArray(categories)
    ? {
        id: "root",
        name: "root",
        englishType: "root",
        threadId: "root",
        children: categories,
      }
    : categories;

  const path = findPathByThreadId(rootCategory, threadId);
  if (!path || path.length === 0) return;

  const params = new URLSearchParams();

  path.forEach((item) => {
    const key = item.englishType.toLowerCase();
    const value = item.id.toLowerCase();

    if (key === "categories") params.append("categories", value);
    if (key === "majors") params.set("majors", value);
    if (key === "grades" && !goToCategory) params.set("grades", value);
  });

  const filters: FilterItem[] = path.map((item) => ({
    id: `${item.englishType.toLowerCase()}-${item.id.toLowerCase()}`,
    label: translateWordToPersion(
      `${item.englishType.toLowerCase()}-${item.id.toLowerCase()}`
    ),
  }));

  setSelectedFilters(filters);

  const base = goToCategory ? APP_ROUTES.CATEGORIES : APP_ROUTES.FILTER;
  let url = "";

  if (goToCategory) {
    const pathSlug = convertTmpFiltersToCategoriesSlug(filters);
    url = pathSlug
      ? `${base}/${pathSlug}?${params.toString()}`
      : `${base}?${params.toString()}`;
  } else {
    url = `${base}?${params.toString()}`;
  }

  router.push(url);

  if (resetCurrentCategory) resetCurrentCategory();
  if (closeModal) closeModal();
}
