<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader
            v-if="loading"
            type="card-avatar, article, actions"
        ></v-skeleton-loader>

        <v-card v-else>
          <v-card-title
            ><h2>{{ post.title }}</h2></v-card-title
          >
          <v-card-subtitle>{{ post.createdDistance }} ago by {{ post.author.username }} - {{ post.score }} points</v-card-subtitle>
          <v-card-text v-html="post.content_html || post.content_text" id="content"> </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <Replies :replies="post.replies" v-if="hasReplies" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from "../models/post";
import api from "@/services/api";
import Replies from "../components/Replies";

export default {
  name: "Post",
  components: { Replies },
  data: () => ({
    loading: false,
    /** @type {Post} */
    post: new Post({}),
  }),

  mounted() {
    this.loadPost();
  },

  methods: {
    loadPost() {
      this.loading = true;

      api.posts
        .getById(this.postId)
        .then((post) => {
          this.post = post;
        })
        .catch(() => {
          // Can't load post, what do?
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  computed: {
    /** @returns {number} */
    postId() {
      return +this.$route.params.id;
    },

    /** @returns {boolean} */
    hasReplies() {
      return this.post.replies.length > 0;
    },
  },
};
</script>
