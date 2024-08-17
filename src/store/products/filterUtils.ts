/**
 * Product Filtering Utilities.
 *
 * This module contains utility functions for filtering products based on various criteria.
 * The criteria are derived from the `state` and the products to be filtered are passed as arguments.
 *
 * Functions:
 * - `filterProductsByBrand(state, products)`: Filters the products based on their brand.
 *
 * - `filterProductsByCategory(state, products)`: Filters the products based on their category.
 *
 * - `filterProductsByPrice(state, products)`: Filters the products that fall within a specified price range.
 *
 * - `filterProductsByRating(state, products)`: Filters the products based on a minimum rating.
 *
 * - `filterProductsByAllCriteria(state)`: An aggregate function that applies all of the above filters sequentially.
 *
 */

import { ProductsState } from "./types";
import { ProductInterface } from "@/interfaces";

export function filterProductsByBrand(state: ProductsState, products: ProductInterface[]): ProductInterface[] {
  return products.filter((product) => product.brand && state.filterBrands.includes(product.brand));
}

export function filterProductsByCategory(state: ProductsState, products: ProductInterface[]): ProductInterface[] {
  return products.filter((product) => product.category && state.filterCategories.includes(product.category));
}

export function filterProductsByPrice(state: ProductsState, products: ProductInterface[]): ProductInterface[] {
  return products.filter(
    (product) => product.price >= state.filterPrice.lower && product.price <= state.filterPrice.upper
  );
}

export function filterProductsByRating(state: ProductsState, products: ProductInterface[]): ProductInterface[] {
  return products.filter((product) => product.rating && product.rating >= state.filteredRating);
}

export function filterProductsBySearchTerm(state: ProductsState, products: ProductInterface[]): ProductInterface[] {
  if (!state.searchTerm) return products; // Si aucun terme de recherche n'est fourni, retourner tous les produits

  const term = state.searchTerm.toLowerCase();

  return products.filter((product) => {
    // Pour chaque champ du produit, vérifier s'il contient le terme de recherche
    for (const key in product) {
      const value = product[key as keyof ProductInterface];
      if (value !== null && value !== undefined) {
        if (value.toString().toLowerCase().includes(term)) {
          return true;
        }
      }
    }

    // Vérifier dans la liste des tags
    for (const tag of product.tag_list) {
      if (tag.toLowerCase().includes(term)) {
        return true;
      }
    }

    // Vérifier dans la liste des couleurs
    for (const color of product.product_colors) {
      if (
        (color.colour_name && color.colour_name.toLowerCase().includes(term)) ||
        color.hex_value.toLowerCase().includes(term)
      ) {
        return true;
      }
    }

    return false;
  });
}
export function filterProductsByAllCriteria(state: ProductsState): ProductInterface[] {
  let filteredProducts = [...state.products];
  filteredProducts = filterProductsBySearchTerm(state, filteredProducts);
  filteredProducts = filterProductsByBrand(state, filteredProducts);
  filteredProducts = filterProductsByCategory(state, filteredProducts);
  filteredProducts = filterProductsByPrice(state, filteredProducts);
  filteredProducts = filterProductsByRating(state, filteredProducts);

  return filteredProducts;
}
