import { UserViewData, Entity, ViewedProducts } from "@/types/userTracker";

interface TopViewedData {
  topProducts: ViewedProducts[];
  topStats: Entity[];
}

export function getTopViewedData(userId?: string): TopViewedData {
  const storageKey = userId ? `userViewData_${userId}` : `userViewData_guest`;

  let storedData: UserViewData = {
    viewedProducts: [],
    categoriesStats: [],
    gradesStats: [],
    majorsStats: [],
  };

  try {
    const localData = localStorage.getItem(storageKey);
    if (localData) {
      storedData = { ...storedData, ...JSON.parse(localData) };
    }
  } catch (e) {
    console.error("خطا در خواندن localStorage:", e);
    return { topProducts: [], topStats: [] };
  }

  const productsWithScore = storedData.viewedProducts.map((p) => {
    const categoryScore = p.categories.reduce((sum, c) => {
      const stat = storedData.categoriesStats.find(
        (s) => s.id === c.id.toString()
      );
      return sum + (stat?.score || 0);
    }, 0);

    const majorScore = p.majors.reduce((sum, m) => {
      const stat = storedData.majorsStats.find((s) => s.id === m.id.toString());
      return sum + (stat?.score || 0);
    }, 0);

    const totalScore = categoryScore + majorScore;
    return { ...p, totalScore };
  });

  // ۱۰ محصول برتر
  const topProducts: ViewedProducts[] = productsWithScore
    .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
    .slice(0, 10)
    .map((p) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { totalScore: _omit, ...rest } = p;
      return rest;
    });

  const combinedStats: { id: string; name: string; score: number }[] = [
    ...storedData.categoriesStats,
    ...storedData.gradesStats,
    ...storedData.majorsStats,
  ];

  const topStats: Entity[] = combinedStats
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item) => ({ id: item.id, name: item.name }));

  return { topProducts, topStats };
}

// TODO: this is how to use the function, anywhere use that you have to gve the userId from context

// نحوه استفاده از فانکشن بالا به شرح زیر است و ضمنا باید برای استفاده یوز آیدی را از کانتکس یوزر بهش پاس بدی

// const { topProducts, topStats } = getTopViewedData(user?.id);

// console.log("۱۰ محصول برتر:", topProducts);
// console.log("۱۰ مورد برتر از مجموع stats:", topStats);
