<script setup lang='ts'> 
import RegisterModal from '@/components/Authentification/RegisterModal.vue'
import { router } from '@/router';
import { createUser } from '@/shared/services'

const SignUp = (state: any) => {
  const result = createUser(state)

  result.then(() => {
    router.push({ name: 'Login' })
  })
}

</script>

<template>

<RegisterModal @register="SignUp" />

</template>

<style scoped>

</style>