import { AdminNavbar } from "@/components/dashboard/Navbar";
import { AdminSidebar } from "@/components/dashboard/Sidebar";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
