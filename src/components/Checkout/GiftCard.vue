<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/Widgets/CustomInput.vue";

const emit = defineEmits(["close-modal"]);

const giftCard = ref({
  cardNumber: "",
  pin: "",
});

const closeModal = () => {
  emit("close-modal");
};
</script>

<template>
  <teleport to="body">
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>GIFT CARD</h2>
          <button @click="closeModal" class="close-modal">&times;</button>
        </div>
        <div class="modal-content">
          <CustomInput label="Gift Card Number" placeholder="XXXX-XXXX-XX" v-model="giftCard.cardNumber" />
          <CustomInput label="PIN" placeholder="XXX" v-model="giftCard.pin" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 90%;
  width: 500px;
}

.modal-header {
  background-color: var(--secondary);
  color: white;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.7rem;
  margin: 0;
}

.close-modal {
  border: none;
  border-radius: 15px;
  font-size: 2rem;
  cursor: pointer;
  background-color: var(--dark-primary);
  padding-left: 3rem;
  padding-right: 3rem;
  color: white;
  margin-left: 1rem;
}

.close-modal:hover {
  background-color: var(--dark-primary);
}

.modal-content {
  padding: 50px;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}
</style>
