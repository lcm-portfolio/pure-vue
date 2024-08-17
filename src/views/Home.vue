<script setup lang="ts">
import { computed } from "vue";
import { useProducts } from "@/store/products";
import { Icon } from "@iconify/vue";
const productsStore = useProducts();
import ProductsList from "@/components/Products/ProductsList.vue";
import AddSaleButton from "@/components/Widgets/AddSaleButton.vue";

const productsOnSale = computed(() => {
  return productsStore.getProductsOnSale;
});
</script>

<template>

  <div class="banner"><h1>LEVEL UP WITH OUR LATEST DEALS</h1></div>
  <router-link to="/products" class="products-link">
    <button class="products-button">SHOP ALL PRODUCTS<Icon icon="ph:arrow-right-light" class="icon" /></button>
  </router-link>
  <AddSaleButton class="add-sale-btn" />

  <div class="products">
    <ProductsList :products="productsOnSale" />
  </div>
</template>

<style scoped>
.icon {
  padding-left: 0.2rem;
  padding-top: 0.3rem;
}


.products-button {
  position: absolute;
  top: 10rem;
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

.banner h1 {
  
  font-size: 2rem;
  color: rgb(0, 0, 0);
  letter-spacing: 0.5rem;
  text-align: center;
  
}

.product-image {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

img {
  object-position: top;
}

.banner {
  background-color: rgb(241, 241, 241);
  width: 100%;
  margin-bottom: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
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
  position: relative;
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

.product-discount {
  color: red;
  font-size: 2rem;
  padding-top: 1rem;
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
  color: black;
}

.add-to-cart-btn:hover {
  background-color: var(--secondary);
}

@media screen and (max-width: 768px) {
  .products-list {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    justify-content: center;
  }

  .products-list-item {
    width: 80%;
  }
  .products-button {
    position: static;
    border: none;
    border-radius: 15px;
    margin-bottom: 25px;
  }
  .add-sale-btn {
    position: static;
    border: none;
    border-radius: 15px;
    margin-bottom: 25px;
  }


}

@media screen and (max-width: 375px) {
  .products-list {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    justify-content: center;
  }

  .products-list-item {
    width: 90%;
  }
}
</style>
