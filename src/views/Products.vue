<script setup lang="ts">
import ProductsList from "@/components/Products/ProductsList.vue";
import Filter from "@/components/Filters/Filter.vue";
import { ref,onMounted } from "vue";
import { useProducts } from "@/store/products";

onMounted(() => {
  productsStore.setDefaultFilters();
});

const productsStore = useProducts();

const filtersOpen = ref(false);

const toggleFilter = () => {
  filtersOpen.value = !filtersOpen.value;
};

const closeFilter = () => {
  filtersOpen.value = false;
};
</script>

<template>
  <div class="container">
    <div class="filter-toggle" @click="toggleFilter">FILTERS</div>
    <div class="filter" :class="{ open: filtersOpen }">
      <button class="close-btn" @click="closeFilter">CONFIRM</button>
      <Filter />
    </div>
    <div class="products-container">
      <ProductsList :products="productsStore.finalDisplayedProducts" :sales="true" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: -0.3vh;
}

.products-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
  max-width: 1920px;
  padding: 20px;
}

.filter-toggle {
  display: none;
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.close-btn {
  display: none;
  margin: 10px auto;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
}

.filter {
  width: 13%;
  position: fixed;
  left: 2vw;
  top: 12vh;
  height: 69vh;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: width 0.3s ease-in-out;
  margin-top: 1.5vh;

  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

@media (max-width: 768px) {
  .products-container {
    flex-direction: column;
    align-items: center;
    margin-top: 10vh;
  }

  .filter-toggle {
    display: block;
    margin: 20px auto;
    width: auto;
    position: fixed;
    left: 0.3vh;
    top: 8.5vh;
    z-index: 3;
  }

  .filter {
    width: 70%;
    margin-bottom: 20px;
    display: none;
    padding-right: 6px;
    z-index: 2;
    border-radius: 15px;
    margin-left: -6px;
  }

  .close-btn {
    display: block;
    margin-top: 1vh;
    border: 0.5px solid black;
    margin-bottom: 2vh;
    border-radius: 10px;
  }

  .filter.open {
    display: block;
  }
}
</style>
