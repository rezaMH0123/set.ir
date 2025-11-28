const nameMap: Record<string, string> = {
  Package: "پکیج آموزشی",
  Video: "ویدیو",
  Textbook: "کتاب درسی",
  SummaryNotes: "خلاصه نکات",
  SolvedQuestions: "نمونه سوالات حل شده",
};

const getDisplayNameFromKey = (key: string) => {
  const titles: Record<string, string> = {
    categories: "مقطع تحصیلی",
    grades: "پایه",
    lessons: "درس",
    majors: "رشته",
    contenttypes: "نوع محتوا",
  };
  return titles[key.toLowerCase()] || key;
};

export const convertBackendDataToAccordionItems = (
  data: Record<string, { id: number; name: string }[]>
) => {
  return Object.entries(data).map(([key, items]) => ({
    title: getDisplayNameFromKey(key),
    content: items.map((item) => ({
      id: `${key}-${item.id}`,
      label: nameMap[item.name] || item.name,
    })),
  }));
};
