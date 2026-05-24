<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import ProductDetails from '../components/ProductDetails.vue';

const props = defineProps(['products']);
const emit = defineEmits(['buy']);
const route = useRoute();

const product = computed(() => props.products.find(p => p.id == route.params.id));
const related = computed(() => props.products.filter(p => p.id != route.params.id));

watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log(`ProductView updated for ID: ${route.params.id}`);
});

onMounted(() => {
  console.log(`ProductView mounted for ID: ${route.params.id}`);
});
onUnmounted(() => console.log("ProductView unmounted"));
</script>

<template>
  <div v-if="product" class="max-w-6xl mx-auto p-12">
    <!-- Breadcrumb (Optional but nice) -->
    <div class="text-sm breadcrumbs mb-8">
      <ul>
        <li><RouterLink to="/" class="text-indigo-600">Home</RouterLink></li> 
        <li><span class="text-gray-400">Products</span></li> 
        <li class="font-bold">{{ product.name }}</li>
      </ul>
    </div>

    <!-- Product Details Section -->
    <ProductDetails :product="product" @buy="id => $emit('buy', id)" />

    <!-- Related Products -->
    <div class="mt-24">
      <h2 class="text-3xl font-bold mb-10 text-gray-900 border-l-4 border-indigo-600 pl-4">Related Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ProductCard v-for="p in related" :key="p.id" :product="p" @buy="id => $emit('buy', id)" />
      </div>
    </div>
  </div>
</template>