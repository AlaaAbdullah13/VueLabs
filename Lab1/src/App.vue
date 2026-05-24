<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

const products = ref([
  {
    id: 1,
    name: "Cozy Sneakers",
    description: "High-quality sneakers that go with everything you wear.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    badge: "NEW",
    price: 120,
    discount: 20,
    stock: 10,
    tags: ["Fashion", "Casual", "Sport"]
  },
  {
    id: 2,
    name: "Running Shoes",
    description: "Built for speed and comfort on any terrain.",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    badge: "",
    price: 90,
    discount: 10,
    stock: 5,
    tags: ["Sport", "Running"]
  },
  {
    id: 3,
    name: "Casual Boots",
    description: "Rugged boots for everyday adventures.",
    image: "https://images.pexels.com/photos/30229923/pexels-photo-30229923.jpeg",
    badge: "SALE",
    price: 150,
    discount: 0,
    stock: 8,
    tags: ["Casual", "Winter"]
  },
  {
    id: 4,
    name: "Flip Flops",
    description: "Light and breezy for sunny days.",
    image: "https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg",
    badge: "",
    price: 30,
    discount: 50,
    stock: 20,
    tags: ["Summer", "Casual"]
  }
]);

const totalStock = computed(() => products.value.reduce((acc, p) => acc + p.stock, 0));

const handleBuy = (id) => {
  const p = products.value.find(x => x.id === id);
  if(p && p.stock > 0) {
    p.stock--;
    console.log(`Purchase successful! ${p.name} stock: ${p.stock}`);
  }
};

onMounted(() => console.log("App.vue mounted"));
onUnmounted(() => console.log("App.vue unmounted"));
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <NavBar :totalStock="totalStock" />
    <main class="flex-grow">
      <RouterView :products="products" @buy="handleBuy" />
    </main>
    <Footer />
  </div>
</template>