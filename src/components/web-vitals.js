"use client";

import { useReportWebVitals } from "next/web-vitals";

const logWebVitals = () => {
  // اینجا می‌تونید داده‌ها رو به آنالیتیکس یا سرور بفرستید
};

export function WebVitals() {
  useReportWebVitals(logWebVitals);
  return null;
}
