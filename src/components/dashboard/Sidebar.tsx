"use client";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Warehouse,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  X,
  List,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/categories", label: "Categories", icon: List },
  { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/customers", label: "Customers", icon: Users },
  { path: "/admin/payments", label: "Payments", icon: CreditCard },
  { path: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-white border-r border-[var(--honey-gold)]/20 transition-all duration-300",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--honey-gold)]/20">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <Hexagon className="w-8 h-8 text-[var(--honey-gold)] fill-[var(--honey-gold)]/20" />
              <span className="font-semibold text-[var(--dark-cocoa)]">
                Honey Admin
              </span>
            </Link>
          )}
          {collapsed && (
            <Hexagon className="w-8 h-8 text-[var(--honey-gold)] fill-[var(--honey-gold)]/20 mx-auto" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  active
                    ? "bg-[var(--honey-gold)]/10 text-[var(--honey-gold)] font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[var(--dark-cocoa)]",
                  collapsed && "justify-center",
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-[var(--honey-gold)]/20">
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-gray-700 hover:bg-gray-100 transition-colors",
              collapsed && "justify-center",
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar - Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 md:hidden">
          <SheetHeader className="p-4 border-b border-[var(--honey-gold)]/20">
            <SheetTitle>
              <Link href="/admin" className="flex items-center gap-2">
                <Hexagon className="w-8 h-8 text-[var(--honey-gold)] fill-[var(--honey-gold)]/20" />
                <span className="font-semibold text-[var(--dark-cocoa)]">
                  Honey Admin
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="py-6 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setCollapsed(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    active
                      ? "bg-[var(--honey-gold)]/10 text-[var(--honey-gold)] font-medium"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[var(--dark-cocoa)]",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
