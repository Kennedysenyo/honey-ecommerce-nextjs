import { ProductForm } from "@/components/dashboard/add-product/AddProduct";
import { fetchAllCategories } from "@/features/categories/category.queries";

export default async function AddProductPage() {
  const categories = await fetchAllCategories();
  return <ProductForm categories={categories} />;
}
