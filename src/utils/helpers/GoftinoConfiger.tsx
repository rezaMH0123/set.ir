"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import APP_ROUTES from "@/constants/paths";
import useIsMobile from "../hooks/useIsMobile";

const GoftinoConfiger = () => {
  const { isLoggedIn } = useUser();
  const [goftinoIsLoaded, setGoftinoIsLoaded] = useState(0);

  const pathname = usePathname();

  const { isMobile } = useIsMobile();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const el = document.getElementById("goftino_w");
      if (el) {
        setGoftinoIsLoaded((g) => g + 1);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById("goftino_w");

    if (!isLoggedIn && el) {
      if (isMobile) {
        el.style.bottom = pathname.includes(APP_ROUTES.PRODUCT_DETIALS)
          ? "150px"
          : "75px";
      } else {
        el.style.bottom = "30px";
      }
    }

    if (isLoggedIn && el) {
      el.classList.add("hidden");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goftinoIsLoaded, isLoggedIn, pathname]);

  return <></>;
};

export default GoftinoConfiger;
