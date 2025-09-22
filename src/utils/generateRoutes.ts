import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItem: ISidebarItem[]) => {
  return sidebarItem.flatMap((section) =>
    section.items.map((items) => ({
      path: items.url,
      Component: items.component,
    }))
  );
};
