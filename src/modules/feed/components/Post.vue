<template>
  <v-card elevation="2" @click="openPost" class="mt-2">
    <v-card-title>
      {{ post.title }}
    </v-card-title>
    <v-card-subtitle>Posted {{ createdFormatted }} ago by {{ post.author.username }} in {{ post.community.name }}</v-card-subtitle>
    <v-card-actions>
      <v-btn text @click.stop="gotoPost" color="orange">Comments</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Post from "../models/post";
import FormatDistance from "date-fns/formatDistance";

export default {
  name: "Post",
  props: {
    post: {
      type: Post,
      required: true
    }
  },

  methods: {
    openPost() {
      if (this.post.href) {
        window.open(this.post.href).focus();

        return false;
      }

      this.gotoPost();
    },

    gotoPost() {
      this.$router.push({
        name: "Post",
        params: {
          id: this.post.id
        }
      });
    }
  },

  computed: {
    /** @returns {string} */
    createdFormatted() {
      return FormatDistance(this.post.created, new Date());
    }
  }
};
</script>

<style scoped></style>
