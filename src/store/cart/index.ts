/**
 * Shopping Cart Store with Pinia.
 *
 * State:
 * - `contents`: The items in the cart.
 *
 * Getters:
 * - Calculations of totals, taxes, and shipping fees.
 *
 * Actions:
 * - Management of products in the cart (adding, removing, loading from local storage, etc.)
 *
 */

import { defineStore } from "pinia";
import type { CartItemInterface } from "@/interfaces/";
import { useProducts } from "../products";
import type { CartsState } from "./types";

export const useCart = defineStore("cart", {
  state: (): CartsState => ({
    contents: [],
  }),
  getters: {
    getCount(): number {
      return this.contents.reduce((total, cartItem) => total + cartItem.quantity, 0);
    },
    getCartItems(): CartItemInterface[] {
      return this.contents;
    },

    getSubTotal(): number {
      const productsStore = useProducts();
      return this.contents.reduce((total, cartItem) => {
        const product = productsStore.getProductById(cartItem.productId);
        if (product?.discount && product?.discount.discountPercentage > 0) {
          return (
            total + (product.price - (product.price * product.discount.discountPercentage) / 100) * cartItem.quantity
          );
        }
        return product ? total + product.price * cartItem.quantity : total;
      }, 0);
    },
    getTvq(): number {
      return this.getSubTotal * 0.09975;
    },
    getTps(): number {
      return this.getSubTotal * 0.05;
    },
    getTotal(): number {
      return this.getSubTotal + this.getTvq + this.getTps;
    },
    getShippingCost(): number {
      return this.getTotal > 200 ? 0 : 15;
    },
  },
  actions: {
    addProduct(productId: number) {
      const found = this.contents.find((item) => item.productId === productId);
      if (found) {
        found.quantity += 1;
      } else {
        this.contents.push({ productId, quantity: 1 });
      }
      localStorage.setItem("cartitems", JSON.stringify(this.contents));
    },
    removeProduct(productId: number) {
      const index = this.contents.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        this.contents.splice(index, 1); // this will remove the item from the array
      }
      if (this.contents.length === 0) {
        localStorage.removeItem("cartitems");
      } else {
        localStorage.setItem("cartitems", JSON.stringify(this.contents));
      }
    },
    fetchCart() {
      const cartitems = localStorage.getItem("cartitems");
      try {
        this.contents = JSON.parse(cartitems as string) || [];
      } catch (error) {
        this.contents = [];
      }
    },
    subtractProduct(productId: number) {
      const found = this.contents.find((item) => item.productId === productId);
      if (found) {
        found.quantity -= 1;
        if (found.quantity === 0) {
          this.contents = this.contents.filter((item) => item.productId !== productId);
        }
      }
      localStorage.setItem("cartitems", JSON.stringify(this.contents));
    },
  },
});
