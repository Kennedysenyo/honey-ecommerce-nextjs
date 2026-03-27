export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
  benefits: string[];
  ingredients: string[];
};

export type ProductsState = {
  loading: boolean;
  error: string | null;
  products: Product[];
  filteredProducts: Product[];
};

export type ProductsStateAction =
  | { type: "LOADING" }
  | { type: "PRODUCTS_FETCHED"; payload: Product[] }
  | { type: "ERROR"; payload: string }
  | { type: "FILTER"; payload: string };
