import { AdminNavHeader } from "@/components/admin-nav-header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <AdminNavHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}
