// context/FooterContext.tsx
"use client";

import APP_ROUTES from "@/constants/paths";
import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";

const FooterContext = createContext({ showFooter: true });

export const useFooter = () => useContext(FooterContext);

export function FooterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter =
    !pathname.startsWith(APP_ROUTES.FILTER) &&
    !pathname.startsWith(APP_ROUTES.DASHBOARD) &&
    !pathname.startsWith(APP_ROUTES.BASKET);

  return (
    <FooterContext.Provider value={{ showFooter }}>
      {children}
    </FooterContext.Provider>
  );
}
