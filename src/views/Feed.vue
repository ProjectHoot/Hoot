<template>
  <v-container>
    <v-card>
      <v-card-title>Adjust card width</v-card-title>
      <v-card-text>
        <v-slider max="12" min="1" v-model="thecols"></v-slider>
        </v-card-text>
        </v-card>
    <v-row>
      <v-col :cols="thecols" v-for="post in orderedPosts" :key="post.id">
        <v-card raised class="text-primary">
          <v-card-title>
            <router-link
              class="text-h5 text-decoration-none"
              :to="{ name: 'PostShow', params: { postID: post.id } }"
            >{{ post.title }}</router-link>
          </v-card-title>
          <v-card-subtitle>
                <span class="text--secondary">
                  Posted by
                  <Username :username="post.authorUsername"></Username>
                  on {{ post.postedDate | moment("MMM DD YYYY, h:MMa") }}
                </span>
          </v-card-subtitle>
          <v-card-text>
            {{ preview(post) }}
          </v-card-text>
          <v-card-actions>
            <v-row justify="space-around">
              <v-col cols="4" class="text-left">
                <v-icon @click="upVote(post.id)">mdi-arrow-up-bold</v-icon>
                <span>{{ post.voteCount }}</span>
                <v-icon @click="downVote(post.id)">mdi-arrow-down-bold</v-icon>
              </v-col>
              <v-spacer />
              <v-col cols="4" class="text-right">
                <v-icon @click="goToComments(post.id)">mdi-message-reply</v-icon>
                {{ post.commentCount }}
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import Username from "../components/Username";

export default {
  components: {
    Username
  },
  computed: {
    ...mapState(["posts"]),
    orderedPosts() {
      return this.posts;
    }
  },
  data() {
    return {
      thecols: "6"
    };
  },
  methods: {
    goToUser() {
      return;
    },
    upVote() {
      return;
    },
    downVote() {
      return;
    },
    goToComments(postID) {
      this.$router.push({ name: "PostShow", params: { postID: postID } });
    },
    preview(post) {
      return(post.postContent.substring(0, this.thecols*10));
    }
  }
};
</script>
<style>

</style>