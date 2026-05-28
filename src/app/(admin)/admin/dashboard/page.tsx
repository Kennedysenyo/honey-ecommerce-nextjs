"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6300 },
  { month: "May", revenue: 7200 },
  { month: "Jun", revenue: 8100 },
];

const salesData = [
  { month: "Jan", sales: 65 },
  { month: "Feb", sales: 78 },
  { month: "Mar", sales: 72 },
  { month: "Apr", sales: 95 },
  { month: "May", sales: 108 },
  { month: "Jun", sales: 120 },
];

const topProducts = [
  { name: "Wildflower Honey", sales: 145, revenue: 2900 },
  { name: "Manuka Honey", sales: 98, revenue: 4900 },
  { name: "Acacia Honey", sales: 87, revenue: 2175 },
  { name: "Lavender Honey", sales: 76, revenue: 1900 },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    amount: 145.0,
    status: "paid" as const,
    date: "2026-05-28",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    amount: 89.5,
    status: "processing" as const,
    date: "2026-05-28",
  },
  {
    id: "ORD-003",
    customer: "Emily Davis",
    amount: 235.0,
    status: "paid" as const,
    date: "2026-05-27",
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    amount: 67.0,
    status: "pending" as const,
    date: "2026-05-27",
  },
  {
    id: "ORD-005",
    customer: "Lisa Anderson",
    amount: 178.5,
    status: "delivered" as const,
    date: "2026-05-26",
  },
];

const recentActivity = [
  { type: "order", message: "New order #ORD-001 received", time: "2 min ago" },
  {
    type: "product",
    message: "Wildflower Honey stock updated",
    time: "15 min ago",
  },
  {
    type: "payment",
    message: "Payment of $145.00 confirmed",
    time: "1 hour ago",
  },
  { type: "alert", message: "Manuka Honey running low", time: "2 hours ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={324}
          icon={ShoppingCart}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Revenue"
          value="$8,145"
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Pending Orders"
          value={18}
          icon={Package}
          trend={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Total Customers"
          value={245}
          icon={Users}
          subtitle="Active users"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F4A300" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F4A300" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#F4A300"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales Chart */}
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Monthly Sales
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="#F4A300" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row: Recent Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 p-6 border-[var(--honey-gold)]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--dark-cocoa)]">
              Recent Orders
            </h3>
            <a
              href="/admin/orders"
              className="text-sm text-[var(--honey-gold)] hover:underline"
            >
              View all
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="py-4 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)] text-xs">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 text-sm text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Recent Activity
          </h3>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.type === "alert"
                      ? "bg-red-500"
                      : "bg-[var(--honey-gold)]"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="p-6 border-[var(--honey-gold)]/20">
        <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
          Top Selling Products
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#F4A300"
              strokeWidth={2}
              dot={{ fill: "#F4A300", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Low Stock Alert */}
      <Card className="p-6 border-yellow-500/30 bg-yellow-50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">
              Low Stock Alert
            </h3>
            <p className="text-sm text-yellow-800">
              3 products are running low on stock. Review your inventory to
              avoid stockouts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
