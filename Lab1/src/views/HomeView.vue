<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import CarouselBanner from '../components/CarouselBanner.vue';

const props = defineProps(['products']);
const emit = defineEmits(['buy']);
const selected = ref(props.products[0]);

onMounted(() => {
  console.log(`HomeView mounted — ${props.products.length} products loaded`);
});
onUnmounted(() => console.log("HomeView unmounted"));
</script>

<template>
  <div class="max-w-6xl mx-auto p-12">
    <!-- Carousel Banner -->
    <CarouselBanner />

    <!-- Featured Product Card -->
    <div class="group relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 rounded-[40px] mb-16 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      <!-- Stock Badge -->
      <div class="absolute top-8 right-8 bg-[#e7f6ed] text-[#34a853] text-xs font-bold px-4 py-2 rounded-full uppercase z-10 transition-transform duration-300 group-hover:scale-110">
        Stock: {{ selected.stock }}
      </div>
      <div class="flex flex-col lg:flex-row items-center p-8 lg:p-12 gap-8">
        <div class="lg:w-1/2 flex justify-center transition-transform duration-500 group-hover:scale-105">
          <img :src="selected.image" class="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl" :alt="selected.name"/>
        </div>
        <div class="lg:w-1/2 space-y-6">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">{{ selected.name }}</h2>
          <p class="text-gray-500 text-lg leading-relaxed">{{ selected.description }}</p>
          <div class="text-3xl font-bold text-[#6366f1]">${{ selected.price.toFixed(2) }}</div>
          <div class="flex gap-4 pt-4">
            <button @click="$emit('buy', selected.id)" class="bg-[#6366f1] hover:bg-indigo-600 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-indigo-100 active:scale-95">
              Buy Now
            </button>
            <RouterLink :to="'/product/' + selected.id" class="border-2 border-[#6366f1] text-[#6366f1] hover:bg-indigo-50 font-bold py-3 px-10 rounded-xl transition-all active:scale-95 flex items-center justify-center">
              View
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Grid (Excluding Featured) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <ProductCard v-for="p in products.filter(x => x.id !== selected.id)" :key="p.id" :product="p" @view="selected = p" @buy="$emit('buy', p.id)" />
    </div>
  </div>
</template>