<template>
  <div
    class="flex flex-col gap-2 p-5 w-96 border-r border-neutral-800 bg-neutral-900"
  >
    <div class="flex justify-between mb-3">
      <p class="text-2xl text-neutral-50 font-medium">Chats</p>
      <!-- <button>ADD</button> -->
    </div>
    <input
      placeholder="Search"
      class="w-full p-2 px-5 outline-none rounded-full bg-neutral-800 text-neutral-50 caret-neutral-50"
    />
    <div class="flex-grow overflow-auto">
      <div class="text-neutral-50" v-if="loading">Loading...</div>
      <ul class="list-none" v-else>
        <li
          class="flex flex-col cursor-pointer"
          @click="openConversation(conversation)"
          v-for="(conversation, index) in conversations"
          :key="index"
        >
          <div class="p-5 rounded-md hover:bg-neutral-800">
            <p class="text-neutral-50">{{ conversation.recipient.name }}</p>
            <p class="text-sm text-neutral-500">
              {{ conversation.latestMessage.message }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
// import { useFetch } from "../composables/useFetch";

export default {
  setup() {
    const router = useRouter();

    const loading = ref(false);
    let conversations = reactive([]);

    // Can be moved to a service class (e.g. conversationService.list())
    async function fetchConversations() {
      try {
        loading.value = true;
        const response = await fetch(
          "https://randomuser.me/api/?results=5"
        ).then((response) => response.json());
        conversations.push(
          ...(response ? response.results : []).map((v) => ({
            recipient: {
              id: v.login.username,
              name: `${v.name.first} ${v.name.last}`,
            },
            latestMessage: {
              message: v.login.uuid,
            },
          }))
        );
      } catch (error) {
        error.value = error;
        console.log(error);
      } finally {
        loading.value = false;
      }
    }
    fetchConversations();
    // const { response, loading } = useFetch("https://randomuser.me/api/");
    // watchEffect(() => {
    //   console.log("res", response);
    //   // Mimic expected conversation response
    //   conversations = reactive(
    //     (response?.value || []).map((v) => ({
    //       recipient: {
    //         name: `${v.name.first} ${v.name.last}`,
    //       },
    //       latestMessage: {
    //         message: v.login.uuid,
    //       },
    //     }))
    //   );
    // });

    function openConversation(conversation) {
      router.push({
        path: `/messages/${conversation.recipient.id}`,
      });
    }

    return {
      loading,
      conversations,
      openConversation,
    };
  },
};
</script>
