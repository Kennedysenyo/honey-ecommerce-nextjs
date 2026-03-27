import { ProductsState, ProductsStateAction } from "@/types/types";

export const ITEMS_PER_PAGE = 6;

export const productsReducer = (
  state: ProductsState,
  action: ProductsStateAction,
): ProductsState => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: null,
        products: [],
        filteredProducts: [],
        paginatedProducts: [],
      };
    case "PRODUCTS_FETCHED":
      return {
        loading: false,
        error: null,
        products: action.payload,
        filteredProducts: action.payload,
        paginatedProducts: action.payload.slice(0, ITEMS_PER_PAGE),
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        products: [],
        filteredProducts: [],
        paginatedProducts: [],
      };
    case "FILTER":
      const newState = {
        ...state,
        filteredProducts: action.payload.trim()
          ? state.products.filter((product) =>
              product.name
                .toLocaleLowerCase()
                .includes(action.payload.trim().toLocaleLowerCase()),
            )
          : state.products,
      };
      return {
        ...newState,
        paginatedProducts: newState.filteredProducts.slice(0, ITEMS_PER_PAGE),
      };
    case "PAGINATE":
      return {
        ...state,
        paginatedProducts: state.filteredProducts.slice(
          action.payload[0],
          action.payload[1],
        ),
      };
    default:
      throw "Unknown Action";
  }
};
