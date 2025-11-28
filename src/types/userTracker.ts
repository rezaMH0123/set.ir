export type Entity = {
  id: string | number;
  name: string;
};

export type ProductData = {
  id: string;
  name: string;
  type: string;
  categories: Entity[];
  grades: Entity[];
  majors: Entity[];
  lessons: Entity[];
};
export type ViewedProducts = {
  id: string;
  name: string;
  viewedAt: string;
  categories: Entity[];
  majors: Entity[];
  lessons: Entity[];
  type: string;
};

export type UserViewData = {
  viewedProducts: ViewedProducts[];
  categoriesStats: { id: string; name: string; score: number }[];
  gradesStats: { id: string; name: string; score: number }[];
  majorsStats: { id: string; name: string; score: number }[];
};
