import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin",
    items: [
      {
        title: "analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Project Structure",
        url: "#",
        component: Analytics,
      },
    ],
  },
];
