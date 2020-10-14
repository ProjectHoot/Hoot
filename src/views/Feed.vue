<template>
  <v-container>
    <v-list two-line>
      <template v-for="(post,index)  in posts">
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
                :to="{ name: 'PostShow',  params: { community: post.community.name, host: post.community.host, postID: post.id } }"
              >{{ post.title }}</router-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--secondary">
                Posted by
                <Username :username="post.author.username"></Username> in {{ post.community.name }} @ {{ post.community.host }}
                <since :Timestamp="post.created"></since>
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

import Username from "../components/Username";
import Since from '../components/Since'

export default {
  components: {
    Username,
    Since
  },
  data() {
    return {
      thecols: "6",

      posts: [],
          };
  },
  mounted: function() {
    this.loadDefaultPosts();
  },
  methods: {
    loadDefaultPosts() {
      if (this.$store.state.Username!="") {
        this.$http.get(this.$LOTIDE + "/unstable/users/~me/following:posts").then(this.gotPosts);
      } else {
        this.$http.get(this.$LOTIDE + "/unstable/posts").then(this.gotPosts);
      
      }
    },
    gotPosts: function(d) {
      this.posts=d.data;
    },
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
  },

};
</script>
<style>
</style>