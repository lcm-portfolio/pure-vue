<script setup lang="ts">
import { ref } from "vue";

const selectedValue = ref(10);
const options = ref([
  { value: 10, label: "10 items per page" },
  { value: 25, label: "25 items per page" },
  { value: 40, label: "40 items per page" },
]);
const isOpen = ref(false);

const emit = defineEmits(["update:itemsPerPage"]);

const handleChange = (value: number) => {
  selectedValue.value = value;
  emit("update:itemsPerPage", value);
  isOpen.value = false;
};
</script>

<template>
  <div class="select-wrapper" @click="isOpen = !isOpen">
    <div class="selected-option">
      {{ selectedValue }} ITEMS PER PAGE
      <div class="arrow-down" :class="{ 'arrow-up': isOpen }"></div>
    </div>
    <div class="options" v-if="isOpen">
      <div class="option" v-for="option in options" :key="option.value" @click.stop="handleChange(option.value)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-wrapper {
  width: 175px;
  font-size: 1.1rem;
  background-color: #f5f5f5;
  color: black;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.options {
  background-color: #f5f5f5;
  width: 175px;
  text-align: center;
  border-radius: 10px;
  right: 76px;
  box-shadow: 0px 2px 4px rgba(224, 223, 223, 0.1);
  position: absolute;
}

.option {
  padding: 10px;
  cursor: pointer;
}

.option:hover {
  background-color: var(--primary);
  color: black;
}
.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
  display: inline-block;
  margin-left: 10px;
}
.arrow-up {
  transform: rotate(180deg);
}

@media screen and (max-width: 768px) {
  .select-wrapper {
    width: 65%;
    margin-top: -10.3vh;
    margin-left: 20.1vh;
    z-index: 1;
    width: 14rem;
  }

  .options {
    width: 59.5%;
    right: 9px;
  }

  .options:hover {
    background-color: var(--primary);
  }
}
</style>
