<script setup lang="ts">
import { ref } from "vue";
import BillingInfo from "@/components/Checkout/BillingInfo.vue";
import CreditCard from "@/components/Checkout/CreditCard.vue";
import GiftCard from "@/components/Checkout/GiftCard.vue";
import { computed } from "vue";
import { useCart } from "@/store/cart";
import { router } from "@/router";

const currentView = ref("summary");
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

const showView = (viewName: string) => {
  currentView.value = viewName;
};
</script>

<template>
  <div class="flex-container">
    <div class="title-container">
      <div class="titleAA" @click="showView('summary')">CHECKOUT</div>
      <div class="titleA" @click="showView('billing')">BILLING INFORMATIONS</div>
      <div class="titleB" @click="showView('credit')">CREDIT CARD</div>
      <div class="titleC" @click="showView('gift')">GIFT CARD</div>
    </div>
    <div class="content-container">
      <div v-if="currentView === 'summary'" class="summary">
        <h2>S U M M A R Y</h2>
        <p>Product Subtotal : {{ productSubtotal.toFixed(2) }}$</p>
        <p>Estimated Shipping : {{ shippingCostDisplay }}</p>
        <p>TVQ : {{ tvq.toFixed(2) }}$</p>
        <p>TPS : {{ tps.toFixed(2) }}$</p>
        <p>TOTAL : {{ total.toFixed(2) }}$</p>
        <div>
          <button class="cart-btn" @click="router.push('/cart')">VIEW CART BEFORE CHECKOUT</button>
          <button class="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </div>
    <BillingInfo v-if="currentView === 'billing'" />
    <CreditCard v-if="currentView === 'credit'" />
    <GiftCard v-if="currentView === 'gift'" />
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.title-container {
  width: 50%;
}

.titleAA {
  padding: 1rem;
  background-color: var(--primary);
  cursor: pointer;
  width: 130%;
  margin-bottom: 5rem;
  margin-top: 2.5rem;
  font-size: 1.5rem;
  letter-spacing: 0.4rem;
}

.titleA,
.titleB,
.titleC {
  padding: 1rem;
  background-color: #f0f0f0;
  cursor: pointer;
  width: 130%;
  margin-bottom: 5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  letter-spacing: 0.4rem;
}

.titleA:hover,
.titleB:hover,
.titleC:hover {
  background-color: var(--primary);
}

.modal-container {
  width: 50%;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  z-index: 1;
}

.summary {
  background-color: var(--primary);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  padding: 20px;
  height: 56vh;
}

.summary p {
  margin-bottom: 5px;
  text-align: left;
  font-size: 1.5rem;
}

.summary h2 {
  font-size: 2.6rem;
}

.checkout-btn,
.cart-btn {
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 1.3rem;
  cursor: pointer;
  background-color: white;
  padding-left: 3rem;
  padding-right: 3rem;
  color: black;
  margin-left: 1rem;
}
.modal-container {
  transform: translateX(0);
}

.cart-btn:hover,
.checkout-btn:hover {
  background-color: var(--dark-primary);
}

@media screen and (max-width: 768px) {
  .summary {
    margin-bottom: 2.5rem;
  }
}
</style>
