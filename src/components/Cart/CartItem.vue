<script setup lang="ts">
import { computed, ref } from "vue";
import { ProductInterface } from "../../interfaces/index.ts";
import { useCart } from "@/store/cart";
import { Icon } from "@iconify/vue";
import SalesRibbon from "../Widgets/SalesRibbon.vue";
import { useProducts } from "@/store/products";
const productsStore = useProducts();

const cartStore = useCart();

const props = defineProps({
  product: {
    type: Object as () => ProductInterface,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const quantity = computed(() => {
  return props.quantity;
});

const total = computed(() => {
  return productsStore.getDiscountedPrice(props.product.id) * quantity.value;
});

const removeProduct = () => {
  cartStore.removeProduct(props.product.id);
};

const addProduct = () => {
  cartStore.addProduct(props.product.id);
};

const subtractProduct = () => {
  cartStore.subtractProduct(props.product.id);
};
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="product.image_link" alt="product.name" />
    </div>
    <div class="cart-item__info">
      <h3 class="cart-item__name">{{ product.name }}</h3>
      <SalesRibbon
        class="sales-ribbon"
        v-if="product.discount"
        :discount="product.discount"
        :discountEndDate="product.discount.discountEndDate.toString()"
      />
      <p class="cart-item__price">
        <span class="old-price" v-if="product.discount">{{ product.price.toFixed(2) }}$<br /></span
        >{{ productsStore.getDiscountedPrice(product.id).toFixed(2) }} $
      </p>
      <div class="cart-item__quantity">
        QUANTITY : <button class="cart-item__subtract" @click="subtractProduct">-</button> {{ quantity }}
        <button class="cart-item__add" @click="addProduct">+</button>
      </div>
      <p class="cart-item__total">TOTAL : {{ total.toFixed(2) }}$</p>
      <button class="cart-item__remove" @click="removeProduct">
        <Icon icon="ph:trash-thin" color="black" width="32" height="32" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.old-price {
  text-decoration: line-through;
  color: red;
}
.cart-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.sales-ribbon {
  color: red;
  position: relative;
  background-color: transparent;
  justify-self: flex-end;
  grid-area: discount;
}

.cart-item__image img {
  width: 110px;
  height: 110px;
  border-radius: 15px;
}

.cart-item__info {
  margin-left: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "name remove"
    "price price"
    "quantity discount"
    "total discount";
  grid-gap: 5px;
}

.cart-item__name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
  grid-area: name;
}

.cart-item__price {
  font-size: 1.2rem;
  margin-bottom: 5px;
  grid-area: price;
}

.cart-item__quantity {
  font-size: 1.2rem;
  margin-bottom: 5px;
  grid-area: quantity;
}

.cart-item__total {
  font-size: 1.2rem;
  margin-bottom: 5px;
  grid-area: total;
}

.cart-item__remove {
  grid-area: remove;
  justify-self: end;
  align-self: start;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
  color: var(--font-primary);
  grid-area: remove;
  font-size: 1rem;
}

.cart-item__add {
  padding-right: 1rem;
  padding-left: 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
  color: var(--font-primary);
  margin-right: 5px;
  grid-area: add;
  font-size: 1.5rem;
}
.cart-item__subtract {
  padding-left: 1rem;
  padding-right: 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
  color: var(--font-primary);
  margin-right: 5px;
  grid-area: subtract;
  font-size: 1.5rem;
}

.cart-item__add:hover,
.cart-item__subtract:hover {
  background-color: var(--dark-primary);
}

.cart-item__remove:hover {
  background-color: var(--dark-primary);
  border-radius: 15px;
}

@media screen and (max-width: 1100px) {
 .sales-ribbon{
  position: absolute;
  transform: rotate(-45deg);



 }
 .cart-item__info {
   
   grid-template-areas:
     "name remove"
     "price price"
     "quantity quantity"
     "total total";
  
 }
}
</style>
