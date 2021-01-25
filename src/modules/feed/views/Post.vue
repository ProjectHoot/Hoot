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

          <v-card-actions>
            <v-btn icon @click="upvote" :color="upvoteIconColor">
              <v-progress-circular
                :width="3"
                indeterminate
                color="primary"
                v-if="upvoting"
              ></v-progress-circular>
              <v-icon v-else>mdi-arrow-up</v-icon>
            </v-btn>

            <v-btn icon @click="downvote">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>

            <v-btn icon @click="replyTo">
              <v-icon>mdi-reply</v-icon>
            </v-btn>
          </v-card-actions>
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Replies from "../components/Replies";
import ReplyModal from "@/modules/feed/components/ReplyModal";

export default {
  name: "Post",
  components: { ReplyModal, Replies },
  data: () => ({
    loading: false,
    upvoting: false,
  }),

  mounted() {
    this.loadPost();
  },

  methods: {
    ...mapMutations("$feed", ["setReplyingToState"]),
    ...mapActions("$feed", [
      "getCommunity",
      "getPost",
      "upvotePost",
      "downvotePost",
    ]),

    async loadPost() {
      this.loading = true;

      await this.getPost({ id: this.postId, includeYour: this.loggedIn });

      if (!this.community) {
        await this.getCommunity(this.post.community.id);
      }

      this.loading = false;
    },

    upvote() {
      if (this.loggedIn && this.post && !this.upvoting) {
        this.upvoting = true;

        if (!this.post.your_vote) {
          this.upvotePost(this.post).finally(() => (this.upvoting = false));
        } else {
          this.downvotePost(this.post).finally(() => (this.upvoting = false));
        }
      }
    },

    downvote() {
      if (this.loggedIn) {
        this.downvotePost(this.post);
      }
    },

    replyTo() {
      if (this.loggedIn) {
        this.setReplyingToState({ type: "post", id: this.post.id });
      }
    },
  },

  computed: {
    ...mapGetters("$auth", ["loggedIn"]),
    ...mapState("$feed", ["replyingTo", "post"]),

    /** @returns {number} */
    postId() {
      return +this.$route.params.id;
    },

    /** @returns {boolean} */
    hasReplies() {
      return this.post.replies.length > 0;
    },

    /** @returns {string} */
    upvoteIconColor() {
      return this.post.your_vote ? "orange" : "white";
    },

    replying: {
      get() {
        return this.replyingTo.id !== -1;
      },
      set(v) {
        if (!v) {
          this.setReplyingToState({
            type: "",
            id: -1,
          });
        }
      },
    },
  },
};
</script>
