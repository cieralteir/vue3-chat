<template>
  <div class="flex h-full">
    <TheSidebar />
    <div class="flex-grow bg-neutral-900">
      <RouterView />
    </div>
  </div>
</template>

<script>
import TheSidebar from "@/components/TheSidebar.vue";

export default {
  setup() {
    return {};
  },
  components: {
    TheSidebar,
  },
};
</script>
