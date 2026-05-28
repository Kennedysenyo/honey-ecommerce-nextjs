import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { StatusBadge } from "../components/StatusBadge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "delivered"
  | "cancelled";

interface Order {
  id: string;
  customer: string;
  email: string;
  products: number;
  amount: number;
  paymentStatus: OrderStatus;
  deliveryStatus: OrderStatus;
  date: string;
  time: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    products: 3,
    amount: 145.0,
    paymentStatus: "paid",
    deliveryStatus: "processing",
    date: "2026-05-28",
    time: "10:30 AM",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    email: "mchen@email.com",
    products: 2,
    amount: 89.5,
    paymentStatus: "paid",
    deliveryStatus: "delivered",
    date: "2026-05-28",
    time: "09:15 AM",
  },
  {
    id: "ORD-003",
    customer: "Emily Davis",
    email: "emily.d@email.com",
    products: 5,
    amount: 235.0,
    paymentStatus: "paid",
    deliveryStatus: "delivered",
    date: "2026-05-27",
    time: "03:45 PM",
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    email: "jwilson@email.com",
    products: 1,
    amount: 67.0,
    paymentStatus: "pending",
    deliveryStatus: "pending",
    date: "2026-05-27",
    time: "02:20 PM",
  },
  {
    id: "ORD-005",
    customer: "Lisa Anderson",
    email: "landerson@email.com",
    products: 4,
    amount: 178.5,
    paymentStatus: "paid",
    deliveryStatus: "processing",
    date: "2026-05-26",
    time: "11:10 AM",
  },
  {
    id: "ORD-006",
    customer: "Robert Taylor",
    email: "rtaylor@email.com",
    products: 2,
    amount: 99.8,
    paymentStatus: "paid",
    deliveryStatus: "delivered",
    date: "2026-05-25",
    time: "04:30 PM",
  },
  {
    id: "ORD-007",
    customer: "Anna Martinez",
    email: "anna.m@email.com",
    products: 3,
    amount: 134.0,
    paymentStatus: "cancelled",
    deliveryStatus: "cancelled",
    date: "2026-05-24",
    time: "01:55 PM",
  },
];

export function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [deliveryFilter, setDeliveryFilter] = useState<string>("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;
    const matchesDelivery =
      deliveryFilter === "all" || order.deliveryStatus === deliveryFilter;
    return matchesSearch && matchesPayment && matchesDelivery;
  });

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.paymentStatus === "pending").length,
    processing: mockOrders.filter((o) => o.deliveryStatus === "processing")
      .length,
    delivered: mockOrders.filter((o) => o.deliveryStatus === "delivered")
      .length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
            Orders
          </h1>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Total Orders</div>
          <div className="text-2xl font-semibold text-[var(--dark-cocoa)]">
            {stats.total}
          </div>
        </Card>
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Pending Payment</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {stats.pending}
          </div>
        </Card>
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Processing</div>
          <div className="text-2xl font-semibold text-blue-600">
            {stats.processing}
          </div>
        </Card>
        <Card className="p-4 border-[var(--honey-gold)]/20">
          <div className="text-sm text-gray-600 mb-1">Delivered</div>
          <div className="text-2xl font-semibold text-green-600">
            {stats.delivered}
          </div>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="p-4 border-[var(--honey-gold)]/20">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Payment Status Filter */}
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {/* Delivery Status Filter */}
          <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Delivery Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deliveries</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="border-[var(--honey-gold)]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600 border-b">
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Products</th>
                <th className="py-4 px-6 font-medium">Amount</th>
                <th className="py-4 px-6 font-medium">Payment</th>
                <th className="py-4 px-6 font-medium">Delivery</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className="text-xs text-gray-500">{order.time}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)] text-sm">
                          {order.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {order.products} items
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={order.paymentStatus} />
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={order.deliveryStatus} />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Update Status
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
            Showing <span className="font-medium">{filteredOrders.length}</span>{" "}
            of <span className="font-medium">{mockOrders.length}</span> orders
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
