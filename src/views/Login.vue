<script setup lang="ts">
import LoginModal from "@/components/Authentification/LoginModal.vue";
import { signIn } from "@/shared/services/auth.service"
import { router } from "@/router";

const login = (state: any) => {
  const result = signIn(state);
  console.log(state);
    result.then((res) => {
        console.log(res);
        router.push({ name: "Home" });
    });

};
</script>

<template>
  <LoginModal @sign-in="login" />
</template>

<style scoped></style>
