import React from "react";
import { FilterProvider } from "@/context/FilterContext";
import { FooterProvider } from "@/context/FooterContext";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FooterProvider>
      <FilterProvider>{children}</FilterProvider>
    </FooterProvider>
  );
}
