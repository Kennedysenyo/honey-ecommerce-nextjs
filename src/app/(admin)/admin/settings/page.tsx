"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, CreditCard, Truck, Bell, Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your store configuration</p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="bg-white border border-[var(--honey-gold)]/20">
          <TabsTrigger value="store" className="gap-2">
            <Store className="w-4 h-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="shipping" className="gap-2">
            <Truck className="w-4 h-4" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <Card className="p-6 border-[var(--honey-gold)]/20">
            <h3 className="font-semibold text-[var(--dark-cocoa)] mb-6">
              Store Information
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="Honey Haven" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    defaultValue="info@honeyhaven.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input id="storePhone" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeCurrency">Currency</Label>
                  <Input id="storeCurrency" defaultValue="USD ($)" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input
                  id="storeAddress"
                  defaultValue="123 Honey Lane, Sweet City, SC 12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <textarea
                  id="storeDescription"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--honey-gold)]"
                  rows={4}
                  defaultValue="Premium organic honey from local beekeepers. Pure, natural, and delicious."
                />
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <div className="space-y-6">
            {/* Paystack */}
            <Card className="p-6 border-[var(--honey-gold)]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--dark-cocoa)]">
                      Paystack
                    </h3>
                    <p className="text-sm text-gray-600">
                      Credit card payment processor
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paystackPublicKey">Public Key</Label>
                  <Input
                    id="paystackPublicKey"
                    type="password"
                    defaultValue="pk_test_xxxxxxxxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paystackSecretKey">Secret Key</Label>
                  <Input
                    id="paystackSecretKey"
                    type="password"
                    defaultValue="sk_test_xxxxxxxxxxxx"
                  />
                </div>
              </div>
            </Card>

            {/* Mobile Money */}
            <Card className="p-6 border-[var(--honey-gold)]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--dark-cocoa)]">
                      Mobile Money
                    </h3>
                    <p className="text-sm text-gray-600">
                      Mobile wallet payments
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobileMoneyProvider">Provider</Label>
                  <Input
                    id="mobileMoneyProvider"
                    defaultValue="MTN Mobile Money"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileMoneyApiKey">API Key</Label>
                  <Input
                    id="mobileMoneyApiKey"
                    type="password"
                    defaultValue="mm_xxxxxxxxxxxx"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Payment Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card className="p-6 border-[var(--honey-gold)]/20">
            <h3 className="font-semibold text-[var(--dark-cocoa)] mb-6">
              Shipping Configuration
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="standardShipping">
                    Standard Shipping Fee
                  </Label>
                  <Input
                    id="standardShipping"
                    type="number"
                    defaultValue="5.99"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expressShipping">Express Shipping Fee</Label>
                  <Input
                    id="expressShipping"
                    type="number"
                    defaultValue="12.99"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="freeShipping">Free Shipping Threshold</Label>
                  <Input id="freeShipping" type="number" defaultValue="50.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processingTime">Processing Time (days)</Label>
                  <Input id="processingTime" type="number" defaultValue="2" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Shipping Options</h4>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">
                      Standard Shipping
                    </p>
                    <p className="text-sm text-gray-600">5-7 business days</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">
                      Express Shipping
                    </p>
                    <p className="text-sm text-gray-600">2-3 business days</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      Same Day Delivery
                    </p>
                    <p className="text-sm text-gray-600">Within city limits</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Shipping Settings
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6 border-[var(--honey-gold)]/20">
            <h3 className="font-semibold text-[var(--dark-cocoa)] mb-6">
              Notification Preferences
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Email Notifications
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">
                        New Order Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Get notified when new orders arrive
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">
                        Payment Confirmations
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive payment success notifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">
                        Low Stock Alerts
                      </p>
                      <p className="text-sm text-gray-600">
                        Alert when products are running low
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        Customer Messages
                      </p>
                      <p className="text-sm text-gray-600">
                        Notifications for customer inquiries
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Weekly Reports
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Sales Summary</p>
                      <p className="text-sm text-gray-600">
                        Weekly sales performance report
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        Inventory Report
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock levels and reorder alerts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
