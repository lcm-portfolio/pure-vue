/**
 * Product Cache Utilities.
 *
 * Purpose:
 * - Caching and efficient retrieval of product-related data like categories, brands, and filtered/sorted products.
 * - Avoiding repetitive operations and calculations for better performance.
 *
 * Cached Variables:
 * - `cachedCategories`: Cached list of unique product categories.
 * - `cachedBrands`: Cached list of unique product brands.
 * - `cachedFinalDisplayedProducts`: Cached list of products after filtering and sorting.
 * - `productsVersionId` and `productsVersionIdForBrands`: Version control for cached data to determine if refresh is needed.
 * - `previousCriteria`: Tracks the last filter/sort criteria used to avoid unnecessary recalculations.
 *
 * Functions:
 * - `getCachedCategories(state: ProductsState)`: Retrieves the cached list of unique product categories. 
 *   Refreshes the cache if the product list has changed.
 *
 * - `getCachedBrands(state: ProductsState)`: Retrieves the cached list of unique product brands. 
 *   Refreshes the cache if the product list has changed.
 *
 * - `finalCachedDisplayedProducts(state: ProductsState)`: Retrieves the cached list of products after filtering and sorting based on criteria from the state.
 *   Refreshes the cache if the filter/sort criteria have changed.
 *
 */



import { ProductInterface } from "@/interfaces/";
import { filterProductsByAllCriteria } from "./filterUtils";
import { sortProducts } from "./sortUtils";
import { ProductsState } from "./types";

let cachedCategories: string[] | null = null;
let productsVersionId: number = 0;
let cachedBrands: string[] | null = null;
let productsVersionIdForBrands: number = 0;
let cachedFinalDisplayedProducts: ProductInterface[] | null = null;
let previousCriteria: { [key: string]: any } = {};

export function getCachedCategories(state: ProductsState): string[] {
  const currentProductsVersionId = state.products.length;

  if (productsVersionId !== currentProductsVersionId) {
    productsVersionId = currentProductsVersionId;
    cachedCategories = [...new Set(state.products.map((product) => product.category))];
  }

  return cachedCategories || [];
}

export function getCachedBrands(state: ProductsState): string[] {
  const currentProductsVersionId = state.products.length;

  if (productsVersionIdForBrands !== currentProductsVersionId) {
    productsVersionIdForBrands = currentProductsVersionId;
    cachedBrands = [...new Set(state.products.map((product) => product.brand))];
  }

  return cachedBrands || [];
}

export function finalCachedDisplayedProducts(state: ProductsState): ProductInterface[] {
  const currentCriteria = {
    sortAttribute: state.sortAttribute,
    sortOrder: state.sortOrder,
    filterBrands: state.filterBrands.join(","),
    filterCategories: state.filterCategories.join(","),
    filterPriceLower: state.filterPrice.lower,
    filterPriceUpper: state.filterPrice.upper,
    filteredRating: state.filteredRating,
    searchTerm: state.searchTerm,
  };

  if (JSON.stringify(previousCriteria) !== JSON.stringify(currentCriteria)) {
    previousCriteria = currentCriteria;
    const filteredProducts = filterProductsByAllCriteria(state);
    cachedFinalDisplayedProducts = sortProducts(filteredProducts, state.sortAttribute, state.sortOrder);
  }

  return cachedFinalDisplayedProducts || [];
}
