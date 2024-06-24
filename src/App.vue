<template>
  <auth-layout v-if="!user">
    <router-view></router-view>
  </auth-layout>
  <admin-layout v-else>
    <router-view></router-view>
  </admin-layout>
</template>

<script setup>
import AuthLayout from "./components/layouts/AuthLayout.vue";
import AdminLayout from "./components/layouts/AdminLayout.vue";
import { ref } from "vue";
const user = ref(false);
</script>
