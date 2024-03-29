<template>
  <v-row justify="center">
    <v-col lg="9">
      <v-card v-if="community !== null" flat>
        <v-card-title>
          {{ community.name }}
        </v-card-title>
        <v-card-subtitle>{{ community.description }}</v-card-subtitle>
        <v-card-actions v-if="$auth.loggedIn">
          <v-btn
            v-if="
              community.your_follow === null || community.your_follow === false
            "
            color="primary"
            depressed
            @click="subscribe(community.id)"
          >
            <v-icon left> mdi-plus-box </v-icon>
            Subscribe
          </v-btn>

          <v-btn
            v-if="community.your_follow && community.your_follow.accepted"
            depressed
            color="primary"
            @click="toggleNewPost"
          >
            <v-icon left> mdi-plus-circle </v-icon>
            New Post
          </v-btn>
          <v-btn
            v-if="community.your_follow && community.your_follow.accepted"
            text
            @click="togglenewlink"
          >
            <v-icon left> mdi-link </v-icon>
            New Link
          </v-btn>
          <v-btn
            v-if="
              !community.your_follow === null ||
              !community.your_follow === false
            "
            text
            @click="unsubscribe(community.id)"
          >
            <v-icon left> mdi-minus-circle </v-icon>
            unsubscribe
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="showEditor">
        <v-card-title>New Post</v-card-title>
        <v-card-text>
          <v-text-field v-model="posttitle" placeholder="Post Title" />
          <Editor @submit="submit" />
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

      <v-list v-if="loaded" dense two-line>
        <template v-for="(post, index) in posts">
          <v-list-item :key="index" style="padding-left: 0">
            <v-list-item-action style="margin-right: 4px">
              <TooltipButton
                v-if="$auth.loggedIn"
                :icon="post.your_vote ? 'mdi-cards-heart' : 'mdi-heart-outline'"
                :hover="post.your_vote ? 'Un-love' : 'Love'"
                @click="upVote(index)"
              />
              <span
                v-if="post.score !== null"
                style="margin-left: auto; margin-right: auto"
                >{{ post.score }}</span
              >
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
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
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
      loaded: false,
      posts: [],
      tempposts: [],
      community: null,
      posttitle: '',
      showEditor: false,
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
        const response = await this.$axios.get(
          `/communities/` +
            this.$route.params.communityID +
            '?include_your=true'
        )
        this.gotCommunityInfo(response)
      } else {
        const response = await this.$axios.get(
          `/communities/` + this.$route.params.communityID
        )
        this.gotCommunityInfo(response)
      }

      await this.loadPosts()
    }
  },
  mounted() {},
  methods: {
    ...mapActions('message', ['showMessage', 'showError']),
    subscribe() {
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post(`/communities/` + this.community.id + '/follow', postdata)
        .then(this.gotsubscribed)
    },
    togglenewlink() {
      this.showlinkinput = !this.showlinkinput
      this.showEditor = false
    },
    toggleNewPost() {
      this.showEditor = !this.showEditor
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
        .post(`/communities/` + this.community.id + '/unfollow', postdata)
        .then(this.gotunsubscribed)
    },
    async loadPosts() {
      if (this.$auth.loggedIn) {
        const response = await this.$axios.get(
          `/posts?include_your=true&community=${this.$route.params.communityID}`
        )
        this.gotPosts(response)
      } else {
        const response = await this.$axios.get(
          `/communities/` + this.$route.params.communityID + '/posts'
        )
        this.gotPosts(response)
      }
    },
    async loadDefaultPosts() {
      if (this.$auth.loggedIn) {
        const response = await this.$axios.get(
          `/users/~me/following:posts?include_your=true`
        )
        this.gotFollowingPosts(response)
      } else {
        const response = await this.$axios.get(`/posts`)
        this.gotPosts(response)
      }
    },
    gotCommunityInfo(d) {
      this.community = d.data
    },
    gotFollowingPosts(d) {
      if (d.data.items) this.tempposts = d.data.items
      else this.tempposts = d.data
      this.tempposts = d.data
      this.$axios.get(`/posts?include_your=true`).then(this.gotMorePosts)
    },
    gotPosts(d) {
      if (d.data.items) this.posts = d.data.items
      else this.posts = d.data
      for (const x in this.posts) {
        if (typeof this.posts[x].score === 'undefined') this.posts[x].score = 0
      }
      this.loaded = true
    },
    gotMorePosts(d) {
      let items = []
      if (d.data.items) items = d.data.items
      else items = d.data
      for (const i in items) {
        let flag = false
        for (const x in this.tempposts) {
          if (items[i].id === this.tempposts[x].id) {
            flag = true
          }
        }
        if (!flag) {
          this.tempposts.push(items[i])
        }
      }
      this.posts = this.tempposts
      this.loaded = true
    },
    goToUser() {},
    upVote(index) {
      if (!this.posts[index].your_vote) {
        this.$axios
          .put(`/posts/` + this.posts[index].id + '/your_vote')
          .then((this.posts[index].your_vote = {}))
        this.posts[index].score++
      } else {
        this.$axios
          .delete(`/posts/` + this.posts[index].id + '/your_vote')
          .then((this.posts[index].your_vote = null))
        this.posts[index].score--
      }
    },
    downVote() {},
    goToComments(postID) {
      this.$router.push({ name: 'PostShow', params: { postID } })
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
        .post(`/posts`, submission)
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
      return this.posttitle && this.isValidUrl(this.linkinput)
    },
    submitsuccess({ data: { id } }) {
      this.showMessage({
        message: 'Post submitted!',
        icon: 'mdi-check',
        color: 'success',
        position: { top: true },
      })
      this.$router.push(`/posts/${id}`)
    },
    submitfailed(e) {
      this.showError({
        message: 'Error: ' + e.response.status + ' : ' + e.response.data,
        icon: 'mdi-exclamation',
      })
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
