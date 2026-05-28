"use client";
import { StatCard } from "@/components/dashboard/StatCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, AlertTriangle, TrendingDown, RefreshCw } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  status: "in-stock" | "low" | "out-of-stock";
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Wildflower Honey",
    sku: "WFH-500ML",
    currentStock: 145,
    minStock: 20,
    maxStock: 200,
    reorderPoint: 50,
    status: "in-stock",
  },
  {
    id: "2",
    name: "Manuka Honey",
    sku: "MKH-500ML",
    currentStock: 12,
    minStock: 10,
    maxStock: 100,
    reorderPoint: 25,
    status: "low",
  },
  {
    id: "3",
    name: "Acacia Honey",
    sku: "ACH-500ML",
    currentStock: 87,
    minStock: 15,
    maxStock: 150,
    reorderPoint: 40,
    status: "in-stock",
  },
  {
    id: "4",
    name: "Lavender Honey",
    sku: "LVH-500ML",
    currentStock: 0,
    minStock: 10,
    maxStock: 100,
    reorderPoint: 20,
    status: "out-of-stock",
  },
  {
    id: "5",
    name: "Orange Blossom Honey",
    sku: "OBH-500ML",
    currentStock: 63,
    minStock: 20,
    maxStock: 120,
    reorderPoint: 45,
    status: "in-stock",
  },
  {
    id: "6",
    name: "Buckwheat Honey",
    sku: "BWH-500ML",
    currentStock: 18,
    minStock: 15,
    maxStock: 100,
    reorderPoint: 30,
    status: "low",
  },
];

export default function Inventory() {
  const stats = {
    totalProducts: mockInventory.length,
    lowStock: mockInventory.filter((i) => i.status === "low").length,
    outOfStock: mockInventory.filter((i) => i.status === "out-of-stock").length,
    totalValue: 8450,
  };

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.maxStock) * 100;
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "text-green-600";
      case "low":
        return "text-yellow-600";
      case "out-of-stock":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
            Inventory
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage product stock levels
          </p>
        </div>
        <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Update Stock
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStock}
          icon={AlertTriangle}
          subtitle="Below reorder point"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          icon={TrendingDown}
          subtitle="Needs immediate attention"
        />
        <StatCard
          title="Total Inventory Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          icon={Package}
        />
      </div>

      {/* Inventory Alerts */}
      {(stats.lowStock > 0 || stats.outOfStock > 0) && (
        <Card className="p-6 border-yellow-500/30 bg-yellow-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">
                Inventory Alert
              </h3>
              <p className="text-sm text-yellow-800">
                {stats.outOfStock > 0 && (
                  <span>
                    {stats.outOfStock} product
                    {stats.outOfStock > 1 ? "s are" : " is"} out of stock.
                  </span>
                )}{" "}
                {stats.lowStock > 0 && (
                  <span>
                    {stats.lowStock} product
                    {stats.lowStock > 1 ? "s are" : " is"} running low.
                  </span>
                )}{" "}
                Consider restocking to avoid order delays.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="border-[var(--honey-gold)]/20 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-[var(--dark-cocoa)]">
            Current Stock Levels
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600 border-b">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">SKU</th>
                <th className="py-4 px-6 font-medium">Current Stock</th>
                <th className="py-4 px-6 font-medium">Stock Level</th>
                <th className="py-4 px-6 font-medium">Reorder Point</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 rounded-lg">
                        <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)] rounded-lg">
                          {item.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {item.sku}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-sm font-medium ${getStockColor(item.status)}`}
                    >
                      {item.currentStock}
                    </span>
                    <span className="text-sm text-gray-500">
                      {" "}
                      / {item.maxStock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-32">
                      <Progress
                        value={getStockPercentage(item)}
                        className="h-2"
                        style={
                          {
                            "--progress-background":
                              item.status === "out-of-stock"
                                ? "#ef4444"
                                : item.status === "low"
                                  ? "#eab308"
                                  : "#22c55e",
                          } as React.CSSProperties
                        }
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {getStockPercentage(item).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {item.reorderPoint}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "in-stock"
                          ? "bg-green-100 text-green-800"
                          : item.status === "low"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status === "in-stock"
                        ? "In Stock"
                        : item.status === "low"
                          ? "Low Stock"
                          : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white"
                    >
                      Restock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
