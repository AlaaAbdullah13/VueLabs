<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';

const cartStore = useCartStore();
const productStore = useProductStore();

// Bonus Task: Checkout Form
const name = ref('');
const address = ref('');
const orderPlaced = ref(false);

const isFormValid = computed(() => {
  return name.value.trim().length > 2 && address.value.trim().length > 5;
});

const handleCheckout = () => {
  if (isFormValid.value) {
    cartStore.clearCart();
    orderPlaced.value = true;
    // Reset form
    name.value = '';
    address.value = '';
    
    // Smooth reset message after 5 seconds
    setTimeout(() => {
      orderPlaced.value = false;
    }, 5000);
  }
};

onMounted(() => console.log("CartView mounted"));
onUnmounted(() => console.log("CartView unmounted"));
</script>

<template>
  <div class="max-w-6xl mx-auto p-12">
    <div class="flex items-center justify-between mb-12">
      <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">Your <span class="text-indigo-600">Shopping Cart</span></h1>
      <RouterLink to="/" class="text-indigo-600 font-bold hover:underline">← Back to Store</RouterLink>
    </div>

    <!-- Empty Cart State -->
    <div v-if="cartStore.items.length === 0 && !orderPlaced" class="bg-white border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.05)] rounded-[40px] p-20 text-center">
      <div class="text-6xl mb-6">🛒</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Wait, your cart is empty!</h2>
      <p class="text-gray-400 mb-8 max-w-sm mx-auto">Looks like you haven't added any premium kicks to your collection yet.</p>
      <RouterLink to="/" class="bg-[#6366f1] text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
        Browse Sneakers
      </RouterLink>
    </div>

    <!-- Success Message -->
    <div v-else-if="orderPlaced" class="bg-green-50 border border-green-100 rounded-[40px] p-20 text-center animate-in fade-in zoom-in duration-500">
      <div class="text-6xl mb-6">🤟</div>
      <h2 class="text-2xl font-bold text-green-900 mb-2">Order Confirmed!</h2>
      <p class="text-green-600 mb-8 max-w-sm mx-auto">Thank you for shopping with SneakerHub. Your order is now being processed by our specialists.</p>
      <RouterLink to="/" class="bg-green-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95">
        Back to Store
      </RouterLink>
    </div>

    <!-- Cart Layout -->
    <div v-else class="grid lg:grid-cols-3 gap-12">
      <!-- Items List -->
      <div class="lg:col-span-2 space-y-6">
        <div v-for="item in cartStore.items" :key="item.id" class="bg-white p-6 rounded-[30px] border border-gray-50 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
          <div class="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
            <img :src="item.image" class="w-full h-full object-contain group-hover:scale-110 transition-transform" />
          </div>
          <div class="flex-grow">
            <h3 class="font-bold text-gray-900">{{ item.name }}</h3>
            <div class="text-sm font-semibold text-indigo-600 mt-1">${{ item.price.toFixed(2) }}</div>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
               <button 
                @click="cartStore.decrementQty(item.id)" 
                class="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-indigo-600 font-bold border border-gray-100"
               >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
               </button>
               
               <div class="bg-indigo-50 px-4 py-1.5 rounded-xl font-black text-indigo-600 text-sm min-w-[45px] text-center">
                 {{ item.qty }}
               </div>

               <button 
                @click="cartStore.incrementQty(item.id)"
                :disabled="productStore.getProductById(item.id)?.stock <= 0"
                :class="['w-8 h-8 flex items-center justify-center rounded-xl transition-all font-bold border', 
                         productStore.getProductById(item.id)?.stock > 0 
                         ? 'bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-indigo-600 border-gray-100' 
                         : 'bg-gray-50 text-gray-200 border-gray-50 cursor-not-allowed opacity-50']"
               >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
               </button>
            </div>
            <div class="text-sm font-black text-gray-900 w-20 text-right">${{ (item.price * item.qty).toFixed(2) }}</div>
            <button @click="cartStore.removeFromCart(item.id)" class="text-red-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Order Summary & Checkout -->
      <div class="space-y-6">
        <div class="bg-white p-8 rounded-[40px] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.03)]">
          <h2 class="text-xl font-bold mb-6 text-gray-900">Summary</h2>
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-500 font-medium">
              <span>Items Total</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-500 font-medium">
              <span>Shipping</span>
              <span class="text-green-500">FREE</span>
            </div>
            <div class="h-px bg-gray-100 my-4"></div>
            <div class="flex justify-between text-2xl font-black text-gray-900 tracking-tighter">
              <span>TOTAL</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Bonus Form -->
          <form @submit.prevent="handleCheckout" class="space-y-4">
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input v-model="name" type="text" placeholder="John Doe" class="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" required />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Shipping Address</label>
              <input v-model="address" type="text" placeholder="123 Sneaker St, NYC" class="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" required />
            </div>
            <button 
              type="submit" 
              :disabled="!isFormValid"
              :class="['w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 mt-4',
                       isFormValid ? 'bg-[#6366f1] text-white hover:bg-indigo-600 shadow-indigo-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed']"
            >
              Confirm Order
            </button>
          </form>
        </div>
        <p class="text-center text-[10px] text-gray-400 font-medium px-8 italic">Authenticity guaranteed. Free returns within 30 days.</p>
      </div>
    </div>
  </div>
</template>