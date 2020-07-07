<template>
  <v-container>
    <v-list two-line>
      <template v-for="(post,index)  in orderedPosts">
        <v-list-item :key="index">
          <v-list-item-action>
            <v-icon @click="upVote(post.id)">mdi-arrow-up-bold</v-icon>
            <span>{{ post.voteCount }}</span>
            <v-icon @click="downVote(post.id)">mdi-arrow-down-bold</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link
                class="text-h5 text-decoration-none"
                :to="{ name: 'PostShow', params: { postID: post.id } }"
              >{{ post.title }}</router-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--secondary">
                Posted by
                <Username :username="post.authorUsername"></Username>
                on {{ post.postedDate | moment("MMM DD YYYY, h:MMa") }}
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index+'divider'"></v-divider>
      </template>
    </v-list>
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
      return post.postContent.substring(0, this.thecols * 10);
    }
  }
};
</script>
<style>
</style>