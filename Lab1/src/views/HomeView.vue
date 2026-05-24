<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useProductStore } from '../stores/productStore'; 
import { useCartStore } from '../stores/cartStore';
import ProductCard from '../components/ProductCard.vue';
import CarouselBanner from '../components/CarouselBanner.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const selected = ref(null);

onMounted(async () => {
  await productStore.fetchProducts();
  if (productStore.products && productStore.products.length > 0) {
    selected.value = productStore.products[0];
  }
  console.log("HomeView mounted");
});

onUnmounted(() => console.log("HomeView unmounted"));
</script>

<template>
  <div class="max-w-6xl mx-auto p-12 space-y-12">
    <!-- Loading State (Only if products are empty) -->
    <div v-if="(!productStore.products || productStore.products.length === 0)" class="flex flex-col items-center justify-center py-32 space-y-4">
      <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-gray-400 font-medium animate-pulse">Loading amazing sneakers...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="productStore.error" class="bg-red-50 border border-red-100 p-8 rounded-[30px] text-center">
      <div class="text-4xl mb-4">⚠️</div>
      <h3 class="text-red-900 font-bold text-xl mb-2">Oops! Something went wrong</h3>
      <p class="text-red-600 mb-6">{{ productStore.error }}</p>
      <button @click="productStore.fetchProducts" class="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
        Try Again
      </button>
    </div>

    <template v-else-if="selected">
      <CarouselBanner />

      <!-- Featured Product -->
      <div class="group relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 rounded-[40px] mb-16 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
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
              <button 
                @click="cartStore.addToCart(selected)" 
                :disabled="selected.stock <= 0" 
                :class="['bg-[#6366f1] text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg active:scale-95', 
                         selected.stock > 0 ? 'hover:bg-indigo-600 shadow-indigo-100' : 'opacity-50 cursor-not-allowed']"
              >
                {{ selected.stock > 0 ? 'Buy Now' : 'Out of Stock' }}
              </button>
              <RouterLink :to="'/product/' + selected.id" class="border-2 border-[#6366f1] text-[#6366f1] hover:bg-indigo-50 font-bold py-3 px-10 rounded-xl transition-all active:scale-95 flex items-center justify-center">
                View
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ProductCard 
          v-for="p in productStore.products.filter(x => x.id !== selected.id)" 
          :key="p.id" 
          :product="p"
        />
      </div>
    </template>
  </div>
</template>