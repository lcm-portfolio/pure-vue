<script setup lang="ts">
import { toRefs } from "vue";
import type { Discount } from "@/interfaces";
import useCountdown from "@/composables/useCountdown";
import { useProducts } from "@/store/products";
const productsStore = useProducts();
const props = defineProps({
  discount: {
    type: Object as () => Discount,
    required: true,
  },
  discountEndDate: {
    type: String,
    required: true,
  },
});

const handleCountdownEnd = () => {

  productsStore.countdownEnded(discount.value.productId);
  
};

const { discount, discountEndDate } = toRefs(props);
const { days, hours, minutes, seconds, timeRemaining } = useCountdown(discountEndDate.value,handleCountdownEnd);
</script>

<template>
  <div v-if="discount && timeRemaining > 0" class="sales-ribbon">
    <div class="title">SALE</div>
    <div class="discount">{{ discount.discountPercentage }}% OFF</div>
    <div class="timer">END IN : {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s</div>
  </div>
</template>

<style scoped>
.sales-ribbon {
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 0, 0, 0.374);
  color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  border-radius: 10px;
}

.title, .discount {
  font-size: 1.2rem;
  color: red;
  letter-spacing: 0.2rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.discount,
.timer {
  padding: 2px;
}
</style>
