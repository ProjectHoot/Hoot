<template>
  <v-timeline dense>
    <v-timeline-item
      v-for="reply in replies"
      :key="reply.id"
      :color="color"
      small
    >
      <v-row class="pt-1">
        <v-col class="elevation-1">
          <Reply :reply="reply">
            <Replies v-if="reply.replies.length > 0" :replies="reply.replies" :level="level + 1" />
          </Reply>
        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>
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
    color() {
      return colors[Math.min(colors.length - 1, this.level)];
    },
  },
};
</script>

<style scoped></style>
