<script setup lang="ts">
import Product from "../components/Products/Product.vue";
import { ProductInterface} from "../interfaces/index.ts";
import { ref, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "@/store/products";
import BackButton from "@/components/Widgets/BackButton.vue";
const router = useRouter();
const productsStore = useProducts();
const products = computed(() => productsStore.getProducts);

const product = ref<ProductInterface | null>(null);
const route = useRoute();
watchEffect(() => {
  const id = Array.isArray(route.params.id) ? parseInt(route.params.id[0]) : parseInt(route.params.id);

  const foundProduct = products.value.find((p) => p.id === id);

  if (foundProduct) {
    product.value = foundProduct;
  } else {
    router.push("/404");
  }
});
</script>

<template>
  <div class="product-container">
    <BackButton class="back-button"/>
    <Product :product="product" />
  </div>
</template>

<style scoped>

.back-button {
  position: absolute;
    top: 4rem;
    left: 1rem;
}
</style>
