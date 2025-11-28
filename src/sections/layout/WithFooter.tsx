"use client";

import { useFooter } from "@/context/FooterContext";
import Footer from "@/sections/layout/Footer";

export default function WithFooter() {
  const { showFooter } = useFooter();
  return showFooter ? <Footer /> : null;
}
