import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useLocalStorage } from '../composables/useLocalStorage';
import { useProductStore } from './productStore';

export const useCartStore = defineStore('cart', () => {
  const productStore = useProductStore();
  const items = useLocalStorage('cart', []);

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.qty), 0);
  });

  const addToCart = (product) => {
    if (product.stock <= 0) return;

    const existing = items.value.find(item => item.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }

    productStore.decreaseStock(product.id);
  };

  const incrementQty = (productId) => {
    const item = items.value.find(i => i.id == productId);
    if (item) {
      const product = productStore.getProductById(productId);
      if (product && product.stock > 0) {
        item.qty++;
        productStore.decreaseStock(productId);
      }
    }
  };
  
const removeFromCart = (id) => {
    const index = items.value.findIndex(item => item.id == id);
    if (index !== -1) {
      const item = items.value[index];
      productStore.increaseStock(id, item.qty);
      items.value.splice(index, 1);
    }
  };

  const decrementQty = (productId) => {
    const item = items.value.find(i => i.id == productId);
    if (!item) return;

    if (item.qty > 1) {
      item.qty--;
      productStore.increaseStock(productId, 1);
    } else {
      removeFromCart(productId);
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    incrementQty,
    decrementQty,
    removeFromCart,
    clearCart
  };
});