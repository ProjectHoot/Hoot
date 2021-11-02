<template>
  <v-row justify="center">
    <v-col lg="9">
      <Feed v-if="!$fetchState.pending" :posts="posts" />
      <v-skeleton-loader v-else type="list-item-avatar-three-line@12">
      </v-skeleton-loader>
    </v-col>
    <!-- <v-col cols="0" md="4" lg="3">
      <InstanceCard />
    </v-col> -->
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  async fetch() {
    // Load community info
    await this.loadPosts()
  },
  methods: {
    async loadPosts() {
      if (this.$auth.loggedIn) {
        // fetch posts from what you're following, then fetch posts from what you aren't
        const [
          { value: followingPosts = [] },
          {
            value: { items: otherPosts = [] },
          },
        ] = await Promise.allSettled([
          this.$axios.$get(`/users/~me/following:posts?include_your=true`),
          this.$axios.$get(`/posts?include_yours=true`),
        ])
        this.posts.push(...followingPosts, ...otherPosts)
      } else {
        const { items: posts } = await this.$axios.$get(`/posts`)
        this.posts = posts.map((post) => {
          if (post.score === undefined) {
            return { ...post, score: 0 }
          }
          return post
        })
      }
    },
  },
}
</script>
