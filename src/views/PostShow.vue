<template>
  <v-container fluid style="padding: 0">
    <v-card fluid style="padding: 0" outlined color="transparent" v-if="loaded">
      <v-card-title v-if="post.href"><a :href="post.href" class="text--secondary">{{ post.title }} <v-icon>mdi-arrow-top-right-thick</v-icon></a></v-card-title>
      <v-card-title v-else>{{ post.title }}</v-card-title>
      <v-card-text>
            <post :top="true" :post="post" :id="post.id"></post>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Post from '../components/Post'


export default {
  components: {
      Post
  },
  data() {
    return {
      post: {},
      loaded: false,
    }
  },
  mounted: function() {
    this.postID=this.$route.params.postID;
    this.$http.get(this.$LOTIDE + "/unstable/posts/" + this.postID).then(this.gotPost);
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
</style>