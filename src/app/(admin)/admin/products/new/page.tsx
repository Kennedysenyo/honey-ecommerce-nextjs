"use client";

import { ChangeEvent, KeyboardEvent, useActionState, useState } from "react";
import { ArrowLeft, Loader, Tags, Upload, X } from "lucide-react";
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
import {
  CreateProductDataType,
  CreateProductFormResponseType,
} from "@/features/products/products.types";
import { useRouter } from "next/navigation";
import { createProductFormValidator } from "@/features/products/products.validators";

export default function ProductForm() {
  const [images, setImages] = useState<string[]>([]);

  const router = useRouter();
  const [formData, setFormData] = useState<CreateProductDataType>({
    name: "",
    slug: "",
    description: "",
    honeyType: "forest",
    categoryId: "",
    status: "draft",
    featured: true,
    price: 0,
    tags: [],
    images: [],
    ingredients: [],
    benefits: [],
    sku: "",
    stockQuantity: 0,
    reorderPoint: 10,
    trackInventory: true,
    weight: 0,
    volume: 0,
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  });

  type TagInput = keyof Pick<
    typeof formData,
    "keywords" | "tags" | "benefits" | "ingredients"
  >;

  const [multiInput, setMultiInput] = useState<{ [K in TagInput]: string }>({
    tags: "",
    ingredients: "",
    benefits: "",
    keywords: "",
  });
  const [activeMultiInput, setActiveMultiInput] = useState<TagInput | null>(
    null,
  );

  const handleMultiInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActiveMultiInput(name as TagInput);
    setMultiInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!activeMultiInput) return;
      const value = multiInput[activeMultiInput].trim();

      if (!value) return;
      if (formData.tags.includes(value)) return;
      if (!activeMultiInput) return;

      setFormData((prev) => ({
        ...prev,
        [activeMultiInput]: [...formData[activeMultiInput], value],
      }));
      setMultiInput({
        tags: "",
        ingredients: "",
        benefits: "",
        keywords: "",
      });
    }
  };

  const removeTag = (tag: string, name: TagInput) => {
    setFormData((prev) => ({
      ...prev,
      [name]: formData[name].filter((n) => n !== tag),
    }));
  };

  const handleFormFieldChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initialFormState: CreateProductFormResponseType = {
    success: false,
    errorMessage: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    createProductFormValidator,
    initialFormState,
  );

  return (
    <form action={formAction} className="space-y-6">
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
        <div className="flex items-center gap-3 min-w-50">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white flex-1 flex items-center justify-center"
          >
            {isPending ? (
              <Loader className="animate-spin" size={7} />
            ) : (
              " Save Product"
            )}
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
                      name="name"
                      value={formData.name}
                      onChange={handleFormFieldChange}
                      placeholder="e.g., Wildflower Honey"
                    />
                    {state.errors.name && (
                      <p className="text-xs text-red-400">
                        {state.errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productType">Honey Type</Label>
                    <Select
                      name="honeyType"
                      value={formData.honeyType}
                      onValueChange={(
                        value: CreateProductDataType["honeyType"] | null,
                      ) =>
                        setFormData((prev) => ({
                          ...prev,
                          honeyType: value ? value : "acacia",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forest">Forest Honey</SelectItem>
                        <SelectItem value="wild">Wild Honey</SelectItem>
                        <SelectItem value="acacia">Acacia Honey</SelectItem>
                        <SelectItem value="clover">Clover Honey</SelectItem>
                        <SelectItem value="manuka">Manuka Honey</SelectItem>
                      </SelectContent>
                    </Select>
                    {state.errors.honeyType && (
                      <p className="text-xs text-red-400">
                        {state.errors.honeyType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <div className="flex flex-wrap gap-2 border rounded-md p-2">
                      {formData.ingredients.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                        >
                          <span>{tag}</span>

                          <button
                            type="button"
                            onClick={() => removeTag(tag, "ingredients")}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <input
                        id="ingredients"
                        value={multiInput.ingredients}
                        name="ingredients"
                        onChange={handleMultiInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-w-[120px] outline-none bg-transparent"
                        placeholder="Type and press Enter"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormFieldChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--honey-gold)]"
                      rows={6}
                      placeholder="Describe your honey product..."
                    />
                    {state.errors.description && (
                      <p className="text-xs text-red-400">
                        {state.errors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits</Label>
                    <div className="flex flex-wrap gap-2 border rounded-md p-2">
                      {formData.benefits.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                        >
                          <span>{tag}</span>

                          <button
                            type="button"
                            onClick={() => removeTag(tag, "benefits")}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <input
                        id="benefits"
                        value={multiInput.benefits}
                        name="benefits"
                        onChange={handleMultiInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-w-[120px] outline-none bg-transparent"
                        placeholder="Type and press Enter"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleFormFieldChange}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                      />
                      {state.errors.price && (
                        <p className="text-xs text-red-400">
                          {state.errors.price}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountPrice">Discount Price ($)</Label>
                      <Input
                        id="discountPrice"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        disabled
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
                    <Input
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleFormFieldChange}
                      placeholder="e.g., WFH-500ML"
                    />
                    {state.errors.sku && (
                      <p className="text-xs text-red-400">{state.errors.sku}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleFormFieldChange}
                        type="number"
                        placeholder="0"
                      />
                      {state.errors.stockQuantity && (
                        <p className="text-xs text-red-400">
                          {state.errors.stockQuantity}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reorderPoint">Reorder Point</Label>
                      <Input
                        id="reorderPoint"
                        name="reorderPoint"
                        value={formData.reorderPoint}
                        onChange={handleFormFieldChange}
                        type="number"
                        placeholder="0"
                      />
                      {state.errors.reorderPoint && (
                        <p className="text-xs text-red-400">
                          {state.errors.reorderPoint}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (g)</Label>
                      <Input
                        id="weight"
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleFormFieldChange}
                        placeholder="500"
                      />
                      {state.errors.weight && (
                        <p className="text-xs text-red-400">
                          {state.errors.weight}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume (ml)</Label>
                      <Input
                        id="volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleFormFieldChange}
                        type="number"
                        placeholder="500"
                      />
                      {state.errors.volume && (
                        <p className="text-xs text-red-400">
                          {state.errors.volume}
                        </p>
                      )}
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
                    <Switch
                      defaultChecked
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          trackInventory: checked,
                        }))
                      }
                    />
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
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleFormFieldChange}
                      placeholder="Product title for search engines"
                    />
                    <p className="text-xs text-gray-500">
                      60 characters recommended
                    </p>
                    {state.errors.metaTitle && (
                      <p className="text-xs text-red-400">
                        {state.errors.metaTitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleFormFieldChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--honey-gold)]"
                      rows={4}
                      placeholder="Product description for search engines"
                    />
                    <p className="text-xs text-gray-500">
                      160 characters recommended
                    </p>
                    {state.errors.metaDescription && (
                      <p className="text-xs text-red-400">
                        {state.errors.metaDescription}
                      </p>
                    )}
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleFormFieldChange}
                      placeholder="honey, organic, natural, wildflower"
                    />
                    {state.errors.keywords && (
                      <p className="text-xs text-red-400">
                        {state.errors.keywords}
                      </p>
                    )}
                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <div className="flex flex-wrap gap-2 border rounded-md p-2">
                      {formData.keywords.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                        >
                          <span>{tag}</span>

                          <button
                            type="button"
                            onClick={() => removeTag(tag, "keywords")}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <input
                        id="keywords"
                        value={multiInput.keywords}
                        name="keywords"
                        onChange={handleMultiInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-w-[120px] outline-none bg-transparent"
                        placeholder="Type and press Enter"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleFormFieldChange}
                      placeholder="wildflower-honey-500ml"
                    />
                    {state.errors.slug && (
                      <p className="text-xs text-red-400">
                        {state.errors.slug}
                      </p>
                    )}
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
                <Select
                  defaultValue="active"
                  name="status"
                  value={formData.status}
                  onValueChange={(value: string | null) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: value
                        ? (value as CreateProductDataType["status"])
                        : "active",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors.status && (
                  <p className="text-xs text-red-400">{state.errors.status}</p>
                )}
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <Label htmlFor="featured">Featured Product</Label>
                <Switch
                  id="featured"
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, featured: checked }))
                  }
                />
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
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryId: value ? value : "",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Honey</SelectItem>
                    <SelectItem value="">Gift Sets</SelectItem>
                    <SelectItem value="">Accessories</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors.categoryId && (
                  <p className="text-xs text-red-400">
                    {state.errors.categoryId}
                  </p>
                )}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormFieldChange}
                  placeholder="Add tags..."
                />
                {state.errors.tags && (
                  <p className="text-xs text-red-400">{state.errors.tags}</p>
                )}
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 border rounded-md p-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      <span>{tag}</span>

                      <button
                        type="button"
                        onClick={() => removeTag(tag, "tags")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <input
                    id="tags"
                    value={multiInput.tags}
                    name="tags"
                    onChange={handleMultiInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-w-[120px] outline-none bg-transparent"
                    placeholder="Type and press Enter"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
