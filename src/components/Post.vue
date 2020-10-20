<template>
    <div :style="'margin-left: ' + level/4 +'em'">
    <v-card color="rgba(0,0,0,0)" :elevation="level>0 ? 5 : 0" class="post">
        <v-card-subtitle style="font-weight: bold; overflow-x: hidden">
            <v-btn v-if="level>0" icon @click="expanded=!expanded"><v-icon v-html="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon></v-btn>
                 <span>By {{ post.author.username }} @ {{ post.author.host }} <since :Timestamp="post.created"></since></span><br>
        </v-card-subtitle>
        <v-card-text v-if="expanded" >
            <span v-html="post.content_html ? post.content_html : post.content_text"></span>
        </v-card-text>
        <v-card-actions v-if="expanded && $store.state.Username">    
             <v-btn icon @click="upVote"><v-icon v-html="post.your_vote ? 'mdi-arrow-up-bold' : 'mdi-arrow-up'" ></v-icon></v-btn>
             <v-btn text @click="replybox=!replybox">Reply</v-btn>
        </v-card-actions>
            <v-card-text  v-if="replybox">
                <vue-easymde v-model="editorcontent" :configs="editorconfig" ></vue-easymde>
                <v-btn @click="submit">Submit</v-btn>
            </v-card-text>
    </v-card>
    <br>
        <div v-if="post.comments  && expanded">
           <post v-for="(p, i) in post.comments" :level="level+1" :key="i" :post="p" :id="i"></post>
        </div>
        <div v-else-if="post.has_replies && expanded">
            <v-btn @click="loadReplies">Load more replies...</v-btn>
        </div>
                <v-snackbar v-model="showalert" :timeout="alerttimeout">{{ alerttext }}</v-snackbar>

    </div>
</template>
<script>
import Since from "../components/Since";
import VueEasymde from "vue-easymde";




export default {
  components: {
    Since,
    VueEasymde,
  },
  data: function () {
    return {
      expanded: true,
      replybox: false,
      editorcontent: '',
      editorconfig: {
          hideIcons:["fullscreen", "side-by-side" ],

      },
    showalert: false,
    alerttimeout: 5000,
    alerttext: '',
    };
  },
  name: "post",
  props: {
    post: Object,
    id: Number,
    level: Number
  },
  methods: {
      upVote: function() {
        if (this.level==0) {
            if (!this.post.your_vote) {
                this.$http.put(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/your_vote").then(this.post.your_vote={});
            } else {
                this.$http.delete(this.$LOTIDE +  "/unstable/posts/" + this.post.id + "/your_vote").then(this.post.your_vote=null);
            }
        } else {
            if (!this.post.your_vote) {
                this.$http.put(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/your_vote").then(this.post.your_vote={});
            } else {
                this.$http.delete(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/your_vote").then(this.post.your_vote=null);
            }

        }
      },
      loadReplies: function() {
          this.$http.get(this.$LOTIDE + "/unstable/comments/" + this.post.id).then(this.gotReplies);
      },
      gotReplies: function(d) {
          this.post=d.data;
          this.post.comments=this.post.replies;
      },
    submit: function() {
        if (this.editorcontent=="") {
            this.alerttext="Type a repsonse before submitting!"
            this.alerttimeout=5000;
            this.showalert=true;
            return;
        }
        var submission={};
        submission.content_markdown=this.editorcontent;

        if (this.level==0) this.$http.post(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/replies", submission).then(this.submitsuccess).catch(this.submitfailed);
        else this.$http.post(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/replies", submission).then(this.submitsuccess).catch(this.submitfailed);

    },
    submitsuccess: function() {
        this.alerttext="Reply submitted!";
        this.alerttimeout=5000;
        this.showalert=true;
        this.replybox=false;
        this.$router.go();
  },
    submitfailed: function(e) {
        this.alerttext="Error: " + e.response.status + " : " + e.response.data;
        this.alerttimeout=5000;
        this.showalert=true;
    }
  },
  created: function() {
      if (this.post.replies) {
          this.post.comments=this.post.replies;
      }
  },
  mounted: function () {
    console.log;
  },
};
</script>

<style >
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
  word-break: normal; /* maybe !important  */
}
</style>