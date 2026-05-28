"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Eye,
  Ban,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
  joinDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    totalOrders: 12,
    totalSpent: 1845.5,
    lastOrder: "2026-05-28",
    status: "active",
    joinDate: "2025-03-15",
  },
  {
    id: "CUST-002",
    name: "Michael Chen",
    email: "mchen@email.com",
    phone: "+1 (555) 234-5678",
    totalOrders: 8,
    totalSpent: 967.0,
    lastOrder: "2026-05-27",
    status: "active",
    joinDate: "2025-06-22",
  },
  {
    id: "CUST-003",
    name: "Emily Davis",
    email: "emily.d@email.com",
    phone: "+1 (555) 345-6789",
    totalOrders: 15,
    totalSpent: 2340.75,
    lastOrder: "2026-05-26",
    status: "active",
    joinDate: "2025-01-10",
  },
  {
    id: "CUST-004",
    name: "James Wilson",
    email: "jwilson@email.com",
    phone: "+1 (555) 456-7890",
    totalOrders: 3,
    totalSpent: 234.5,
    lastOrder: "2026-04-15",
    status: "inactive",
    joinDate: "2025-11-05",
  },
  {
    id: "CUST-005",
    name: "Lisa Anderson",
    email: "landerson@email.com",
    phone: "+1 (555) 567-8901",
    totalOrders: 18,
    totalSpent: 3125.0,
    lastOrder: "2026-05-28",
    status: "active",
    joinDate: "2024-08-20",
  },
  {
    id: "CUST-006",
    name: "Robert Taylor",
    email: "rtaylor@email.com",
    phone: "+1 (555) 678-9012",
    totalOrders: 6,
    totalSpent: 678.9,
    lastOrder: "2026-05-20",
    status: "active",
    joinDate: "2025-07-14",
  },
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const stats = {
    total: mockCustomers.length,
    active: mockCustomers.filter((c) => c.status === "active").length,
    totalRevenue: mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue:
      mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) /
      mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
          Customers
        </h1>
        <p className="text-gray-600 mt-1">Manage your customer relationships</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Total Customers</div>
          <div className="text-2xl font-semibold text-[var(--dark-cocoa)]">
            {stats.total}
          </div>
        </Card>
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Active Customers</div>
          <div className="text-2xl font-semibold text-green-600">
            {stats.active}
          </div>
        </Card>
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-2xl font-semibold text-[var(--dark-cocoa)]">
            ${stats.totalRevenue.toFixed(2)}
          </div>
        </Card>
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Avg Order Value</div>
          <div className="text-2xl font-semibold text-[var(--dark-cocoa)]">
            ${stats.avgOrderValue.toFixed(2)}
          </div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 border-[var(--honey-gold)]/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="border-[var(--honey-gold)]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600 border-b">
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Contact</th>
                <th className="py-4 px-6 font-medium">Total Orders</th>
                <th className="py-4 px-6 font-medium">Total Spent</th>
                <th className="py-4 px-6 font-medium">Last Order</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)]">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {customer.totalOrders}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {customer.lastOrder}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="w-4 h-4 mr-2" />
                          Deactivate
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
            <span className="font-medium">{filteredCustomers.length}</span> of{" "}
            <span className="font-medium">{mockCustomers.length}</span>{" "}
            customers
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
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Customer Details Modal */}
      <Dialog
        open={!!selectedCustomer}
        onOpenChange={() => setSelectedCustomer(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              View detailed customer information
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)] text-xl">
                    {selectedCustomer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedCustomer.id}</p>
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCustomer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCustomer.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Join Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCustomer.joinDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Order</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCustomer.lastOrder}
                  </p>
                </div>
              </div>

              {/* Order Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-[var(--honey-gold)]/20">
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-semibold text-[var(--dark-cocoa)]">
                    {selectedCustomer.totalOrders}
                  </p>
                </Card>
                <Card className="p-4 border-[var(--honey-gold)]/20">
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-2xl font-semibold text-[var(--dark-cocoa)]">
                    ${selectedCustomer.totalSpent.toFixed(2)}
                  </p>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
