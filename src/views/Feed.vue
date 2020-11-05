<template>
  <v-container fluid style="padding: 0">
    <v-list dense two-line v-if="loaded">
      <template v-for="(post, index) in posts">
        <v-list-item style="padding-left: 0" :key="index">
          <v-list-item-action style="margin-right: 4px">
            <v-btn icon v-if="$store.state.Username" @click="upVote(index)"
              ><v-icon v-if="post.your_vote" color="primary">mdi-arrow-up-bold</v-icon>
              <v-icon v-else color="secondary">mdi-arrow-up</v-icon>
            </v-btn>
            <span
              style="margin-left: auto; margin-right: auto"
              v-if="post.score!=null"
              >{{ post.score }}</span
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link
                class="text-h5 text-decoration-none"
                :to="{
                  name: 'PostShow',
                  params: {
                    community: post.community.name,
                    host: post.community.host,
                    postID: post.id,
                  },
                }"
                >{{ post.title }}</router-link
              >
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--secondary">
                Posted by
                <Username :username="post.author.username"></Username> in
                {{ post.community.name }} @ {{ post.community.host }}
                <since :Timestamp="post.created"></since>
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index + 'divider'"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import Username from "../components/Username";
import Since from "../components/Since";

export default {
  components: {
    Username,
    Since,
  },
  data() {
    return {
      thecols: "6",
      loaded: false,
      posts: [],
      tempposts: [],
    };
  },
  mounted: function () {
    this.loadDefaultPosts();
  },
  methods: {
    loadDefaultPosts() {
      if (this.$store.state.Username != "") {
        this.$http
          .get(this.$LOTIDE + "/unstable/users/~me/following:posts?include_your=true")
          .then(this.gotFollowingPosts);
      } else {
        this.$http.get(this.$LOTIDE + "/unstable/posts").then(this.gotPosts);
      }
    },
    gotFollowingPosts: function (d) {
      this.tempposts = d.data;
      this.$http.get(this.$LOTIDE + "/unstable/posts?include_your=true").then(this.gotMorePosts);
    },
    gotPosts: function (d) {
      this.posts = d.data;
      for (var x in this.posts) {
        if (typeof(this.posts[x].score)=="undefined") this.posts[x].score=0;
      }
      this.loaded = true;
    },
    gotMorePosts: function (d) {
      for (var i in d.data) {
        var flag = false;
        for (var x in this.tempposts) {
          if (d.data[i].id == this.tempposts[x].id) {
            flag = true;
          }
        }
        if (!flag) {
          this.tempposts.push(d.data[i]);
        }
      }
      this.posts = this.tempposts;
      this.loaded = true;
    },

    goToUser() {
      return;
    },
    upVote: function (index) {
      if (!this.posts[index].your_vote) {
        this.$http
          .put(
            this.$LOTIDE +
              "/unstable/posts/" +
              this.posts[index].id +
              "/your_vote"
          )
          .then((this.posts[index].your_vote = {}));
          this.posts[index].score++;
      } else {
        this.$http
          .delete(
            this.$LOTIDE +
              "/unstable/posts/" +
              this.posts[index].id +
              "/your_vote"
          )
          .then((this.posts[index].your_vote = null));
        this.posts[index].score--;
      }
    },
    downVote() {
      return;
    },
    goToComments(postID) {
      this.$router.push({ name: "PostShow", params: { postID: postID } });
    },
    preview(post) {
      return post.postContent.substring(0, this.thecols * 10);
    },
  },
};
</script>
<style>
</style>