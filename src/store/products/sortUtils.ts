/**
 * Product Sorting Utilities.
 *
 * This module contains utility functions related to sorting products based on various attributes.
 *
 * Functions:
 * - `sortProducts(products, sortAttribute, sortOrder)`: Sorts an array of products based on a given attribute and order.
 *   If no sort attribute is provided, it returns the original array. The sorting mechanism currently supports numerical
 *   values only.
 *
 * Note: Currently, the sort function only handles numerical attributes. If a non-numerical attribute is provided, the
 * original array will be returned without changes.
 *
 */

import { ProductInterface } from "@/interfaces";
import { SortAttributes, SortOrder } from "./types";

export function sortProducts(
  products: ProductInterface[],
  sortAttribute: SortAttributes | null,
  sortOrder: SortOrder
): ProductInterface[] {
  if (!sortAttribute) {
    return products;
  }
  const sorted = [...products];
  sorted.sort((a, b) => {
    const compareValueA = a[sortAttribute];
    const compareValueB = b[sortAttribute];
    if (typeof compareValueA === "number" && typeof compareValueB === "number") {
      return sortOrder === SortOrder.ASC ? compareValueA - compareValueB : compareValueB - compareValueA;
    } else {
      return 0;
    }
  });
  return sorted;
}
