<template>
  <v-container fluid >
    <v-card elevation=10 color="rgba(0,0,0,0)" v-if="loaded">
      <v-card-title v-if="post.href"><a :href="post.href" class="text--secondary">{{ post.title }} <v-icon>mdi-arrow-top-right-thick</v-icon></a></v-card-title>
      <v-card-title v-else>{{ post.title }}</v-card-title>
      <v-card-text >
            <post :level="0" :post="post" :id="post.id"></post>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Post from '../components/Post'


export default {
  components: {
      Post,
  },
  data() {
    return {
      post: {},
      loaded: false,
    }
  },
  mounted: function() {
    this.postID=this.$route.params.postID;
    if (this.$route.params.commentID) {
          this.$http.get(this.$LOTIDE + "/unstable/comments/" + this.$route.params.commentID).then(this.gotPost);

    } else {
      this.$http.get(this.$LOTIDE + "/unstable/posts/" + this.postID).then(this.gotPost);
    }
  },
  methods: {
    gotPost: function(d) {
      this.post=d.data;
      this.loaded=true;
    },
    upVote() {
      return;
    },
    downVote() {
      return;
    },
  },
}
</script>
<style scoped>
a:link {
  text-decoration: none
}

.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>