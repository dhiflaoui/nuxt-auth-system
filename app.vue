<template>
  <div>
    <header class="p-4 bg-gray-100">
      {{ authStore.isAuthenticated }}
      <nav v-if="authStore.isAuthenticated">
        <button @click="authStore.logout">Logout</button>
      </nav>
      <nav v-else class="flex gap-4">
        <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600">
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="text-blue-500 hover:text-blue-600">
          Sign Up
        </NuxtLink>
      </nav>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

// Check authentication status on app mount
onMounted(() => {
  authStore.checkAuth();
});
</script>
