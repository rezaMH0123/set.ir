export type NavbarMenu = {
  id: string;
  name: string;
  persianType: string;
  englishType: string;
  threadId: string;
  children: NavbarMenu[] | null;
};

export type Category = {
  id: string;
  name: string;
  persianType?: string;
  englishType: string;
  threadId: string;
  majors?: string[];
  children?: Category[] | null;
};
