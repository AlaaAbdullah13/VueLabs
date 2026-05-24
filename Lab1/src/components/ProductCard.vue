<script setup>
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

defineProps(['product']);
defineEmits(['buy', 'view']);

onMounted(() => console.log("ProductCard mounted"));
onUnmounted(() => console.log("ProductCard unmounted"));
</script>

<template>
  <RouterLink :to="'/product/' + product.id" class="group relative bg-white shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-gray-50 rounded-[30px] p-6 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer block">
    <!-- Stock Badge -->
    <div class="absolute top-4 right-4 bg-[#e7f6ed] text-[#34a853] text-[10px] font-bold px-3 py-1 rounded-full uppercase transition-transform duration-300 group-hover:scale-110">
      Stock: {{ product.stock }}
    </div>
    
    <div class="h-48 mb-6 flex justify-center items-center transition-transform duration-500 group-hover:scale-110">
      <img :src="product.image" class="max-h-full max-w-full object-contain" :alt="product.name" />
    </div>
    
    <div class="text-center">
      <h3 class="font-bold text-xl text-gray-800 mb-6 transition-colors duration-300 group-hover:text-indigo-600">{{ product.name }}</h3>
      <div class="flex gap-2">
        <button @click="$emit('view')" class="flex-1 border-2 border-[#6366f1] text-[#6366f1] font-bold py-2 rounded-xl text-sm hover:bg-indigo-50 transition-all active:scale-95">
          View
        </button>
        <button @click.prevent="$emit('buy')" class="flex-1 bg-[#6366f1] text-white font-bold py-2 rounded-xl text-sm hover:bg-indigo-600 transition-all active:scale-95 shadow-md hover:shadow-indigo-200">
          Buy
        </button>
      </div>
    </div>
  </RouterLink>
</template>