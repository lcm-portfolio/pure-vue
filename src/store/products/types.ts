/**
 * Product Store Types and Constants.
 *
 * This file defines types and constants that are used to manage the state of the
 * products in the application, as well as to control how products are filtered and sorted.
 *
 * Enums:
 * - `SortAttributes`: Attributes by which products can be sorted (e.g., price, rating).
 * - `SortOrder`: The order in which products can be sorted (ascending or descending).
 *
 * Interfaces:
 * - `ProductsState`: Defines the shape of the product store state, including the list of products,
 *   filter criteria (brands, categories, price range, rating), and sort settings (attribute and order).
 *
 */

import { ProductInterface, Discount } from "@/interfaces";

export enum SortAttributes {
  PRICE = "price",
  RATING = "rating",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface ProductsState {
  products: ProductInterface[];
  nextId: number;
  filterBrands: string[];
  filterCategories: string[];
  filterPrice: {
    lower: number;
    upper: number;
  };
  filteredRating: number;
  sortAttribute: SortAttributes | null;
  sortOrder: SortOrder;
  sales: Discount[];
  searchTerm: string;
}
