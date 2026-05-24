<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useCartStore } from '../stores/cartStore';

const props = defineProps(['product']);
const cartStore = useCartStore();

onMounted(() => console.log("ProductDetails mounted"));
onUnmounted(() => console.log("ProductDetails unmounted"));
</script>

<template>
  <div class="bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-50 rounded-[40px] overflow-hidden">
    <div class="flex flex-col lg:flex-row p-8 lg:p-12 gap-12">
      <div class="lg:w-1/2 flex justify-center bg-gray-50 rounded-[30px] p-8">
        <img :src="product.image" :alt="product.name" class="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500" />
      </div>
      
      <div class="lg:w-1/2 flex flex-col justify-center space-y-6">
        <div v-if="product.badge" class="badge badge-lg bg-green-100 text-green-700 font-bold border-none px-4 py-3">{{ product.badge }}</div>
        
        <h1 class="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">{{ product.name }}</h1>
        <p class="text-gray-500 text-lg leading-relaxed">{{ product.description }}</p>
        
        <div class="flex items-center gap-4">
          <div class="text-4xl font-bold text-[#6366f1]">${{ (product.price - product.discount).toFixed(2) }}</div>
          <div v-if="product.discount > 0" class="text-xl text-gray-400 line-through">${{ product.price.toFixed(2) }}</div>
          <div v-if="product.discount > 0" class="badge bg-red-100 text-red-500 border-none font-bold">SALE -${{ product.discount }}</div>
        </div>

        <div class="flex flex-wrap gap-2 pt-2">
          <span v-for="tag in product.tags" :key="tag" class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">#{{ tag }}</span>
        </div>

        <div class="pt-6">
          <div v-if="product.stock > 0" class="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-green-500"></span> {{ product.stock }} items in stock
          </div>
          <div v-else class="text-sm font-bold text-red-500 mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Out of Stock
          </div>
          <div class="flex gap-4 pt-6">
            <button 
              @click.prevent="cartStore.addToCart(product)"
              :disabled="product.stock <= 0"
              :class="['flex-1 font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl',
                       product.stock > 0 ? 'bg-[#6366f1] text-white hover:bg-indigo-700 shadow-indigo-100 uppercase tracking-widest text-xs' : 'bg-gray-200 text-gray-500 cursor-not-allowed uppercase tracking-widest text-xs']"
            >
              {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            <button class="w-16 h-16 border-2 border-gray-100 flex items-center justify-center rounded-2xl hover:bg-gray-50 transition-colors">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>