/**
 * Shopping Cart Store Type.
 *
 * This file defines the type that is used to manage the state of the
 * shopping cart in the application.
 *
 * Type:
 * - `CartsState`: Defines the shape of the shopping cart store state, including the
 *   list of items in the cart, represented as an array of `CartItemInterface` objects.
 *
 */
import { CartItemInterface } from "@/interfaces";

export type CartsState = {
  contents: CartItemInterface[];
};
