<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/Widgets/CustomInput.vue";

const billingInfo = ref({
  name: "",
  email: "",
  address: "",
});
</script>

<template>
  <div class="content-box">
    <h2>BILLING INFORMATION</h2>
    <div>
      <CustomInput label="NAME" placeholder="Full name" v-model="billingInfo.name" />
      <CustomInput label="EMAIL ADDRESS" placeholder="Email" v-model="billingInfo.email" />
      <CustomInput label="ADDRESS" placeholder="Address" v-model="billingInfo.address" />
    </div>
    <div>
      <button class="cart-btn">NEXT</button>
    </div>

    <div>
      <button class="close-modal">CLOSE</button>
    </div>
  </div>
</template>

<style scoped>
.content-box {
  background-color: var(--primary);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  height: 56vh;
  width: 500px;
  max-width: 90%;
  display: grid;
  gap: 1rem;
}

.close-modal {
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 1.3rem;
  cursor: pointer;
  background-color: white;
  padding-left: 3rem;
  padding-right: 3rem;
  color: black;
}

.close-modal:hover {
  background-color: var(--dark-primary);
}
</style>
