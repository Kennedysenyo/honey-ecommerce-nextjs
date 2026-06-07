"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateCategoryFormResponseType,
  CreateCategoryType,
} from "@/features/categories/category.types";
import { validateCreateCategoryForm } from "@/features/categories/category.validators";
import { createSlug } from "@/lib/utils/createSlug";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCategoryType>({
    name: "",
    slug: "",
  });

  const handleFormFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initialFormState: CreateCategoryFormResponseType = {
    success: false,
    errors: {},
    errorMessage: null,
  };
  const [state, formAction, isPending] = useActionState(
    validateCreateCategoryForm,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      setFormData({ name: "", slug: "" });
    }

    toast.success("Category created successfully");
  }, [state.success]);

  return (
    <form action={formAction}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/categories">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-semibold text-[var(--dark-cocoa)]">
                Add New Category
              </h1>
              <p className="text-gray-600 mt-1">Create a new honey category</p>
            </div>
          </div>
          <div className="flex items-center gap-3 min-w-50">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
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

        <Card className="p-6 border-[var(--honey-gold)]/20">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category</Label>
              <Input
                id="productName"
                name="name"
                value={formData.name}
                onChange={handleFormFieldChange}
                placeholder="e.g., Pure honey"
              />
              {state.errors.name && (
                <p className="text-xs text-red-400">{state.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleFormFieldChange}
                  placeholder="wildflower-honey-500ml"
                />
                <button
                  className="py-2 px-4 shadow-sm rounded-md hover:bg-gray-100 active:shadow-none"
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: createSlug(formData.name),
                    }))
                  }
                >
                  Automate
                </button>
              </div>
              {state.errors.slug && (
                <p className="text-xs text-red-400">{state.errors.slug}</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
}
