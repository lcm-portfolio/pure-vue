<script setup lang="ts">
import { ref } from "vue";

const showModal = ref(false);
const emit = defineEmits(["close-modal"]);

const openModal = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  emit("close-modal");
};
</script>

<template>
  <teleport to="body">
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <button @click="closeModal" class="close-modal">&times;</button>
        </div>
        <div class="modal-content">
          <ul>
            <li>Order 1</li>
            <li>Order 2</li>
            <li>Cancelled Order</li>
            <li>Order 4</li>
          </ul>
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

ul {
  list-style-type: none;
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
