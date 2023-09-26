import { ref } from "vue";

export async function useFetch(url, options = {}) {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function reload() {
    try {
      loading.value = true;
      const res = await fetch(url, options);
      response.value = await res.json();
      console.log(response.value);
    } catch (error) {
      error.value = error;
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  reload();

  return {
    reload,
    response,
    error,
    loading,
  };
}
