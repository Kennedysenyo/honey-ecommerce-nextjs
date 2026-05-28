import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function ProductForm() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
              Add New Product
            </h1>
            <p className="text-gray-600 mt-1">Create a new honey product</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white">
            Save Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="general">
            <TabsList className="bg-white border border-[var(--honey-gold)]/20">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general">
              <Card className="p-6 border-[var(--honey-gold)]/20">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="e.g., Wildflower Honey"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productType">Honey Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="raw">Raw Honey</SelectItem>
                        <SelectItem value="premium">Premium Honey</SelectItem>
                        <SelectItem value="flavored">Flavored Honey</SelectItem>
                        <SelectItem value="organic">Organic Honey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--honey-gold)]"
                      rows={6}
                      placeholder="Describe your honey product..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountPrice">Discount Price ($)</Label>
                      <Input
                        id="discountPrice"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <Card className="p-6 border-[var(--honey-gold)]/20">
                <div className="space-y-6">
                  <div>
                    <Label>Product Images</Label>
                    <div className="mt-2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--honey-gold)] transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag and drop images here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports: JPG, PNG, WebP (Max 5MB per image)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image Preview Gallery */}
                  {images.length > 0 && (
                    <div>
                      <Label>Uploaded Images</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
                              alt={`Product ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <Card className="p-6 border-[var(--honey-gold)]/20">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="e.g., WFH-500ML" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reorderPoint">Reorder Point</Label>
                      <Input id="reorderPoint" type="number" placeholder="0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (g)</Label>
                      <Input id="weight" type="number" placeholder="500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume (ml)</Label>
                      <Input id="volume" type="number" placeholder="500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-t">
                    <div>
                      <p className="font-medium text-gray-900">
                        Track Inventory
                      </p>
                      <p className="text-sm text-gray-600">
                        Enable stock tracking for this product
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <Card className="p-6 border-[var(--honey-gold)]/20">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      placeholder="Product title for search engines"
                    />
                    <p className="text-xs text-gray-500">
                      60 characters recommended
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <textarea
                      id="metaDescription"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--honey-gold)]"
                      rows={4}
                      placeholder="Product description for search engines"
                    />
                    <p className="text-xs text-gray-500">
                      160 characters recommended
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="honey, organic, natural, wildflower"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input id="slug" placeholder="wildflower-honey-500ml" />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="p-6 border-[var(--honey-gold)]/20">
            <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
              Status
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Product Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <Label htmlFor="featured">Featured Product</Label>
                <Switch id="featured" />
              </div>
            </div>
          </Card>

          {/* Organization */}
          <Card className="p-6 border-[var(--honey-gold)]/20">
            <h3 className="font-semibold text-[var(--dark-cocoa)] mb-4">
              Organization
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honey">Honey</SelectItem>
                    <SelectItem value="gift">Gift Sets</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Add tags..." />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
