import { ref } from 'vue';

export function useApi(baseUrl) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const getAll = async (endpoint) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getOne = async (endpoint, id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/${endpoint}/${id}`);
      if (!response.ok) throw new Error('Resource not found');
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const update = async (endpoint, id, payload, quiet = false) => {
    if (!quiet) loading.value = true;
    try {
      const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to update');
    } catch (err) {
      error.value = err.message;
    } finally {
      if (!quiet) loading.value = false;
    }
  };

  return { data, error, loading, getAll, getOne, update };
}