import { DollarSign, TrendingUp, CreditCard, Smartphone } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { Card } from "../../components/ui/card";
import { StatusBadge } from "../components/StatusBadge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

interface Payment {
  id: string;
  customer: string;
  orderId: string;
  amount: number;
  method: "Paystack" | "Mobile Money";
  status: "success" | "pending" | "failed";
  date: string;
  time: string;
}

const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    customer: "Sarah Johnson",
    orderId: "ORD-001",
    amount: 145.0,
    method: "Paystack",
    status: "success",
    date: "2026-05-28",
    time: "10:30 AM",
  },
  {
    id: "PAY-002",
    customer: "Michael Chen",
    orderId: "ORD-002",
    amount: 89.5,
    method: "Mobile Money",
    status: "success",
    date: "2026-05-28",
    time: "09:15 AM",
  },
  {
    id: "PAY-003",
    customer: "Emily Davis",
    orderId: "ORD-003",
    amount: 235.0,
    method: "Paystack",
    status: "success",
    date: "2026-05-27",
    time: "03:45 PM",
  },
  {
    id: "PAY-004",
    customer: "James Wilson",
    orderId: "ORD-004",
    amount: 67.0,
    method: "Mobile Money",
    status: "pending",
    date: "2026-05-27",
    time: "02:20 PM",
  },
  {
    id: "PAY-005",
    customer: "Lisa Anderson",
    orderId: "ORD-005",
    amount: 178.5,
    method: "Paystack",
    status: "success",
    date: "2026-05-26",
    time: "11:10 AM",
  },
  {
    id: "PAY-006",
    customer: "Anna Martinez",
    orderId: "ORD-007",
    amount: 134.0,
    method: "Mobile Money",
    status: "failed",
    date: "2026-05-24",
    time: "01:55 PM",
  },
];

export function Payments() {
  const stats = {
    totalRevenue: mockPayments
      .filter((p) => p.status === "success")
      .reduce((sum, p) => sum + p.amount, 0),
    pendingPayments: mockPayments.filter((p) => p.status === "pending").length,
    successfulPayments: mockPayments.filter((p) => p.status === "success")
      .length,
    failedPayments: mockPayments.filter((p) => p.status === "failed").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
          Payments
        </h1>
        <p className="text-gray-600 mt-1">
          Track and manage payment transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
        />
        <StatCard
          title="Successful Payments"
          value={stats.successfulPayments}
          icon={TrendingUp}
          subtitle="This month"
        />
        <StatCard
          title="Pending Payments"
          value={stats.pendingPayments}
          icon={CreditCard}
          subtitle="Awaiting confirmation"
        />
        <StatCard
          title="Failed Payments"
          value={stats.failedPayments}
          icon={CreditCard}
          subtitle="Requires attention"
        />
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-[var(--honey-gold)]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--dark-cocoa)]">Paystack</h3>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Transactions</span>
              <span className="text-sm font-medium text-gray-900">
                {mockPayments.filter((p) => p.method === "Paystack").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="text-sm font-medium text-gray-900">
                $
                {mockPayments
                  .filter(
                    (p) => p.method === "Paystack" && p.status === "success",
                  )
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="pt-3 border-t">
              <StatusBadge status="active" label="Connected" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-[var(--honey-gold)]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--dark-cocoa)]">
              Mobile Money
            </h3>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Transactions</span>
              <span className="text-sm font-medium text-gray-900">
                {mockPayments.filter((p) => p.method === "Mobile Money").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="text-sm font-medium text-gray-900">
                $
                {mockPayments
                  .filter(
                    (p) =>
                      p.method === "Mobile Money" && p.status === "success",
                  )
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="pt-3 border-t">
              <StatusBadge status="active" label="Connected" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-[var(--honey-gold)]/20 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-[var(--dark-cocoa)]">
            Recent Transactions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600 border-b">
                <th className="py-4 px-6 font-medium">Payment ID</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Amount</th>
                <th className="py-4 px-6 font-medium">Method</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">
                      {payment.id}
                    </div>
                    <div className="text-xs text-gray-500">{payment.time}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[var(--honey-gold)]/20 text-[var(--honey-gold)] text-xs">
                          {payment.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">
                        {payment.customer}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {payment.orderId}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {payment.method === "Paystack" ? (
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Smartphone className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm text-gray-700">
                        {payment.method}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {payment.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{mockPayments.length}</span>{" "}
            transactions
          </p>
        </div>
      </Card>
    </div>
  );
}
