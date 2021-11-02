<template>
  <v-row justify="center">
    <v-col md="9">
      <v-card flat width="100%">
        <v-card-title v-if="post.href">
          <a :href="post.href"
            >{{ post.title }} ({{ post.domain }})
            <v-icon>mdi-arrow-top-right-thick</v-icon></a
          >
        </v-card-title>
        <v-card-title v-else>
          {{ post.title }}
        </v-card-title>
        <v-card-text v-if="!$fetchState.pending">
          <Post
            @submit="$fetch"
            :id="post.id"
            :level="0"
            :post="post"
            :index="0"
          />
        </v-card-text>
      </v-card>
      <!-- <v-skeleton-loader v-else type="card" /> -->
    </v-col>
  </v-row>
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
    }
  },
  async fetch() {
    await this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      const postID = this.$route.params.postID
      let url = ''
      if (this.$route.params.commentID) {
        if (this.$auth.loggedIn) {
          url =
            `/comments/` + this.$route.params.commentID + '?include_your=true'
        } else {
          url = `/comments/` + this.$route.params.commentID
        }
      } else if (this.$auth.loggedIn) {
        url = `/posts/` + postID + '?include_your=true'
      } else {
        url = `/posts/` + postID
      }
      const data = await this.$axios.$get(url)
      this.post = data
      if (this.post.href !== null) {
        this.post.domain = this.post.href.split('/')[2]
      }
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
