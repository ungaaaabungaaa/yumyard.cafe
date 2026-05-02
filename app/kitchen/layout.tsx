import { KitchenNavHeader } from "@/components/kitchen-nav-header";

export default function KitchenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <KitchenNavHeader />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
