import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '../composables/useApi';

export const useProductStore = defineStore('product', () => {
  const { data: products, error, loading, getAll, update } = useApi('http://localhost:3000');

  const fetchProducts = async () => {
    await getAll('products');
  };

  const getProductById = (id) => {
    if (!products.value) return null;
    return products.value.find(p => p.id == id);
  };

  const decreaseStock = async (productId) => {
    const product = getProductById(productId);
    if (product && product.stock > 0) {
      const updatedProduct = { ...product, stock: product.stock - 1 };
      await update('products', productId, updatedProduct, true);

      if (!error.value) {
        const index = products.value.findIndex(p => p.id == productId);
        if (index !== -1) {
          products.value[index] = updatedProduct;
        }
      }
    }
  };

  const increaseStock = async (productId, qty = 1) => {
    const product = getProductById(productId);
    if (product) {
      const updatedProduct = { ...product, stock: product.stock + qty };
      await update('products', productId, updatedProduct, true);

      if (!error.value) {
        const index = products.value.findIndex(p => p.id == productId);
        if (index !== -1) {
          products.value[index] = updatedProduct;
        }
      }
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    decreaseStock,
    increaseStock
  };
});