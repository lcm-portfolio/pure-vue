<script setup lang="ts">
import RatingFilter from "./RatingFilter.vue";
import CategoryFilter from "./CategoryFilter.vue";
import PriceFilter from "./PriceFilter.vue";
import BrandFilter from "./BrandFilter.vue";
import { computed } from "vue";
import { useProducts } from "@/store/products";
import SortToggleBtn from "../Widgets/SortToggleBtn.vue";

const productsStore = useProducts();

const listCategories = computed(() => productsStore.getListCategories);
const listBrands = computed(() => productsStore.getListBrands);

const updateRatingFilter = (newRating: number) => {
  productsStore.setRatingFilter(newRating);
};

const updateCategoryFilter = (newCategory: string[]) => {
  if (newCategory.length === 0) {
    productsStore.setCategoryFilter(listCategories.value);
    return;
  }

  productsStore.setCategoryFilter(newCategory);
};

const updateBrandFilter = (newBrand: string[]) => {
  if (newBrand.length === 0) {
    productsStore.setBrandsFilter(listBrands.value);
    return;
  }
  productsStore.setBrandsFilter(newBrand);
};
const updatePriceUpFilter = (newPrice: number) => {
  productsStore.setPriceUpperFilter(newPrice);
};
const updatePriceDownFilter = (newPrice: number) => {
  productsStore.setPriceLowerFilter(newPrice);
};
</script>

<template>
  <div class="filters">
    <SortToggleBtn  /> 
    <RatingFilter @update:rating="updateRatingFilter" />
    <CategoryFilter @list-categories-selected="updateCategoryFilter" :list-categories="listCategories" />
    <PriceFilter
      @update-pricelower="updatePriceDownFilter"
      @update-priceupper="updatePriceUpFilter"
      :minimum="0"
      :maximum="100"
    />
    <BrandFilter @list-brands-selected="updateBrandFilter" :list-brands="listBrands" />
  </div>
</template>

<style scoped>
.filters {
  width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 100;
}

.ToggleBtn {
  margin-top: 4vh;
}
</style>
