<template>
  <v-container v-if="loaded" fluid>
    <v-card width="100%">
      <v-card-title v-if="post.href">
        <a :href="post.href"
          >{{ post.title }} ({{ post.domain }})
          <v-icon>mdi-arrow-top-right-thick</v-icon></a
        >
      </v-card-title>
      <v-card-title v-else>
        {{ post.title }}
      </v-card-title>
      <v-card-text>
        <Post :id="post.id" :level="0" :post="post" :index="0" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Post from '~/components/Post'

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
  mounted() {
    this.postID = this.$route.params.postID
    if (this.$route.params.commentID) {
      if (this.$auth.loggedIn) {
        this.$axios
          .get(
            '/api/comments/' +
              this.$route.params.commentID +
              '?include_your=true'
          )
          .then(this.gotPost)
      } else {
        this.$axios
          .get('/api/comments/' + this.$route.params.commentID)
          .then(this.gotPost)
      }
    } else if (this.$auth.loggedIn) {
      this.$axios
        .get('/api/posts/' + this.postID + '?include_your=true')
        .then(this.gotPost)
    } else {
      this.$axios.get('/api/posts/' + this.postID).then(this.gotPost)
    }
  },
  methods: {
    gotPost(d) {
      this.post = d.data
      if (this.post.href !== null)
        this.post.domain = this.post.href.split('/')[2]
      this.post.comments = this.post.replies
      this.loaded = true
    },
    upVote() {},
    downVote() {},
  },
}
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
