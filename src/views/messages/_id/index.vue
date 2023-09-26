<template>
  <div class="flex flex-col h-full">
    <div class="p-5 border-b border-neutral-800 text-neutral-50 text-lg">
      Cier
    </div>
    <div class="grow flex flex-col-reverse gap-5 p-5">
      <div
        class="self-start max-w-[50%] min-w-[5%]"
        :class="{ 'self-end': message.user_id == user.id }"
        v-for="(message, index) in messages"
        :key="index"
      >
        <div
          class="p-2 bg-neutral-500 rounded-md rounded-ee-none text-neutral-50"
        >
          {{ message.message }}
        </div>
        <p class="mt-1 text-sm text-neutral-500">9:52pm</p>
      </div>
    </div>
    <div class="p-5">
      <input
        v-model="message"
        placeholder="Write a reply"
        class="w-full p-2 px-5 outline-none rounded-full bg-neutral-800 text-neutral-50 caret-neutral-50"
        @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    // From pinia
    const user = reactive({
      id: 1,
    });
    const recipient = reactive({
      id: 2,
    });

    const messages = reactive([]);
    const message = ref("");

    function sendMessage() {
      messages.unshift({
        user_id: user.id,
        message: message.value,
      });
      message.value = "";
      // Temporary
      sendRecipientMessage();
    }
    function sendRecipientMessage() {
      setTimeout(() => {
        messages.unshift({
          user_id: recipient.id,
          message: "HAHAHAHA",
        });
      }, 1000);
    }

    return {
      user,
      message,
      messages,
      sendMessage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
