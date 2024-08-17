<script setup lang="ts">
import { computed } from "vue";
import { useCart } from "@/store/cart";
import { router } from "@/router";

const cartStore = useCart();

const productSubtotal = computed(() => {
  return cartStore.getSubTotal;
});

const shippingCost = computed(() => {
  return cartStore.getShippingCost;
});

const tvq = computed(() => {
  return cartStore.getTvq;
});

const tps = computed(() => {
  return cartStore.getTps;
});

const total = computed(() => {
  return productSubtotal.value + shippingCost.value + tvq.value + tps.value;
});
const shippingCostDisplay = computed(() => {
  return shippingCost.value === 0 ? "Free" : shippingCost.value.toFixed(2) + "$";
});
</script>

<template>
  <div class="summary">
    <h2>S U M M A R Y</h2>
    <p>Product Subtotal : {{ productSubtotal.toFixed(2) }}$</p>
    <p>Estimated Shipping : {{ shippingCostDisplay }}</p>
    <p>TVQ : {{ tvq.toFixed(2) }}$</p>
    <p>TPS : {{ tps.toFixed(2) }}$</p>
    <p>TOTAL : {{ total.toFixed(2) }}$</p>
    <div>
      <button @click="router.push('/checkout')" class="checkout-btn">CONFIRM</button>
    </div>
  </div>
</template>

<style scoped>
.summary {
  background-color: var(--primary);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 70%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  padding: 20px;
}

.summary h2 {
  margin-bottom: 10px;
  color: white;
  text-shadow: 2px 2px 4px rgba(233, 114, 78, 0.8);
}

.summary p {
  margin-bottom: 5px;
  text-align: left;
}

.summary p:last-child {
  font-weight: bold;
}

.checkout-btn {
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 1.3rem;
  cursor: pointer;
  background-color: white;
  padding-left: 3rem;
  padding-right: 3rem;
  color: black;
}

.checkout-btn:hover {
  background-color: var(--dark-primary);
}

@media screen and (max-width: 768px) {
  .summary {
    margin-bottom: 2.5rem;
  }
}
</style>
