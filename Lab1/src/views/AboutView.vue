<template>
  <div class="max-w-4xl mx-auto px-6 py-16">
    <div class="text-center mb-16">
      <h1 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter italic">About <span class="text-indigo-600">SneakerHub</span></h1>
      <p class="text-xl text-gray-400 font-medium">Elevating footwear culture since 2024</p>
    </div>

    <div class="bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-50 rounded-[40px] p-12 mb-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-900 tracking-tight">Our Story</h2>
          <p class="text-gray-500 leading-relaxed text-lg mb-6">
            SneakerHub started with a simple vision: to create a curated space where enthusiasts could find the most sought-after drops without the noise. We began as a small boutique and have grown into a global destination for premium footwear.
          </p>
          <p class="text-gray-500 leading-relaxed text-lg">
            Our team of specialists hand-verifies every pair, ensuring that when you shop with us, you're getting 100% authentic, high-performance gear that defines your personal style.
          </p>
        </div>
        <div class="relative group">
          <div class="absolute inset-0 bg-indigo-600 rounded-[30px] rotate-3 group-hover:rotate-6 transition-transform"></div>
          <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3" class="relative rounded-[30px] shadow-2xl w-full h-80 object-cover" alt="Sneaker Store" />
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-white shadow-lg shadow-gray-100 rounded-[30px] p-8 text-center border border-gray-50 transition-all hover:-translate-y-2">
        <div class="text-4xl mb-4">👟</div>
        <h3 class="font-bold text-lg">Curated Selection</h3>
        <p class="text-sm text-gray-400 mt-2 font-medium">Only the best drops globally</p>
      </div>
      <div class="bg-white shadow-lg shadow-gray-100 rounded-[30px] p-8 text-center border border-gray-50 transition-all hover:-translate-y-2">
        <div class="text-4xl mb-4">🛡️</div>
        <h3 class="font-bold text-lg">100% Authentic</h3>
        <p class="text-sm text-gray-400 mt-2 font-medium">Verified by our specialists</p>
      </div>
      <div class="bg-white shadow-lg shadow-gray-100 rounded-[30px] p-8 text-center border border-gray-50 transition-all hover:-translate-y-2">
        <div class="text-4xl mb-4">🌍</div>
        <h3 class="font-bold text-lg">Global Reach</h3>
        <p class="text-sm text-gray-400 mt-2 font-medium">Shipping to over 50 countries</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => console.log("AboutView mounted"));
onUnmounted(() => console.log("AboutView unmounted"));
</script>