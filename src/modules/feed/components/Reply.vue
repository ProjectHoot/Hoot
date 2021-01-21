<template>
  <div class="mb-2">
    <v-card :elevation="0" :class="{ 'border-bottom': borderBottom }">
      <v-card-subtitle>
        <v-chip label>
          {{ reply.author.username }}
          <v-icon right> mdi-label mdi-rotate-180 </v-icon>
        </v-chip>

        {{ reply.score }} points -
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ createdFormatted }} ago</span>
          </template>

          <span>{{ reply.created }}</span>
        </v-tooltip>
      </v-card-subtitle>

      <v-card-text v-html="reply.content_html" />

      <v-card-actions>
        <v-btn icon @click="upvote">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>

        <v-btn icon @click="downvote">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>

        <v-btn icon @click="replyTo">
          <v-icon>mdi-reply</v-icon>
        </v-btn>
      </v-card-actions>

      <VueEasyMde v-if="replying" v-model="myReply" />
    </v-card>
    <slot></slot>
  </div>
</template>

<script>
import FormatDistance from "date-fns/formatDistance";
import Reply from "../models/reply";
import VueEasyMde from "vue-easymde";
import { mapState } from "vuex";

export default {
  name: "Reply",
  components: { VueEasyMde },
  props: {
    reply: {
      type: Reply,
      required: true,
    },
  },

  data: () => ({
    myReply: "",
    replying: false,
  }),

  methods: {
    upvote() {},

    downvote() {},

    replyTo() {
      this.replying = true;
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
    },
  },

  watch: {
    replying(v) {
      if (!v) {
        this.myReply = "";
      }
    },
  },
};
</script>

<style scoped>
>>> .editor-toolbar {
  color: black;
}

.border-bottom {
  border-bottom: 1px solid #80808063;
}
</style>
