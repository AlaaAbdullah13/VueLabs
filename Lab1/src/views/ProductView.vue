<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/ProductCard.vue';
import ProductDetails from '../components/ProductDetails.vue';

const route = useRoute();
const productStore = useProductStore();

const product = computed(() => productStore.getProductById(route.params.id));
const related = computed(() => {
  if (!productStore.products) return [];
  return productStore.products.filter(p => p.id != route.params.id).slice(0, 3);
});

watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log(`ProductView updated for ID: ${route.params.id}`);
});

onMounted(async () => {
  if (!productStore.products || productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
  console.log(`ProductView mounted for ID: ${route.params.id}`);
});
onUnmounted(() => console.log("ProductView unmounted"));
</script>

<template>
  <div class="max-w-6xl mx-auto p-12 space-y-12">
    <div v-if="(!productStore.products || productStore.products.length === 0) || (productStore.loading && !product)" class="flex flex-col items-center justify-center py-32 space-y-4">
      <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-gray-400 font-medium animate-pulse">Initializing SneakerHub...</p>
    </div>

    <div v-else-if="productStore.error" class="bg-red-50 border border-red-100 p-8 rounded-[30px] text-center">
      <div class="text-4xl mb-4">⚠️</div>
      <h3 class="text-red-900 font-bold text-xl mb-2">Oops! Something went wrong</h3>
      <p class="text-red-600 mb-6">{{ productStore.error }}</p>
      <button @click="productStore.fetchProducts" class="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
        Try Again
      </button>
    </div>

    <template v-else-if="product">
      <div class="text-sm breadcrumbs mb-8">
        <ul>
          <li><RouterLink to="/" class="text-indigo-600 uppercase font-bold tracking-widest text-[10px]">Home</RouterLink></li> 
          <li><span class="text-gray-400 uppercase font-bold tracking-widest text-[10px]">Products</span></li> 
          <li class="font-bold text-gray-900 uppercase tracking-widest text-[10px]">{{ product.name }}</li>
        </ul>
      </div>

      <ProductDetails :product="product" />

      <div class="mt-24">
        <h2 class="text-3xl font-bold mb-10 text-gray-900 border-l-4 border-indigo-600 pl-4">Related Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </template>
  </div>
</template>