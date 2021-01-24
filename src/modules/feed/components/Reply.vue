<template>
  <div id="reply" :class="{ dark, root }">
    <v-card :elevation="0" class="pb-2">
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

      <slot></slot>
    </v-card>
  </div>
</template>

<script>
import FormatDistance from "date-fns/formatDistance";
import { mapState } from "vuex";
import Reply from "../models/reply";
import VueEasyMde from "vue-easymde";

export default {
  name: "Reply",
  components: { VueEasyMde },
  props: {
    reply: {
      type: Reply,
      required: true,
    },

    level: {
      type: Number,
      default: 0
    }
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
    ...mapState("$preferences", ["dark"]),

    /** @returns {string} */
    createdFormatted() {
      return FormatDistance(this.reply.created, new Date());
    },

    /** @returns {boolean} */
    root() {
      return this.level === 0;
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

#reply:not(.root) {
  border-left: 1px solid black;
}

#reply:not(.root) .dark {
  border-color: white;
}
</style>
