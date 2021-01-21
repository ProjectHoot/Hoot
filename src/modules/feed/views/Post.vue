<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            ><h2>{{ post.title }}</h2></v-card-title
          >

          <v-card-text v-html="post.content_html" id="content"> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from "../models/post";
import api from "@/services/api";

export default {
  name: "Post",

  data: () => ({
    loading: false,
    /** @type {Post} */
    post: new Post({}),
  }),

  mounted() {
    api.posts
      .getById(this.postId)
      .then((post) => {
        this.post = post;
      })
      .catch(() => {
        // Can't load post, what do?
      });
  },

  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
};
</script>
