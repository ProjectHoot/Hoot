<template>
  <div id="reply" :class="{ dark, root }">
    <v-card :elevation="0" class="pb-2">
      <v-card-subtitle>
        <v-chip label>
          {{ reply.author.username }}
          <v-icon right> mdi-label mdi-rotate-180 </v-icon>
        </v-chip>

        {{ reply.score }} points -
        <Tooltip
          :top="true"
          :value="reply.created"
          :label="reply.createdDistance + ' ago'"
        />
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

      <slot></slot>
    </v-card>
  </div>
</template>

<script>
import FormatDistance from "date-fns/formatDistance";
import { mapState, mapMutations } from "vuex";
import Reply from "../models/reply";
import Tooltip from "@/components/Tooltip";

export default {
  name: "Reply",
  components: { Tooltip },
  props: {
    reply: {
      type: Reply,
      required: true,
    },

    level: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    ...mapMutations("$feed", ["setReplyingToId"]),

    upvote() {
      throw new Error("Not implemented");
    },

    downvote() {
      throw new Error("Not implemented");
    },

    replyTo() {
      this.setReplyingToId(this.reply.id);
    },
  },

  computed: {
    ...mapState("$preferences", ["dark"]),

    /** @returns {boolean} */
    root() {
      return this.level === 0;
    },
  }
};
</script>

<style scoped>
>>> .editor-toolbar {
  color: black;
}

#reply:not(.root) {
  border-left: 1px solid black;
}

#reply:not(.root) .dark {
  border-color: white;
}
</style>
