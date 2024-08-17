<script setup lang="ts">
import { router } from "../../router/index.ts";
import { computed, ref } from "vue";
import Pagination from "../Widgets/Pagination.vue";
import PerPageSelect from "../Widgets/PerPageSelect.vue";
import { useProducts } from "@/store/products";
import { useCart } from "@/store/cart";

const productsStore = useProducts();
const cartStore = useCart();
const currentPage = ref(1);
const onPageChange = (value: number) => {
  currentPage.value = value;
};

const sliceStart = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const sliceEnd = computed(() => {
  return sliceStart.value + itemsPerPage.value;
});

const productsFilter = computed(() => {
  return productsStore.finalDisplayedProducts.slice(sliceStart.value, sliceEnd.value);
});

const formatPrice = (price: number) => price.toFixed(2);
const formatTime = (milliseconds:any) => {

if (milliseconds === null) {
  return "Loading";
}
const seconds = Math.floor((milliseconds / 1000) % 60);
const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
const days = Math.floor((milliseconds / 1000 / 60 / 60) / 24);

return [
  days.toString().padStart(2, "0"),
  hours.toString().padStart(2, "0"),
  minutes.toString().padStart(2, "0"),
  seconds.toString().padStart(2, "0")
].join(":");
};


const itemsPerPage = ref(10);

const updateItemsPerPage = (value: number) => {
  itemsPerPage.value = value;
};

import StarRating from "@/components/Widgets/StarRating.vue";
</script>

<template>
  <div class="products">
    <PerPageSelect class="select" :itemsPerPage="itemsPerPage" @update:itemsPerPage="updateItemsPerPage" />
    <div class="products-list">
      <div class="products-list-item" v-for="product in productsFilter" :key="product.id">
        <div @click="router.push(`/products/${product.id}`)" class="product-image">
          <img :src="product.image_link" alt="product" style="width: 100%" />
        </div>
        <div class="product-info">
          <p class="product-name">{{ product.name }}</p>
          <p class="product-brand">{{ product.brand }}</p>
          <p class="product-price">{{ formatPrice(product.price * product.rebate)}} $</p>
          <p class="product-time" v-if="product.time_remaining > 0">{{ formatTime(product.time_remaining) }}</p>
          <StarRating v-if="product.rating" :rating="product.rating" />
        </div>
        <div>
          <button class="add-to-cart-btn" @click="cartStore.addProduct(product.id)">ADD TO CART</button>
        </div>
      </div>
    </div>
    <pagination
      :total="productsStore.finalDisplayedProducts.length"
      :per-page="itemsPerPage"
      :current-page="currentPage"
      @pagechanged="onPageChange($event)"
    />
  </div>
</template>

<style scoped>
.products {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 80%;
  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 20px;
  padding-left: 13vh;
}

.products-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
}

.product-name {
  font-size: 27px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 5px;
}

.product-brand {
  font-size: 22px;
  color: var(--font-primary);
  text-align: center;
  margin-bottom: 5px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
}

.add-to-cart-btn {
  background-color: var(--primary);
  border: none;
  border-radius: 15px;
  font-size: 18px;
  padding: 3px 30px;
  margin: 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: var(--secondary);
}
.select {
  align-self: flex-end;
  margin-right: 3%;
}

.back-button {
    position: fixed;
    top: 4rem;
    left: 1rem;
  }

@media screen and (max-width: 768px) {
  .select {
    align-self: center;
    margin-right: 0;
  }

  .products-list {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }

  .products-list-item {
    width: 90%;
  }


}
</style>
