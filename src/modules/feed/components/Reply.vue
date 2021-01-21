<template>
  <div class="mb-2">
    <v-card :elevation="0" :class="{ 'border-bottom': borderBottom }">
      <v-card-subtitle>
        {{ reply.author.username }} -
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ createdFormatted }}</span>
          </template>

          <span>{{ reply.created }}</span>
        </v-tooltip>
      </v-card-subtitle>
      <v-card-text v-html="reply.content_html" />
    </v-card>
    <slot></slot>
  </div>
</template>

<script>
import FormatDistance from "date-fns/formatDistance";
import Reply from "../models/reply";

export default {
  name: "Reply",
  props: {
    reply: {
      type: Reply,
      required: true,
    },
  },

  computed: {
    /** @returns {string} */
    createdFormatted() {
      return FormatDistance(this.reply.created, new Date());
    },

    /** @returns {boolean} */
    borderBottom() {
      return this.reply.replies.length > 0;
    }
  },
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #80808063;
}
</style>
