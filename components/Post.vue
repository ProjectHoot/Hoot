<template>
  <div v-if="loaded" :style="'margin-left: ' + level + 'em;'" class="post">
    <div v-if="level !== 0" class="expandbutton">
      <TooltipButton
        :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
        :hover="expanded ? 'Compress' : 'Expand'"
        @click="expandClicked"
      />
    </div>
    <div style="display: inline-block">
      <username :userid="post.author.id" :username="post.author.username" />
      <span>
        @{{ post.author.host }} {{ post.score }} points,
        <since :timestamp="post.created"
      /></span>
      <br />
      <span v-if="expanded" class="post">
        <br />
        <span
          v-html="post.content_html ? post.content_html : post.content_text"
        />
      </span>
      <br />
      <TooltipButton
        v-if="$auth.loggedIn"
        :icon="post.your_vote ? 'mdi-cards-heart' : 'mdi-heart-outline'"
        :hover="post.your_vote ? 'Un-love' : 'Love'"
        @click="upVote"
      />
      <TooltipButton
        v-if="$auth.loggedIn"
        icon="mdi-reply"
        hover="Reply"
        @click="replyClicked"
      />
    </div>
    <v-card v-if="replybox">
      <v-card-title>Reply to {{ post.author.username }}</v-card-title>
      <v-card-text>
        <editor :submit="submit" />
      </v-card-text>
    </v-card>
    <v-divider />
    <post
      v-for="(p, i) in post.comments"
      :id="i"
      :key="i"
      :level="level + 1"
      :post="p"
    />
    <v-snackbar v-model="showalert" :timeout="alerttimeout">
      {{ alerttext }}
    </v-snackbar>
  </div>
</template>
<script>
import Since from '~/components/Since'
import Username from '~/components/Username'
import Editor from '~/components/Editor'
import TooltipButton from '@/components/TooltipButton'

export default {
  name: 'Post',
  components: {
    Since,
    Username,
    Editor,
    TooltipButton,
  },
  props: {
    post: Object,
    id: Number,
    level: Number,
  },
  data() {
    return {
      expanded: true,
      replybox: false,
      showalert: false,
      alerttimeout: 5000,
      alerttext: '',
      loaded: false,
    }
  },
  computed: {
    bgcolor() {
      if (this.$index() % 2) {
        return 'rgba(0,0,0,0)'
      }
      return 'rgba(0,0,0,0.5)'
    },
    posttest() {
      console.log(this.post)
      return ''
    },
  },
  mounted() {
    if (this.post.score === '') {
      this.post.score = 0
    }
    if (this.level === 0) this.loadReplies()
    else this.loaded = true
  },
  methods: {
    expandClicked() {
      this.expanded = !this.expanded
    },
    replyClicked() {
      this.replybox = !this.replybox
    },
    upVote() {
      if (this.level === 0) {
        if (!this.post.your_vote) {
          this.$axios
            .put('/api/posts/' + this.post.id + '/your_vote')
            .then((this.post.your_vote = {}))
          this.post.score++
        } else {
          this.$axios
            .delete('/api/posts/' + this.post.id + '/your_vote')
            .then((this.post.your_vote = null))
          this.post.score--
        }
      } else if (!this.post.your_vote) {
        this.$axios
          .put('/api/comments/' + this.post.id + '/your_vote')
          .then((this.post.your_vote = {}))
        this.post.score++
      } else {
        this.$axios
          .delete('/api/comments/' + this.post.id + '/your_vote')
          .then((this.post.your_vote = null))
        this.post.score--
      }
    },
    async loadReplies() {
      const data = await this.$axios.$get(
        '/api/posts/' + this.post.id + '/replies'
      )
      this.post.comments = data.items
    },
    gotReplies(d) {
      this.post.comments = d.data.items
      this.loaded = true
      //      this.post.comments = this.post.replies;
    },
    submit(editorcontent) {
      if (editorcontent === '') {
        this.alerttext = 'Type a repsonse before submitting!'
        this.alerttimeout = 5000
        this.showalert = true
        return
      }
      const submission = {}
      submission.content_markdown = editorcontent

      if (this.level === 0)
        this.$axios
          .post('/api/posts/' + this.post.id + '/replies', submission)
          .then(this.submitsuccess)
          .catch(this.submitfailed)
      else
        this.$axios
          .post('/api/comments/' + this.post.id + '/replies', submission)
          .then(this.submitsuccess)
          .catch(this.submitfailed)
    },
    submitsuccess() {
      this.alerttext = 'Reply submitted!'
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
.post img {
  max-width: 100%;
  max-height: 800px;
}

blockquote blockquote {
  display: inline;
}

blockquote::before {
  display: inline;
  content: ' | ';
}

blockquote p {
  display: inline;
}

.v-card__text,
.v-card__title {
  word-break: break-word; /* maybe !important  */
}

.v-list-item__subtitle {
  word-break: break-word !important;
  white-space: normal;
}

.expandbutton {
  display: inline-block;
  width: 4em;
  vertical-align: top;
}
</style>
