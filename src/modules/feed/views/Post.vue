<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>

        <v-card v-else>
          <v-card-title
            ><h2>{{ post.title }}</h2></v-card-title
          >
          <v-card-subtitle
            >{{ post.createdDistance }} ago by {{ post.author.username }} -
            {{ post.score }} points</v-card-subtitle
          >
          <v-card-text
            v-html="post.content_html || post.content_text"
            id="content"
          >
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <Replies :replies="post.replies" v-if="hasReplies" />
      </v-col>
    </v-row>

    <ReplyModal v-model="replying" />
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Replies from "../components/Replies";
import ReplyModal from "@/modules/feed/components/ReplyModal";

export default {
  name: "Post",
  components: { ReplyModal, Replies },
  data: () => ({
    loading: false,
  }),

  mounted() {
    this.loadPost();
  },

  methods: {
    ...mapMutations("$feed", ["setReplyingToId"]),
    ...mapActions("$feed", ["getCommunity", "getPost"]),

    async loadPost() {
      this.loading = true;

      await this.getPost(this.postId);

      if (!this.community) {
        await this.getCommunity(this.post.community.id);
      }

      this.loading = false;
    },
  },

  computed: {
    ...mapState("$feed", ["replyingToId", "post"]),

    /** @returns {number} */
    postId() {
      return +this.$route.params.id;
    },

    /** @returns {boolean} */
    hasReplies() {
      return this.post.replies.length > 0;
    },

    replying: {
      get() {
        return this.replyingToId !== -1;
      },
      set(v) {
        if (!v) {
          this.setReplyingToId(-1);
        }
      },
    },
  },
};
</script>
