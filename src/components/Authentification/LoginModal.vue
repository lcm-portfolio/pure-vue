<script setup lang="ts">
import CustomInput from "@/components/Widgets/CustomInput.vue";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
const emit = defineEmits(["signIn"]);

const state = reactive({
  email: "",
  password: "",
});

const signIn = () => {
  emit("signIn", state);
};
</script>

<template>
  <div class="form-container">
    <h1>Login</h1>
    <CustomInput
      class="input"
      label="Email"
      type="email"
      placeholder="Enter your email"
      name="email"
      id="email"
      required
      autocomplete="email"
      min-length="5"
      v-model="state.email"
    />

    <CustomInput
      class="input"
      label="Password"
      type="password"
      placeholder="Enter your password"
      name="password"
      id="password"
      required
      autocomplete="new-password"
      min-length="8"
      v-model="state.password"
    />
    <button @click="signIn">Login</button>
    <RouterLink class="link" to="/register"> Don't have an account? Register </RouterLink>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 0.5rem;
}
.form-container .input {
  width: 80%;
}

.form-container h1 {
  margin-bottom: 1rem;
}

.form-container button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--primary);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  margin: 1rem auto;
}

.form-container button:hover {
  background-color: var(--dark-primary);
}
.link {
  text-align: end;
  color: var(--primary);
  font-weight: bold;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
