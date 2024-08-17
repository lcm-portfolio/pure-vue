<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import OrderHistory from "@/components/Profile/OrderHistory.vue";
import PaymentMethods from "@/components/Profile/PaymentMethods.vue";
import Address from "@/components/Profile/Address.vue";

const showOrderHistoryModal = ref(false);
const showPaymentMethods = ref(false);
const showAddressModal = ref(false);

const openOrderHistoryModal = () => {
  showOrderHistoryModal.value = true;
};
const closeOrderHistoryModal = () => {
  showOrderHistoryModal.value = false;
};

const openPaymentModal = () => {
  showPaymentMethods.value = true;
};
const closePaymentModal = () => {
  showPaymentMethods.value = false;
};

const openAddressModal = () => {
  showAddressModal.value = true;
};
const closeAddressModal = () => {
  showAddressModal.value = false;
};
</script>

<template>
  <div class="text">
    <h1>HELLO, USER!</h1>
    <h2>Welcome on your account!</h2>
  </div>
  <div class="containers">
    <div class="container">
      <div class="header">
        <div class="title">ORDER HISTORY</div>
        <p class="details">View all your orders</p>
        <Icon class="icon" icon="solar:history-line-duotone" width="60" height="60" />
      </div>
      <OrderHistory v-if="showOrderHistoryModal" @close-modal="closeOrderHistoryModal" />
      <div class="view" @click="openOrderHistoryModal">Your order ></div>
    </div>
    <div class="container">
      <div class="header">
        <div class="title">PAYMENT METHODS</div>
        <p class="details">View all your payment methods</p>
        <Icon class="icon" icon="fluent:payment-16-regular" width="60" height="60" />
      </div>
      <PaymentMethods v-if="showPaymentMethods" @close-modal="closePaymentModal" />
      <div class="view" @click="openPaymentModal">Your cards ></div>
    </div>
    <div class="container">
      <div class="header">
        <div class="title">ADDRESSES</div>
        <p class="details">View all your addresses</p>
        <Icon class="icon" icon="iconamoon:home-light" width="60" height="60" />
      </div>
      <Address v-if="showAddressModal" @close-modal="closeAddressModal" />
      <div class="view" @click="openAddressModal">Your addresses ></div>
    </div>
  </div>
</template>

<style scoped>
.text {
  position: absolute;
  left: 0;
  padding-top: 5rem;
  padding-left: 1.5rem;
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.338);
}

.containers {
  display: flex;
  justify-content: space-between;
}

.container {
  background-color: rgb(247, 248, 248);
  width: 500px;
  height: 300px;
  border-radius: 15px;
  cursor: pointer;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(117, 117, 117, 0.5);
  margin-left: 2rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
}

.view {
  margin-top: 10rem;
  font-size: 1.5rem;
}

.view:hover {
  color: var(--dark-primary);
}

.details {
  font-size: 1.2rem;
}

.icon {
  margin-left: 24rem;
  margin-top: -3.5rem;
  color: var(--dark-primary);
}

@media screen and (max-width: 375px) {
  .text {
    font-size: 1.2rem;
  }

  .containers {
    flex-direction: column;
    margin-top: 8rem;
  }

  .container {
    width: 100%;
    margin-left: 0;
    height: 100%;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .view {
    margin-top: 2rem;
    font-size: 1.2rem;
  }

  .details {
    font-size: 1.4rem;
  }

  .icon {
    margin-left: 0;
    margin-top: 0;
    padding-top: 0.5rem;
  }
}
</style>
