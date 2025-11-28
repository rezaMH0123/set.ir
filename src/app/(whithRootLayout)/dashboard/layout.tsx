import BaseDashbaord from "@/sections/dashboard/BaseDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[458px] flex mt-9 xl:px-[136px] lg:px-[78px] md:px-[30px] mb-44">
      <BaseDashbaord>{children}</BaseDashbaord>
    </div>
  );
}
