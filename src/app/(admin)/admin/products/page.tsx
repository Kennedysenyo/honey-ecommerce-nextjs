"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
} from "lucide-react";

import Link from "next/link";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  rating: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wildflower Honey",
    type: "Raw Honey",
    price: 24.99,
    stock: 145,
    status: "active",
    rating: 4.8,
    image: "",
  },
  {
    id: "2",
    name: "Manuka Honey",
    type: "Premium Honey",
    price: 49.99,
    stock: 12,
    status: "active",
    rating: 4.9,
    image: "",
  },
  {
    id: "3",
    name: "Acacia Honey",
    type: "Raw Honey",
    price: 22.5,
    stock: 87,
    status: "active",
    rating: 4.7,
    image: "",
  },
  {
    id: "4",
    name: "Lavender Honey",
    type: "Flavored Honey",
    price: 28.0,
    stock: 0,
    status: "inactive",
    rating: 4.6,
    image: "",
  },
  {
    id: "5",
    name: "Orange Blossom Honey",
    type: "Raw Honey",
    price: 26.5,
    stock: 63,
    status: "active",
    rating: 4.8,
    image: "",
  },
  {
    id: "6",
    name: "Buckwheat Honey",
    type: "Raw Honey",
    price: 29.99,
    stock: 45,
    status: "active",
    rating: 4.5,
    image: "",
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    const matchesType = typeFilter === "all" || product.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
            Products
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your honey products catalog
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters Section */}
      <Card className="p-4 border-[var(--honey-gold)]/20">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(e) => setStatusFilter(e ?? "all")}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select
            value={typeFilter}
            onValueChange={(e) => setTypeFilter(e ?? "all")}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Raw Honey">Raw Honey</SelectItem>
              <SelectItem value="Premium Honey">Premium Honey</SelectItem>
              <SelectItem value="Flavored Honey">Flavored Honey</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="border-[var(--honey-gold)]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600 border-b">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">Type</th>
                <th className="py-4 px-6 font-medium">Price</th>
                <th className="py-4 px-6 font-medium">Stock</th>
                <th className="py-4 px-6 font-medium">Rating</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 rounded-lg">
                        <AvatarImage src={product.image} alt={product.name} />
                        <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)] rounded-lg">
                          {product.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {product.type}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          product.stock < 20 ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {product.stock}
                      </span>
                      {product.stock < 20 && product.stock > 0 && (
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          Low
                        </span>
                      )}
                      {product.stock === 0 && (
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          Out
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--honey-gold)] text-[var(--honey-gold)]" />
                      <span className="text-sm font-medium text-gray-900">
                        {product.rating}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredProducts.length}</span> of{" "}
            <span className="font-medium">{mockProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[var(--honey-gold)]/10 text-[var(--honey-gold)]"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
