import type { Metadata } from "next";
import "./../globals.css";

export const metadata: Metadata = {
  title: "پیگیری پرداخت",
  description: "set.ir",
};

export default function PaymentMoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`antialiased`}>{children}</div>;
}
