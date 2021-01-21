<template>
  <v-list>
    <v-list-item :style="'margin-left: ' + level + 'em;'">
      <v-list-item-content>
        <v-list-item-title>
          <v-btn v-if="level > 0" icon @click="expanded = !expanded"
            ><v-icon v-html="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon
          ></v-btn>
          <Username :username="post.author.username" :userid="post.author.id" />
          <span style="font-size: 0.6em"> @{{ post.author.host }}</span>
          <br /><span style="font-size: 0.6em">
            {{ post.score }} points <Since :Timestamp="post.created"
          /></span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span class="post" v-if="expanded">
            <span
              v-html="post.content_html ? post.content_html : post.content_text"
            >
            </span>
            <v-dialog overlay-opacity="1" v-model="replybox">
              <Editor :submit="submit" />
            </v-dialog>
          </span>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-btn icon @click="upVote"
            ><v-icon
              :color="post.your_vote ? 'primary' : 'secondary'"
              v-html="post.your_vote ? 'mdi-arrow-up-bold' : 'mdi-arrow-up'"
            ></v-icon
          ></v-btn>
          <v-btn icon @click="replybox = !replybox"
            ><v-icon>mdi-reply</v-icon></v-btn
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div v-if="post.comments && expanded">
      <Post
        v-for="(p, i) in post.comments"
        :level="level + 1"
        :key="i"
        :post="p"
        :id="i"
      />
    </div>
    <div v-else-if="post.has_replies && expanded">
      <v-btn @click="loadReplies">Load more replies...</v-btn>
      <br /><br />
    </div>

    <v-snackbar v-model="showalert" :timeout="alerttimeout">{{
      alerttext
    }}</v-snackbar>
  </v-list>
</template>
<script>
import Since from "../components/Since";
import Username from "../components/Username";
import Editor from "../components/Editor";

export default {
  components: {
    Since,
    Username,
    Editor,
  },
  data: function () {
    return {
      expanded: true,
      replybox: false,
      showalert: false,
      alerttimeout: 5000,
      alerttext: "",
    };
  },
  name: "post",
  props: {
    post: Object,
    id: Number,
    level: Number,
  },
  methods: {
    upVote: function () {
      if (this.level == 0) {
        if (!this.post.your_vote) {
          this.$http
            .put(
              this.$LOTIDE + "/unstable/posts/" + this.post.id + "/your_vote"
            )
            .then((this.post.your_vote = {}));
          this.post.score++;
        } else {
          this.$http
            .delete(
              this.$LOTIDE + "/unstable/posts/" + this.post.id + "/your_vote"
            )
            .then((this.post.your_vote = null));
          this.post.score--;
        }
      } else {
        if (!this.post.your_vote) {
          this.$http
            .put(
              this.$LOTIDE + "/unstable/comments/" + this.post.id + "/your_vote"
            )
            .then((this.post.your_vote = {}));
          this.post.score++;
        } else {
          this.$http
            .delete(
              this.$LOTIDE + "/unstable/comments/" + this.post.id + "/your_vote"
            )
            .then((this.post.your_vote = null));
          this.post.score--;
        }
      }
    },
    loadReplies: function () {
      this.$http
        .get(this.$LOTIDE + "/unstable/comments/" + this.post.id)
        .then(this.gotReplies);
    },
    gotReplies: function (d) {
      this.post = d.data;
      this.post.comments = this.post.replies;
    },
    submit: function (editorcontent) {
      if (editorcontent == "") {
        this.alerttext = "Type a repsonse before submitting!";
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }
      var submission = {};
      submission.content_markdown = editorcontent;

      if (this.level == 0)
        this.$http
          .post(
            this.$LOTIDE + "/unstable/posts/" + this.post.id + "/replies",
            submission
          )
          .then(this.submitsuccess)
          .catch(this.submitfailed);
      else
        this.$http
          .post(
            this.$LOTIDE + "/unstable/comments/" + this.post.id + "/replies",
            submission
          )
          .then(this.submitsuccess)
          .catch(this.submitfailed);
    },
    submitsuccess: function () {
      this.alerttext = "Reply submitted!";
      this.alerttimeout = 5000;
      this.showalert = true;
      this.replybox = false;
      this.$router.go();
    },
    submitfailed: function (e) {
      this.alerttext = "Error: " + e.response.status + " : " + e.response.data;
      this.alerttimeout = 5000;
      this.showalert = true;
    },
  },
  created: function () {
    if (this.post.replies) {
      this.post.comments = this.post.replies;
    }
  },
  computed: {
    bgcolor: function () {
      if (this.$index() % 2) {
        return "rgba(0,0,0,0)";
      }
      return "rgba(0,0,0,0.5)";
    },
    posttest: function () {
      console.log(this.post);
      return "";
    },
  },
  mounted: function () {
    console.log;
    if (this.post.score == "") {
      this.post.score = 0;
    }
  },
};
</script>

<style>
.post img {
  max-width: 100%;
  max-height: 800px;
}
blockquote blockquote {
  display: inline;
}
blockquote:before {
  display: inline;
  content: " | ";
}
blockquote p {
  display: inline;
}

.v-card__text,
.v-card__title {
  word-break: break-word; /* maybe !important  */
}

.outerdiv:nth-of-type(odd) {
  background: rgba(0, 0, 0, 0.5);
}
.v-list-item__subtitle {
  word-break: break-word !important;
  white-space: normal;
}
</style>
