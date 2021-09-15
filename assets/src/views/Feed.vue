<template>
  <v-container fluid style="padding: 0">
    <v-card v-if="community !== null">
      <v-card-title> {{ community.name }}</v-card-title>
      <v-card-subtitle>{{ community.description }}</v-card-subtitle>
      <v-card-actions v-if="$store.state.LoggedIn">
        <TooltipButton
          v-if="
            community.your_follow === null || community.your_follow === false
          "
          :clicked="subscribe"
          :clickarg="String(community.id)"
          icon="mdi-plus-box"
          hover="Subscribe"
        />
        <TooltipButton
          v-else
          :clicked="unsubscribe"
          :clickarg="String(community.id)"
          icon="mdi-trash-can"
          hover="Unsubscribe"
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

    <v-list v-if="loaded" dense two-line>
      <template v-for="(post, index) in posts">
        <v-list-item :key="index" style="padding-left: 0">
          <v-list-item-action style="margin-right: 4px">
            <TooltipButton
              v-if="$store.state.LoggedIn"
              :clicked="upVote"
              :clickarg="String(index)"
              :icon="post.your_vote ? 'mdi-cards-heart' : 'mdi-heart-outline'"
              :hover="post.your_vote ? 'Un-love' : 'Love'"
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
      loaded: false,
      posts: [],
      tempposts: [],
      community: null,
      posttitle: '',
      showeditor: false,
      showlinkinput: false,
      linkinput: '',
    }
  },
  mounted() {
    if (typeof this.$route.params.communityID === 'undefined') {
      this.loadDefaultPosts()
    } else {
      // Load community info
      if (this.$store.state.LoggedIn)
        this.$axios
          .get(
            '/api/communities/' +
              this.$route.params.communityID +
              '?include_your=true'
          )
          .then(this.gotCommunityInfo)
      else
        this.$axios
          .get('/api/communities/' + this.$route.params.communityID)
          .then(this.gotCommunityInfo)

      this.loadPosts()
    }
  },
  methods: {
    subscribe() {
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post('/api/communities/' + this.community.id + '/follow', postdata)
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
        .post('/api/communities/' + this.community.id + '/unfollow', postdata)
        .then(this.gotunsubscribed)
    },
    loadPosts() {
      if (this.$store.state.LoggedIn) {
        this.$axios
          .get(
            '/api/communities/' +
              this.$route.params.communityID +
              '/posts?include_your=true'
          )
          .then(this.gotPosts)
      } else {
        this.$axios
          .get('/api/communities/' + this.$route.params.communityID + '/posts')
          .then(this.gotPosts)
      }
    },
    loadDefaultPosts() {
      if (this.$store.state.LoggedIn) {
        this.$axios
          .get('/api/users/~me/following:posts?include_your=true')
          .then(this.gotFollowingPosts)
      } else {
        this.$axios.get('/api/posts').then(this.gotPosts)
      }
    },
    gotCommunityInfo(d) {
      this.community = d.data
      console.log(this.community)
    },
    gotFollowingPosts(d) {
      this.tempposts = d.data
      this.$axios.get('/api/posts?include_your=true').then(this.gotMorePosts)
    },
    gotPosts(d) {
      this.posts = d.data
      for (const x in this.posts) {
        if (typeof this.posts[x].score === 'undefined') this.posts[x].score = 0
      }
      this.loaded = true
    },
    gotMorePosts(d) {
      for (const i in d.data) {
        let flag = false
        for (const x in this.tempposts) {
          if (d.data[i].id === this.tempposts[x].id) {
            flag = true
          }
        }
        if (!flag) {
          this.tempposts.push(d.data[i])
        }
      }
      this.posts = this.tempposts
      this.loaded = true
    },
    goToUser() {},
    upVote(index) {
      if (!this.posts[index].your_vote) {
        this.$axios
          .put('/api/posts/' + this.posts[index].id + '/your_vote')
          .then((this.posts[index].your_vote = {}))
        this.posts[index].score++
      } else {
        this.$axios
          .delete('/api/posts/' + this.posts[index].id + '/your_vote')
          .then((this.posts[index].your_vote = null))
        this.posts[index].score--
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
      this.alerttext = 'Error: ' + e.response.status + ' : ' + e.response.data
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
