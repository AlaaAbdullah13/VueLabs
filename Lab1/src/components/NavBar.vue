<script setup>
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

defineProps(['totalStock']);

onMounted(() => console.log("NavBar mounted"));
onUnmounted(() => console.log("NavBar unmounted"));
</script>

<template>
  <nav class="navbar bg-[#1a1a1a] text-white px-10 py-5 shadow-2xl sticky top-0 z-50">
    <div class="flex-1">
      <RouterLink to="/" class="text-2xl font-black tracking-tight hover:opacity-80 transition-opacity uppercase">
        SNEAKERHUB
      </RouterLink>
    </div>
    <div class="flex-none flex items-center gap-10">
      <div class="flex gap-8 items-center">
        <RouterLink to="/" class="text-xs font-bold tracking-[0.2em] hover:text-indigo-400 transition-colors uppercase">Home</RouterLink>
        <RouterLink to="/product/1" class="text-xs font-bold tracking-[0.2em] hover:text-indigo-400 transition-colors uppercase">Product</RouterLink>
        <RouterLink to="/about" class="text-xs font-bold tracking-[0.2em] hover:text-indigo-400 transition-colors uppercase">About</RouterLink>
      </div>

      <!-- Bonus: Live Total Stock Counter -->
      <div class="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-xl text-xs font-bold border border-indigo-600/30 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        Total Stock: {{ totalStock }}
      </div>

      <div class="relative cursor-pointer group ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 hover:text-violet-400 transition-colors">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="absolute -top-2 -right-2 bg-[#6366f1] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#1a1a1a]">0</span>
      </div>
    </div>
  </nav>
</template>