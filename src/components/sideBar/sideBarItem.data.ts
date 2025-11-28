import { baseIcons } from "@/assets/icons";
import APP_ROUTES from "@/constants/paths";

type MenuItem = {
  name: string;
  path: string;
  icon?: string;
  subItems?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    name: "محتوای من",
    path: APP_ROUTES.MY_CONTENT,
    icon: baseIcons.myContentIcon,
    // subItems: [
    //   { name: "ویدیو", path: "/dashboard/my-content/videos" },
    //   { name: "خلاصه نکات", path: "/dashboard/my-content/notes" },
    //   { name: "پکیج", path: "/dashboard/my-content/packages" },
    // ],
  },
  {
    name: "سفارش‌ها",
    path: APP_ROUTES.ORDERS,
    icon: baseIcons.ordersIcon,
  },
  {
    name: "علاقه‌مندی‌ها",
    path: APP_ROUTES.FAVORITES,
    icon: baseIcons.likeIcon,
  },
  {
    name: "پشتیبانی",
    path: APP_ROUTES.SUPPORT,
    icon: baseIcons.dashboardSupportIcon,
  },
];
