<template>
  <v-container fluid>
    <v-row>
      <v-list v-if="loaded" width="100%">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-if="post.href">
              <a :href="post.href" 
                ><h1>{{ post.title }} ({{ post.domain }}) <v-icon>mdi-arrow-top-right-thick</v-icon></h1></a
              >
            </v-list-item-title>
            <v-list-item-title v-else><h1>{{ post.title }}</h1></v-list-item-title>
            <post :level="0" :post="post" :id="post.id" :index="0"></post>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
  </v-container>
</template>

<script>
import Post from "../components/Post";

export default {
  components: {
    Post,
  },
  data() {
    return {
      post: {},
      loaded: false,
    };
  },
  mounted: function () {
    this.postID = this.$route.params.postID;
    if (this.$route.params.commentID) {
      if (this.$store.state.Username) {
        this.$http
          .get(
            this.$LOTIDE +
              "/unstable/comments/" +
              this.$route.params.commentID +
              "?include_your=true"
          )
          .then(this.gotPost);
      } else {
        this.$http
          .get(
            this.$LOTIDE + "/unstable/comments/" + this.$route.params.commentID
          )
          .then(this.gotPost);
      }
    } else {
      if (this.$store.state.Username) {
        this.$http
          .get(
            this.$LOTIDE +
              "/unstable/posts/" +
              this.postID +
              "?include_your=true"
          )
          .then(this.gotPost);
      } else {
        this.$http
          .get(this.$LOTIDE + "/unstable/posts/" + this.postID)
          .then(this.gotPost);
      }
    }
  },
  methods: {
    gotPost: function (d) {
      this.post = d.data;
      if (this.post.href!=null)
          this.post.domain=this.post.href.split('/')[2];
      this.loaded = true;
    },
    upVote() {
      return;
    },
    downVote() {
      return;
    },
  },
};
</script>
<style scoped>
a:link {
  text-decoration: none;
}

.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>