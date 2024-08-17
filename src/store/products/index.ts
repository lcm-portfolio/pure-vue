/**
 * Product Store with Pinia.
 *
 * State:
 * - `products`: List of products imported from a JSON file.
 * - `nextId`: Next ID for new products added (if needed).
 * - `sortAttribute` and `sortOrder`: Attribute and order to sort the products.
 * - `filterBrands`, `filterCategories`, `filterPrice`, `filteredRating`: Filter criteria for the products.
 * - `sales`: List of ongoing sales for the products.
 *
 * Getters:
 * - `sortedProducts`: Products sorted based on the specified sorting attribute and order.
 * - `getProducts`: Retrieves the list of all products.
 * - `getProductById`: Fetches a specific product by its ID.
 * - `getProductsOnSale`: Fetches the list of products that are currently on sale.
 * - `finalDisplayedProducts`: Products finally displayed, after filtering and sorting.
 * - `getListCategories` and `getListBrands`: Retrieves unique lists of available categories and brands.
 * - `getProductDiscount`: Retrieves the discount for a given product ID.
 * - `getDiscountedPrice`: Calculates and retrieves the discounted price for a given product ID.
 *
 * Actions:
 * - `toggleSortAttribute`: Toggles the sorting attribute.
 * - `toggleSortOrder`: Toggles the sorting order.
 * - `setRatingFilter`: Sets the rating filter.
 * - `setPriceUpperFilter`: Sets the upper price filter.
 * - `setPriceLowerFilter`: Sets the lower price filter.
 * - `setCategoryFilter`: Sets the category filter.
 * - `setBrandsFilter`: Sets the brands filter.
 * - `setDefaultFilters`: Resets filters to their default values.
 * - `fetchSales`: Fetches sales data from local storage and updates the `sales` state.
 * - `setSale`: Sets a sale for a given product, updating both the product's discount and the sales list.
 * - `removeSale`: Removes a sale for a given product, updating both the product's discount and the sales list.
 * - `generateTenSales`: Generates ten sales and stores them in local storage.
 *
 */

import { defineStore } from "pinia";
import { ProductInterface, Discount } from "@/interfaces/";
import products from "../../data/makeupFilteredOld.json" assert { type: "json" };
import { SortAttributes, SortOrder, ProductsState } from "./types";
import { sortProducts } from "./sortUtils";
import { getCachedCategories, getCachedBrands, finalCachedDisplayedProducts } from "./cacheUtils";
import {
  generateTenSales,
  generateOneSale,
  getProductsOnSale,
  getDiscountedPrice,
  updateProductDiscountsInLocalStorage,
  findProductById,
} from "./salesUtils";

export const useProducts = defineStore("products", {
  state: (): ProductsState => ({
    products: products as ProductInterface[],
    nextId: 1000,
    sortAttribute: null,
    sortOrder: SortOrder.ASC,
    filterBrands: [],
    filterCategories: [],
    filterPrice: {
      lower: 0,
      upper: 100,
    },
    filteredRating: 0,
    sales: [],
    searchTerm: "",
  }),

  getters: {
    sortedProducts(state): ProductInterface[] {
      return sortProducts(state.products, state.sortAttribute, state.sortOrder);
    },
    getProducts(state): ProductInterface[] {
      return state.products;
    },

    getProductById(state) {
      return (id: number): ProductInterface | undefined => {
        return findProductById(state.products, id);
      };
    },
    getProductsOnSale(state): ProductInterface[] {
      return getProductsOnSale(state.products, state.sales);
    },

    finalDisplayedProducts(state): ProductInterface[] {
      return finalCachedDisplayedProducts(state);
    },

    getListCategories(state): string[] {
      return getCachedCategories(state);
    },

    getListBrands(state): string[] {
      return getCachedBrands(state);
    },

    getProductDiscount(state): (productId: number) => Discount | null {
      return (productId: number) => {
        const discount = state.sales.find((d) => d.productId === productId);
        return discount || null;
      };
    },
    getDiscountedPrice(state): (productId: number) => number {
      return (productId: number) => {
        const product = findProductById(state.products, productId);
        if (product) {
          return getDiscountedPrice(product);
        }
        throw new Error(`Product with ID ${productId} not found`);
      };
    },

    getFilteredRating(state): number {
      return state.filteredRating;
    },
  },

  actions: {
    toggleSortAttribute(attribute: SortAttributes) {
      if (this.sortAttribute === attribute) {
        this.sortAttribute = null;
      } else {
        this.sortAttribute = attribute;
      }
    },

    toggleSortOrder() {
      this.sortOrder = this.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    },

    setRatingFilter(rating: number) {
      this.filteredRating = rating;
    },

    setPriceUpperFilter(price: number) {
      this.filterPrice.upper = price;
    },

    setPriceLowerFilter(price: number) {
      this.filterPrice.lower = price;
    },

    setCategoryFilter(categories: string[]) {
      this.filterCategories = categories;
    },

    setBrandsFilter(brands: string[]) {
      this.filterBrands = brands;
    },

    setDefaultFilters() {
      this.filterBrands = this.getListBrands;
      this.filterCategories = this.getListCategories;
      this.filterPrice = {
        lower: 0,
        upper: 100,
      };
      this.filteredRating = 0;
    },
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },

    fetchSales() {
      const sales = localStorage.getItem("productDiscounts");
      if (sales) {
        this.sales = JSON.parse(sales);
      }

      const products = this.getProductsOnSale;
      products.forEach((product) => {
        product.discount = this.getProductDiscount(product.id);
      });
    },
    setSale(productId: number, discount: Discount, discountDuration: number) {
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        product.discount = discount;
      }

      const discountEndDate = new Date();
      discountEndDate.setDate(discountEndDate.getDate() + discountDuration);

      const sale = {
        productId,
        discountPercentage: discount.discountPercentage,
        discountEndDate,
      };
      this.sales.push(sale);

      updateProductDiscountsInLocalStorage(this.sales);
    },

    removeSale(productId: number) {
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        product.discount = null;
      }

      this.sales = this.sales.filter((sale) => sale.productId !== productId);
      updateProductDiscountsInLocalStorage(this.sales);
    },

    generateTenSales() {
      if (localStorage.getItem("productDiscounts")) {
        return;
      }
      const newSales = generateTenSales(this.products);
      this.sales = newSales;
      updateProductDiscountsInLocalStorage(newSales);
    },
    generateOneSale(productId: number) {
      const productOnSale = this.sales.some((sale) => sale.productId === productId);
      if (productOnSale) {
        return alert("This product is already on sale!");
      }
      const newSale = generateOneSale(this.products, productId);
      this.sales.push(newSale);
      updateProductDiscountsInLocalStorage(this.sales);
    },
    countdownEnded(productId: number) {
      // Recherchez la vente associée à ce produit
      const saleIndex = this.sales.findIndex((sale) => sale.productId === productId);

      // Si une vente est trouvée, supprimez-la
      if (saleIndex !== -1) {
        this.sales.splice(saleIndex, 1);
        const product = this.products.find((p) => p.id === productId);
        if (product) {
          product.discount = null;
        }
      }

      // Mettre à jour les remises dans le localStorage (ou tout autre traitement que vous souhaitez effectuer)
      updateProductDiscountsInLocalStorage(this.sales);
    },
  },
});
