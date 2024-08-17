<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/Widgets/CustomInput.vue";

const creditCard = ref({
  cardNumber: "",
  expirationDate: "",
  CVV: "",
});

// Fonction pour la gestion du bouton NEXT si nécessaire
const next = () => {
  // Implémentez la logique pour le bouton NEXT ici, si nécessaire.
};

// Fonction pour la gestion du bouton CLOSE si nécessaire
const closeModal = () => {
  // Implémentez la logique pour le bouton CLOSE ici, si nécessaire.
};
</script>

<template>
  <div class="content-box">
    <h2>CREDIT CARD INFORMATION</h2>
    <div>
      <CustomInput label="CARD NUMBER" placeholder="XXXX-XXXX-XXXX-XXXX" v-model="creditCard.cardNumber" />
      <CustomInput label="EXPIRY DATE" placeholder="MM/YY" v-model="creditCard.expirationDate" />
      <CustomInput label="CVV" placeholder="XXX" v-model="creditCard.CVV" />
    </div>
    <div>
      <button class="cart-btn" @click="next">NEXT</button>
    </div>
    <div>
      <button class="close-modal" @click="closeModal">CLOSE</button>
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
