/**
 * Product Sales and Discount Utilities.
 *
 * This module contains utility functions related to managing product sales and discounts.
 *
 * Functions:
 * - `findProductById(products, productId)`: Finds a product by its unique ID.
 *
 * - `updateProductDiscountsInLocalStorage(sales)`: Updates the product discounts stored in the local storage.
 *
 * - `getDiscountedPrice(product)`: Calculates the discounted price for a given product,
 *   or returns the original price if no discount is present.
 *
 * - `generateTenSales(products, count)`: Generates a specified number of random sales for products.
 *   By default, it will generate 10 sales.
 *
 * - `getProductsOnSale(products, sales)`: Retrieves a list of products currently on sale based on an array of discounts.
 *
 */

import { ProductInterface, Discount } from "@/interfaces";

export function findProductById(products: ProductInterface[], productId: number): ProductInterface | undefined {
  return products.find((p) => p.id === productId);
}

export function updateProductDiscountsInLocalStorage(sales: Discount[]): void {
  localStorage.setItem("productDiscounts", JSON.stringify(sales));
}
export function getDiscountedPrice(product: ProductInterface): number {
  if (product && product.discount) {
    return product.price * (1 - product.discount.discountPercentage / 100);
  }
  return product ? product.price : 0;
}

export function generateTenSales(products: ProductInterface[], count: number = 10): Discount[] {
  const percentages = [10, 20, 30, 40, 50];
  const discounts: Discount[] = [];
  for (let i = 0; i < count; i++) {
    const productId = Math.floor(Math.random() * 100) + 1;
    const discountPercentage = percentages[Math.floor(Math.random() * percentages.length)];
    const discountEndDate = new Date();
    discountEndDate.setDate(discountEndDate.getDate() + Math.floor(Math.random() * 10) - 1);

    const product = findProductById(products, productId);
    if (product) {
      product.discount = {
        productId,
        discountPercentage,
        discountEndDate,
      };

      discounts.push({
        productId,
        discountPercentage,
        discountEndDate,
      });
    }
  }

  return discounts;
}
export function generateOneSale(products: ProductInterface[], productId: number): Discount {
  const percentages = [10, 20, 30, 40, 50];
  const discountPercentage = percentages[Math.floor(Math.random() * percentages.length)];
  const discountEndDate = new Date();
  discountEndDate.setSeconds(discountEndDate.getSeconds() + 30);

  const product = findProductById(products, productId);
  if (product) {
    product.discount = {
      productId,
      discountPercentage,
      discountEndDate,
    };
  }

  return {
    productId,
    discountPercentage,
    discountEndDate,
  };
}

export function getProductsOnSale(products: ProductInterface[], sales: Discount[]): ProductInterface[] {
  const productIdsOnSale = sales.map((sale) => sale.productId);
  return products.filter((product) => productIdsOnSale.includes(product.id));
}
