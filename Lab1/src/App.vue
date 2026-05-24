<script setup>
import { onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

onMounted(() => console.log("App.vue mounted"));
onUnmounted(() => console.log("App.vue unmounted"));
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <NavBar />
    
    <main class="flex-grow">
      <RouterView />
    </main>
    
    <Footer />
  </div>
</template>