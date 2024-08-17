<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { onBeforeMount } from "vue";
import { useProducts } from "@/store/products";
import { useCart } from "@/store/cart";
import { useUser } from "@/shared/stores";
import { useRouter } from "vue-router";

const productsStore = useProducts();
const cartStore = useCart();
const userStore = useUser();
const router = useRouter();

onBeforeMount( async () =>  {
  cartStore.fetchCart();
  productsStore.setDefaultFilters();
  await productsStore.generateTenSales();
  productsStore.fetchSales();
});

const signOut = async () => {
  await userStore.signOut();
  router.push("/signin");
};
</script>

<template>
  <div class="container">
    <Header :is-authenticated="userStore.isAuthenticated" @sign-out="signOut" class="header"></Header>
    <router-view></router-view>
    <Footer class="footer"></Footer>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary);
}

.header {
  flex: 0 0 auto;
  height: 60px;
  z-index: 100;
  box-shadow: 0px 2px 4px rgba(255, 0, 0, 0.1);
}

.footer {
  flex: 0 0 auto;
  height: 60px;
  box-shadow: 0px 2px 4px rgba(255, 0, 0, 0.1);
}
</style>
