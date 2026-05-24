<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => console.log("CarouselBanner mounted"));
onUnmounted(() => console.log("CarouselBanner unmounted"));

const banners = [
  "https://images.unsplash.com/photo-1552346154-21d32810aba3",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
];
</script>

<template>
  <div class="carousel w-full rounded-[40px] shadow-2xl h-[400px] mb-12">
    <div v-for="(img, index) in banners" :key="index" :id="'slide' + (index + 1)" class="carousel-item relative w-full">
      <img :src="img" class="w-full object-cover" alt="Banner" />
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a :href="'#slide' + (index === 0 ? banners.length : index)" class="btn btn-circle btn-ghost text-white">❮</a>
        <a :href="'#slide' + (index === banners.length - 1 ? 1 : index + 2)" class="btn btn-circle btn-ghost text-white">❯</a>
      </div>
    </div>
  </div>
</template>
