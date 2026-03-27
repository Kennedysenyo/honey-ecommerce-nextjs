import { ProductsState, ProductsStateAction } from "@/types/types";

export const productsReducer = (
  state: ProductsState,
  action: ProductsStateAction,
): ProductsState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null, products: [], filteredProducts: [] };
    case "PRODUCTS_FETCHED":
      return {
        loading: false,
        error: null,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        products: [],
        filteredProducts: [],
      };
    case "FILTER":
      return {
        ...state,
        filteredProducts: action.payload.trim()
          ? state.products.filter((product) =>
              product.name
                .toLocaleLowerCase()
                .includes(action.payload.trim().toLocaleLowerCase()),
            )
          : state.products,
      };
    default:
      throw "Unknown Action";
  }
};
