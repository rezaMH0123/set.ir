import { Category } from "@/types/menu";

export const findPathByThreadId = (
  category: Category,
  targetThreadId: string
): { id: string; englishType: string }[] | null => {
  if (category.threadId === targetThreadId) {
    return [{ id: category.id, englishType: category.englishType }];
  }

  if (category.children) {
    for (const child of category.children) {
      const childPath = findPathByThreadId(child, targetThreadId);
      if (childPath) {
        return [
          { id: category.id, englishType: category.englishType },
          ...childPath,
        ];
      }
    }
  }

  return null;
};

export const hasSubSubChildren = (child: Category): boolean => {
  return (
    child.children?.some(
      (subChild) => subChild.children && subChild.children.length > 0
    ) ?? false
  );
};

export function findAllCategories(
  node: Category,
  cats: string[] = []
): string[] {
  if (node.englishType?.toLowerCase() === "categories") {
    cats.push(node.id);
  }
  node.children?.forEach((child) => findAllCategories(child, cats));
  return cats;
}

export function findAllMajors(node: Category, majors: string[] = []): string[] {
  if (node.englishType?.toLowerCase() === "majors") {
    majors.push(node.id);
  }
  node.children?.forEach((child) => findAllMajors(child, majors));
  return majors;
}
