<template>
  <div v-if="loaded" :style="'margin-left: ' + level + 'em;' " class="post">
    <div class="expandbutton" v-if="level!=0">
      <tooltipbutton :clicked="expandClicked" :icon="expanded ? 'mdi-minus' : 'mdi-plus'" :hover="expanded ? 'Compress' : 'Expand'"></tooltipbutton>
    </div>
    <div style="display: inline-block;">
      <username :userid="post.author.id" :username="post.author.username"></username>
      <span>  @{{ post.author.host }}
          {{ post.score }} points, <since :Timestamp="post.created"></since></span>
      <br>
      <span v-if="expanded"
            class="post">
        <br>
                 <span v-html="post.content_html ? post.content_html : post.content_text">
                 </span>
            </span>
      <br>
      <tooltipbutton v-if="$store.state.LoggedIn" :clicked="upVote" :icon="post.your_vote ? 'mdi-cards-heart' : 'mdi-heart-outline'" :hover="post.your_vote ? 'Un-love' : 'Love'"></tooltipbutton>
      <tooltipbutton v-if="$store.state.LoggedIn" :clicked="replyClicked" icon="mdi-reply" hover="Reply"></tooltipbutton>

    </div>
    <v-card v-if="replybox">
      <v-card-title>Reply to {{ post.author.username }}</v-card-title>
      <v-card-text>
        <editor :submit="submit"></editor>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
      <post v-for="(p, i) in post.replies.items" :id="i" :key="i" :level="level+1" :post="p"></post>
    <v-snackbar v-model="showalert" :timeout="alerttimeout">{{ alerttext }}</v-snackbar>
  </div>
</template>
<script>
import Since from "../components/Since";
import Username from '../components/Username';
import Editor from "../components/Editor"
import Tooltipbutton from "@/components/Tooltipbutton";

export default {
  components: {
    Since,
    Username,
    Editor,
    Tooltipbutton,
  },
  data: function () {
    return {
      expanded: true,
      replybox: false,
      showalert: false,
      alerttimeout: 5000,
      alerttext: '',
      loaded: false,
    };
  },
  name: "post",
  props: {
    post: Object,
    id: Number,
    level: Number,
  },
  methods: {
    expandClicked: function() {
      this.expanded=!this.expanded;
    },
    replyClicked: function() {
      this.replybox=!this.replybox;
    },
    upVote: function () {
      if (this.level == 0) {
        if (!this.post.your_vote) {
          this.$http.put(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/your_vote").then(this.post.your_vote = {});
          this.post.score++;
        } else {
          this.$http.delete(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/your_vote").then(this.post.your_vote = null);
          this.post.score--;
        }
      } else {
        if (!this.post.your_vote) {
          this.$http.put(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/your_vote").then(this.post.your_vote = {});
          this.post.score++;
        } else {
          this.$http.delete(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/your_vote").then(this.post.your_vote = null);
          this.post.score--;
        }

      }
    },
    loadReplies: function () {
      this.$http.get(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/replies").then(this.gotReplies);
    },
    gotReplies: function (d) {
      this.post.comments = d.data.items;
      this.loaded=true;
//      this.post.comments = this.post.replies;
    },
    submit: function (editorcontent) {
      if (editorcontent == "") {
        this.alerttext = "Type a repsonse before submitting!"
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }
      var submission = {};
      submission.content_markdown = editorcontent;

      if (this.level == 0) this.$http.post(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/replies", submission).then(this.submitsuccess).catch(this.submitfailed);
      else this.$http.post(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/replies", submission).then(this.submitsuccess).catch(this.submitfailed);

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
    }
  },
  computed: {
    bgcolor: function () {
      if (this.$index() % 2) {
        return ("rgba(0,0,0,0)");
      }
      return ("rgba(0,0,0,0.5)");
    },
    posttest: function () {
      console.log(this.post);
      return "";
    }
  },
  mounted: function () {

    if (this.post.score == "") {
      this.post.score = 0;
    }
    if (this.level==0)
      this.loadReplies();
    else
        this.loaded=true;
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

.v-card__text, .v-card__title {
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