<template>
  <v-container fluid style="padding: 0">
    <v-card v-if="community !== null">
      <v-card-title> {{ community.name }}</v-card-title>
      <v-card-subtitle>{{ community.description }}</v-card-subtitle>
      <v-card-actions v-if="$auth.loggedIn">
        <TooltipButton
          v-if="
            community.your_follow === null || community.your_follow === false
          "
          icon="mdi-plus-box"
          hover="Subscribe"
          @click="subscribe(community.id)"
        />
        <TooltipButton
          v-else
          icon="mdi-trash-can"
          hover="Unsubscribe"
          @click="unsubscribe(community.id)"
        />
        <TooltipButton
          v-if="community.your_follow && community.your_follow.accepted"
          :click="togglenewpost"
          hover="New Post"
          icon="mdi-pencil"
        />
        <TooltipButton
          v-if="community.your_follow && community.your_follow.accepted"
          :click="togglenewlink"
          hover="New Link"
          icon="mdi-link"
        />
      </v-card-actions>
    </v-card>
    <v-card v-if="showeditor">
      <v-card-title>New Post</v-card-title>
      <v-card-text>
        <v-text-field v-model="posttitle" placeholder="Post Title" />
        <Editor :submit="submit" />
      </v-card-text>
    </v-card>
    <v-card v-if="showlinkinput">
      <v-card-title>New Link</v-card-title>
      <v-card-text>
        <v-text-field v-model="posttitle" placeholder="Post Title" />
        <form>
          <input
            v-model="linkinput"
            class="linkinput"
            type="text"
            placeholder="Enter Url"
          />
          <v-btn
            :disabled="!isValidLinkForm()"
            class="submitlinkbutton"
            @click="submitlink"
          >
            Submit
          </v-btn>
        </form>
      </v-card-text>
    </v-card>

    <v-list v-if="!$fetchState.pending" dense two-line>
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
                class="text-h5 text-decoration-none"
                :to="`/posts/${post.id}`"
              >
                {{ post.title }}
              </nuxt-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--secondary">
                Posted
                <since :timestamp="post.created" />
                by
                <Username
                  :username="post.author.username"
                  :userid="post.author.id"
                />@{{ post.author.host }}
                in
                {{ post.community.name }}@{{ post.community.host }} ({{
                  post.replies_count_total
                }}
                replies)
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index + 'divider'" />
      </template>
    </v-list>
    <v-skeleton-loader v-else type="list-item-avatar-three-line@12">
    </v-skeleton-loader>
  </v-container>
</template>

<script>
import Username from '~/components/Username'
import Since from '~/components/Since'
import Editor from '~/components/Editor'
import TooltipButton from '@/components/TooltipButton'

export default {
  components: {
    Username,
    Since,
    Editor,
    TooltipButton,
  },
  data() {
    return {
      thecols: '6',
      posts: [],
      tempposts: [],
      community: null,
      posttitle: '',
      showeditor: false,
      showlinkinput: false,
      linkinput: '',
    }
  },
  async fetch() {
    if (this.$route.params.communityID === undefined) {
      await this.loadDefaultPosts()
    } else {
      // Load community info
      if (this.$auth.loggedIn) {
        this.community = await this.$axios.$get(
          `/api/communities/${this.$route.params.communityID}?include_your=true`
        )
      } else {
        this.community = await this.$axios.$get(
          `/api/communities/${this.$route.params.communityID}`
        )
      }
      await this.loadPosts()
    }
  },
  methods: {
    subscribe() {
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post(`/api/communities/${this.community.id}/follow`, postdata)
        .then(this.gotsubscribed)
    },
    togglenewlink() {
      this.showlinkinput = !this.showlinkinput
      this.showeditor = false
    },
    togglenewpost() {
      this.showeditor = !this.showeditor
      this.showlinkinput = false
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
        .post(`/api/communities/${this.community.id}/unfollow`, postdata)
        .then(this.gotunsubscribed)
    },
    async loadPosts() {
      let posts = []
      if (this.$auth.loggedIn) {
        posts = await this.$axios.get(
          `/api/communities/${this.$route.params.communityID}/posts?include_your=true`
        )
      } else {
        posts = await this.$axios.get(
          `/api/communities/${this.$route.params.communityID}/posts`
        )
      }
      this.posts = posts.map((post) => {
        if (post.score === undefined) {
          return { ...post, score: 0 }
        }
        return post
      })
    },
    async loadDefaultPosts() {
      if (this.$auth.loggedIn) {
        // fetch posts from what you're following, then fetch posts from what you aren't
        const [
          { value: followingPosts = [] },
          {
            value: { items: otherPosts = [] },
          },
        ] = await Promise.allSettled([
          this.$axios.$get('/api/users/~me/following:posts?include_your=true'),
          this.$axios.$get('/api/posts?include_yours=true'),
        ])
        this.posts.push(...followingPosts, ...otherPosts)
      } else {
        const { items: posts } = await this.$axios.$get('/api/posts')
        this.posts = posts.map((post) => {
          if (post.score === undefined) {
            return { ...post, score: 0 }
          }
          return post
        })
      }
    },
    upVote(index) {
      if (!this.posts[index].your_vote) {
        this.$axios
          .put(`/api/posts/${this.posts[index].id}/your_vote`)
          .then((this.posts[index].your_vote = {}))
        this.posts[index].score += 1
      } else {
        this.$axios
          .delete(`/api/posts/${this.posts[index].id}/your_vote`)
          .then((this.posts[index].your_vote = null))
        this.posts[index].score -= 1
      }
    },
    downVote() {},
    goToComments(postID) {
      this.$router.push(`/posts/${postID}`)
    },
    preview(post) {
      return post.postContent.substring(0, this.thecols * 10)
    },
    submit(editorcontent) {
      if (this.posttitle === '') {
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
      submission.title = this.posttitle

      this.$axios
        .post('/api/posts', submission)
        .then(this.submitsuccess)
        .catch(this.submitfailed)
    },
    submitlink() {
      if (this.posttitle === '') {
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
      submission.title = this.posttitle

      this.$axios
        .post('/api/posts', submission)
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
      return this.posttitle && this.isValidUrl(this.linkinput)
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
