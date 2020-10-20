<template>
    <v-card outlined transparent>
        <v-card-title>
            <v-btn v-if="!top" icon @click="expanded=!expanded"><v-icon v-html="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon></v-btn>
                 By {{ post.author.username }}@{{ post.author.host }} <since :Timestamp="post.created"></since><br>
        </v-card-title>
        <v-card-text v-if="expanded" class="ql-editor">
            <span v-html="post.content_html ? post.content_html : post.content_text"></span>
        </v-card-text>
        <v-card-actions v-if="expanded && $store.state.Username">    
             <v-btn icon @click="upVote"><v-icon v-html="post.your_vote ? 'mdi-arrow-up-bold' : 'mdi-arrow-up'" ></v-icon></v-btn>
             <v-btn text @click="replybox=!replybox">Reply</v-btn>
        </v-card-actions>
            <v-card-text v-if="replybox">
                <vue-editor v-model="editorcontent" :editor-options="editorOptions" ></vue-editor>
                <v-btn @click="submit">Submit</v-btn>
            </v-card-text>
        <v-card-text v-if="post.comments && expanded">
           <post v-for="(p, i) in post.comments" :top="false" :key="i" :post="p" :id="i"></post>
        </v-card-text>
                <v-snackbar v-model="showalert" :timeout="alerttimeout">{{ alerttext }}</v-snackbar>
    </v-card>
</template>
<script>
import Since from "../components/Since";
import { VueEditor } from "vue2-editor";


export default {
  components: {
    Since,
    VueEditor,
  },
  data: function () {
    return {
      expanded: true,
      replybox: false,
      editorcontent: '',
      editorOptions: {
                    bounds: '#editorrow' // add the wrapper class or id of vue-editor
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
    top: Boolean
  },
  methods: {
      upVote: function() {
        if (this.top) {
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
    submit: function() {
        if (this.editorcontent=="") {
            this.alerttext="Type a repsonse before submitting!"
            this.alerttimeout=5000;
            this.showalert=true;
            return;
        }
        var submission={};
        submission.content_markdown=this.editorcontent;

        if (this.top) this.$http.post(this.$LOTIDE + "/unstable/posts/" + this.post.id + "/replies", submission).then(this.submitsuccess).catch(this.submitfailed);
        else this.$http.post(this.$LOTIDE + "/unstable/comments/" + this.post.id + "/replies", submission).then(this.submitsuccess).catch(this.submitfailed);

    },
    submitsuccess: function() {
        this.alerttext="Reply submitted!";
        this.alerttimeout=5000;
        this.showalert=true;
        this.replybox=false;
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
