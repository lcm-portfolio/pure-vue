<script setup lang="ts">
import { useProducts } from "@/store/products";

const productsStore = useProducts();
const id = 1048;

const addSale = () => {
  productsStore.generateOneSale(id);
};
</script>

<template>
  <button class="add-sale-button" @click="addSale">Add 30sec Sale</button>
</template>

<style scoped>
.add-sale-button {
  position: absolute;
  top: 20rem;
  left: 1rem;
  z-index: 1;
  background-color: var(--primary);
  border: none;
  font-size: 1.4rem;
  padding: 3px 17px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 15px;
}
</style>
