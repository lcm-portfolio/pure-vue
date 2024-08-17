<script setup lang="ts">
import { ProductInterface } from "../../interfaces/index.ts";
import { computed } from "vue";
import { useCart } from "@/store/cart";
import { useProducts } from "@/store/products";
import CartItem from "./CartItem.vue";
import BackButton from "../Widgets/BackButton.vue";

const cartStore = useCart();
const productsStore = useProducts();
const cartItems = computed(() => cartStore.getCartItems);
</script>

<template>
  <BackButton class="back-button" />
  <CartItem
    v-for="product in cartItems"
    :key="product.productId"
    :product="productsStore.getProductById(product.productId) as ProductInterface"
    :quantity="product.quantity"
  />
</template>

<style scoped>
.back-button {
  position: absolute;
  top: 4rem;
  left: 1rem;
}
</style>
