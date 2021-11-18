<template>
  <v-list class="" dense two-line>
    <template v-for="(post, index) in posts">
      <v-list-item :key="index" style="padding-left: 0">
        <v-list-item-action>
          <TooltipButton
            v-if="$auth.loggedIn"
            :icon="post.your_vote ? 'mdi-cards-heart' : 'mdi-heart-outline'"
            :hover="post.your_vote ? 'Un-love' : 'Love'"
            @click="upVote(index)"
          />
          <span
            v-if="post.score !== null"
            style="margin-left: auto; margin-right: auto"
          >
            {{ post.score }}
          </span>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link
              :class="
                $vuetify.theme.dark
                  ? 'grey--text text--lighten-3'
                  : 'grey--text text--darken-4'
              "
              class="text-h5 text-decoration-none"
              :to="`/posts/${post.id}`"
            >
              {{ post.title }}
            </nuxt-link>
          </v-list-item-title>
          <v-list-item-subtitle
            :class="
              $vuetify.theme.dark ? 'grey--text' : 'grey--text text--darken-4'
            "
          >
            <span
              class="font-weight-bold"
              :class="
                $vuetify.theme.dark
                  ? 'grey--text text--lighten-1'
                  : 'grey--text text--darken-2 '
              "
            >
              <Username
                :username="post.author.username"
                :userid="post.author.id"
              />@{{ post.author.host }}
            </span>
            in
            <nuxt-link
              style="text-decoration: none"
              :to="`/communities/${post.community.id}`"
              class="font-weight-bold"
              :class="
                $vuetify.theme.dark
                  ? 'primary--text text--darken-2'
                  : 'primary--text text--darken-4'
              "
            >
              {{ post.community.name }}@{{ post.community.host }}
            </nuxt-link>
            ({{ post.replies_count_total }}
            replies) &#8226;
            <since :timestamp="post.created" />
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="index + 'divider'" />
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    community: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      theCols: '6',
    }
  },
  methods: {
    subscribe() {
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post(`/communities/${this.community.id}/follow`, postdata)
        .then(this.gotsubscribed)
    },
    gotunsubscribed() {
      this.$router.go()
    },
    gotsubscribed() {
      this.$router.go()
    },
    unsubscribe() {
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post(`/communities/${this.community.id}/unfollow`, postdata)
        .then(this.gotunsubscribed)
    },
    upVote(index) {
      if (!this.posts[index].your_vote) {
        this.$axios
          .put(`/posts/${this.posts[index].id}/your_vote`)
          .then((this.posts[index].your_vote = {}))
        this.posts[index].score += 1
      } else {
        this.$axios
          .delete(`/posts/${this.posts[index].id}/your_vote`)
          .then((this.posts[index].your_vote = null))
        this.posts[index].score -= 1
      }
    },
    downVote() {},
    goToComments(postID) {
      this.$router.push(`/posts/${postID}`)
    },
    preview(post) {
      return post.postContent.substring(0, this.theCols * 10)
    },
    submit(editorcontent) {
      if (this.postTitle === '') {
        this.alerttext = 'Your post needs a title.'
        this.alerttimeout = 5000
        this.showalert = true
        return
      }
      if (!editorcontent || editorcontent === '') {
        this.alerttext = 'Type a response before submitting!'
        this.alerttimeout = 5000
        this.showalert = true
        return
      }
      const submission = {}
      submission.content_markdown = editorcontent
      submission.community = this.community.id
      submission.title = this.postTitle

      this.$axios
        .post(`/posts`, submission)
        .then(this.submitsuccess)
        .catch(this.submitfailed)
    },
    submitlink() {
      if (this.postTitle === '') {
        this.alerttext = 'Your post needs a title.'
        this.alerttimeout = 5000
        this.showalert = true
        return
      }
      if (!this.linkinput || this.linkinput === '') {
        this.alerttext = 'Type a url before submitting!'
        this.alerttimeout = 5000
        this.showalert = true
        return
      }
      if (!this.isValidUrl(this.linkinput)) {
        this.alerttext = 'Url is invalid!'
        this.alerttimeout = 5000
        this.showalert = true
        return
      }

      const submission = {}
      submission.href = this.linkinput
      submission.community = this.community.id
      submission.title = this.postTitle

      this.$axios
        .post(`/posts`, submission)
        .then(this.submitsuccess)
        .catch(this.submitfailed)
    },
    isValidUrl(string) {
      let url

      try {
        url = new URL(string)
      } catch (_) {
        return false
      }

      return url.protocol === 'http:' || url.protocol === 'https:'
    },
    isValidLinkForm() {
      return this.postTitle && this.isValidUrl(this.linkinput)
    },
    submitsuccess() {
      this.alerttext = 'Post submitted!'
      this.alerttimeout = 5000
      this.showalert = true
      this.replybox = false
      this.$router.go()
    },
    submitfailed(e) {
      this.alerttext = `Error: ${e.response.status} : ${e.response.data}`
      this.alerttimeout = 5000
      this.showalert = true
    },
  },
}
</script>
<style>
.v-list-item__title {
  white-space: normal;
}

.linkinput {
  background-color: white;
  width: 100%;
}

.submitlinkbutton {
  display: block;
  margin-top: 8px;
}
</style>
