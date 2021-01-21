<template>
  <div id="reply" :class="{ uneven }">
    <Reply
      v-for="reply in replies"
      :key="reply.id"
      :reply="reply"
      :level="level"
    >
      <Replies
        v-if="reply.replies.length > 0"
        :replies="reply.replies"
        :level="level + 1"
        class="pl-5"
      />
    </Reply>
  </div>
</template>

<script>
import Reply from "./Reply";

const colors = ["red", "blue", "purple", "green", "orange"];

export default {
  name: "Replies",
  components: { Reply },
  props: {
    replies: {
      type: Array,
      required: true,
    },

    level: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    /** @returns {string} */
    color() {
      return colors[Math.min(colors.length - 1, this.level)];
    },

    /** @returns {boolean} */
    uneven() {
      return this.level % 2 !== 0;
    },
  },
};
</script>
