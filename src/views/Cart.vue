<script setup lang="ts">
import Cart from "../components/Cart/Cart.vue";
import Summary from "../components/Cart/Summary.vue";
import { CartItemInterface, ProductInterface } from "../interfaces/index.ts";
import { computed } from "vue";
import { useCart } from "@/store/cart";
import { useProducts } from "@/store/products";
const cartStore = useCart();

const cartItems = computed<CartItemInterface[]>(() => cartStore.getCartItems);
</script>

<template>
  <div class="cart-container">
    <div v-if="cartItems.length > 0" class="main-cart">
      <h1 class="title">C A R T</h1>
      <Cart></Cart>
    </div>
    <div v-else class="main-cart">
      <h1 class="title">Your Cart is Empty</h1>
    </div>
    <div class="summary-container">
      <Summary class="summary"></Summary>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  text-shadow: 2px 2px 4px rgba(233, 114, 78, 0.8);
}
.cart-container {
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: var(--secondary);
}

.main-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 110%;
  padding: 20px;
}

.summary-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.summary {
  font-size: 1.5rem;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .main-cart {
    width: 80%;
  }

  .summary-container {
    width: 80%;
  }
}

@media screen and (max-width: 767px) {
  .cart-container {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .main-cart {
    width: 100%;
  }

  .summary-container {
    width: 100%;
  }
  .summary {
    width: 100%;
  }
}
</style>
