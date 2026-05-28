"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 65, customers: 45 },
  { month: "Feb", revenue: 5100, orders: 78, customers: 58 },
  { month: "Mar", revenue: 4800, orders: 72, customers: 52 },
  { month: "Apr", revenue: 6300, orders: 95, customers: 71 },
  { month: "May", revenue: 7200, orders: 108, customers: 84 },
  { month: "Jun", revenue: 8100, orders: 120, customers: 92 },
];

const topProducts = [
  { name: "Wildflower Honey", value: 2900, sales: 145 },
  { name: "Manuka Honey", value: 4900, sales: 98 },
  { name: "Acacia Honey", value: 2175, sales: 87 },
  { name: "Lavender Honey", value: 1900, sales: 76 },
  { name: "Orange Blossom", value: 1890, sales: 71 },
];

const customerGrowth = [
  { month: "Jan", new: 45, returning: 120 },
  { month: "Feb", new: 58, returning: 145 },
  { month: "Mar", new: 52, returning: 167 },
  { month: "Apr", new: 71, returning: 189 },
  { month: "May", new: 84, returning: 215 },
  { month: "Jun", new: 92, returning: 245 },
];

const salesByCategory = [
  { name: "Raw Honey", value: 45 },
  { name: "Premium Honey", value: 30 },
  { name: "Flavored Honey", value: 15 },
  { name: "Gift Sets", value: 10 },
];

const COLORS = ["#F4A300", "#C46B00", "#FFB703", "#FFF8E6"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
          Analytics
        </h1>
        <p className="text-gray-600 mt-1">
          Business insights and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$35,700"
          icon={DollarSign}
          trend={{ value: 18.5, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value={538}
          icon={ShoppingCart}
          trend={{ value: 12.3, isPositive: true }}
        />
        <StatCard
          title="Total Customers"
          value={402}
          icon={Users}
          trend={{ value: 8.7, isPositive: true }}
        />
        <StatCard
          title="Avg Order Value"
          value="$66.36"
          icon={TrendingUp}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      {/* Revenue & Orders Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
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

        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Orders Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#F4A300"
                strokeWidth={2}
                dot={{ fill: "#F4A300", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products & Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Top Selling Products
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#888"
                fontSize={11}
                angle={-15}
                textAnchor="end"
              />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#F4A300" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent ?? 0 * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Customer Growth */}
      <Card className="p-6 border-[var(--honey-gold)]/20">
        <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
          Customer Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customerGrowth}>
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
            <Legend />
            <Bar
              dataKey="new"
              fill="#F4A300"
              radius={[8, 8, 0, 0]}
              name="New Customers"
            />
            <Bar
              dataKey="returning"
              fill="#C46B00"
              radius={[8, 8, 0, 0]}
              name="Returning"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Best Performing Month
          </h3>
          <div className="text-3xl font-semibold text-[var(--honey-gold)]">
            June 2026
          </div>
          <p className="text-gray-600 mt-2">120 orders | $8,100 revenue</p>
        </Card>

        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Top Product
          </h3>
          <div className="text-3xl font-semibold text-[var(--honey-gold)]">
            Manuka Honey
          </div>
          <p className="text-gray-600 mt-2">$4,900 in sales | 98 units sold</p>
        </Card>

        <Card className="p-6 border-[var(--honey-gold)]/20">
          <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
            Customer Retention
          </h3>
          <div className="text-3xl font-semibold text-[var(--honey-gold)]">
            72.8%
          </div>
          <p className="text-gray-600 mt-2">
            Customers who made repeat purchases
          </p>
        </Card>
      </div>
    </div>
  );
}
