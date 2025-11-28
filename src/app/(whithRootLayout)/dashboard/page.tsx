"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useIsMobile from "@/utils/hooks/useIsMobile";
import APP_ROUTES from "@/constants/paths";

export default function DashboardPage() {
  const { isMobile, ready } = useIsMobile();

  const router = useRouter();

  useEffect(() => {
    if (ready && !isMobile) {
      router.replace(APP_ROUTES.MY_CONTENT);
    }
  }, [isMobile, ready, router]);

  return null;
}
