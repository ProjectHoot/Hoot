<template>
  <v-container fluid style="padding: 0">
    <v-card v-if="community != null">
      <v-card-title>{{ community.name }}</v-card-title>
      <v-card-subtitle>{{ community.description }}</v-card-subtitle>
      <v-card-actions>
        <v-btn
          v-if="community.your_follow && community.your_follow.accepted"
          @click="showeditor = !showeditor; showlinkinput = false"
          ><v-icon left>mdi-pencil</v-icon>
          New Post</v-btn
        >
        <v-btn
          v-if="community.your_follow && community.your_follow.accepted"
          @click="showlinkinput = !showlinkinput; showeditor = false"
          ><v-icon left>mdi-link</v-icon>
        New Link</v-btn
        >
        <v-btn
          v-if="
            community.your_follow && community.your_follow.accepted
          "
          @click="unsubscribe"
          ><v-icon left>mdi-trash-can</v-icon>Unsubscribe</v-btn
        >
        <v-btn v-else @click="subscribe"><v-icon left>mdi-plus-box</v-icon>Subscribe</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="showeditor">
      <v-card-title>New Post</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="posttitle"
          placeholder="Post Title"
        ></v-text-field>
        <Editor :submit="submit"> </Editor>
      </v-card-text>
    </v-card>
    <v-card v-if="showlinkinput">
      <v-card-title>New Link</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="posttitle"
          placeholder="Post Title"
        ></v-text-field>
        <form> 
          <input v-model="linkinput" class="linkinput" type="text" placeholder="Enter Url"/>
          <v-btn :disabled="!isValidLinkForm()" class="submitlinkbutton" @click="submitlink">Submit</v-btn>
        </form>
      </v-card-text>
    </v-card>

    <v-list dense two-line v-if="loaded">
      <template v-for="(post, index) in posts">
        <v-list-item style="padding-left: 0" :key="index">
          <v-list-item-action style="margin-right: 4px">
            <v-btn icon v-if="$store.state.Username" @click="upVote(index)"
              ><v-icon v-if="post.your_vote" color="primary"
                >mdi-arrow-up-bold</v-icon
              >
              <v-icon v-else color="secondary">mdi-arrow-up</v-icon>
            </v-btn>
            <span
              style="margin-left: auto; margin-right: auto"
              v-if="post.score != null"
              >{{ post.score }}</span
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link
                class="text-h5 text-decoration-none"
                :to="{
                  name: 'PostShow',
                  params: {
                    community: post.community.name,
                    host: post.community.host,
                    postID: post.id,
                  },
                }"
                >{{ post.title }}</router-link
              >
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--secondary">
                Posted by
                <Username
                  :username="post.author.username"
                  :userid="post.author.id"
                ></Username>@{{ post.author.host }}
                in {{ post.community.name }}@{{ post.community.host }}
                <since :Timestamp="post.created"></since>
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index + 'divider'"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import Username from "../components/Username";
import Since from "../components/Since";
import Editor from "../components/Editor";
export default {
  components: {
    Username,
    Since,
    Editor,
  },
  data() {
    return {
      thecols: "6",
      loaded: false,
      posts: [],
      tempposts: [],
      community: null,
      posttitle: "",
      showeditor: false,
      showlinkinput: false,
      linkinput: ''
    };
  },
  mounted: function () {
      console.log(this.$route.params);

    if (typeof (this.$route.params.communityID) == "undefined") {
      this.loadDefaultPosts();
    } else {
      // Load community info
      if (this.$store.state.Username)
      this.$http
        .get(
          this.$LOTIDE +
            "/unstable/communities/" +
            this.$route.params.communityID +
            "?include_your=true"
        )
        .then(this.gotCommunityInfo);
      else
            this.$http
        .get(
          this.$LOTIDE +
            "/unstable/communities/" +
            this.$route.params.communityID
        )
        .then(this.gotCommunityInfo);

      this.loadPosts();
    }
  },
  methods: {
    subscribe: function () {
      var postdata = {};
      postdata.try_wait_for_accept = true;
      this.$http
        .post(this.$LOTIDE + "/unstable/communities/" + this.community.id + "/follow", postdata)
        .then(this.gotsubscribed);
    },
    gotunsubscribed: function () {
      this.$router.go();
    },
    gotsubscribed: function () {
      this.$router.go();
    },
    unsubscribe: function () {
      var postdata = {};
      postdata.try_wait_for_accept = true;
      this.$http
        .post(
          this.$LOTIDE + "/unstable/communities/" + this.community.id + "/unfollow",
          postdata
        )
        .then(this.gotunsubscribed);
    },
    loadPosts() {
      console.log("Called loadPosts");
      if (this.$store.state.Username != "") {
        this.$http
          .get(
            this.$LOTIDE +
              "/unstable/communities/" +
              this.$route.params.communityID +
              "/posts?include_your=true"
          )
          .then(this.gotPosts);
      } else {
        this.$http
          .get(
            this.$LOTIDE +
              "/unstable/communities/" +
              this.$route.params.communityID +
              "/posts"
          )
          .then(this.gotPosts);
      }
    },
    loadDefaultPosts() {
      console.log("Loading default posts");
      if (this.$store.state.Username != "") {
        this.$http
          .get(
            this.$LOTIDE +
              "/unstable/users/~me/following:posts?include_your=true"
          )
          .then(this.gotFollowingPosts);
      } else {
        this.$http.get(this.$LOTIDE + "/unstable/posts").then(this.gotPosts);
      }
    },
    gotCommunityInfo: function (d) {
      this.community = d.data;
    },
    gotFollowingPosts: function (d) {
      console.log("gotFollowingPosts");
      this.tempposts = d.data;
      this.$http
        .get(this.$LOTIDE + "/unstable/posts?include_your=true")
        .then(this.gotMorePosts);
    },
    gotPosts: function (d) {
      console.log("got posts");
      this.posts = d.data;
      for (var x in this.posts) {
        if (typeof this.posts[x].score == "undefined") this.posts[x].score = 0;
      }
      this.loaded = true;
    },
    gotMorePosts: function (d) {
      for (var i in d.data) {
        var flag = false;
        for (var x in this.tempposts) {
          if (d.data[i].id == this.tempposts[x].id) {
            flag = true;
          }
        }
        if (!flag) {
          this.tempposts.push(d.data[i]);
        }
      }
      this.posts = this.tempposts;
      this.loaded = true;
    },
    goToUser() {
      return;
    },
    upVote: function (index) {
      if (!this.posts[index].your_vote) {
        this.$http
          .put(
            this.$LOTIDE +
              "/unstable/posts/" +
              this.posts[index].id +
              "/your_vote"
          )
          .then((this.posts[index].your_vote = {}));
        this.posts[index].score++;
      } else {
        this.$http
          .delete(
            this.$LOTIDE +
              "/unstable/posts/" +
              this.posts[index].id +
              "/your_vote"
          )
          .then((this.posts[index].your_vote = null));
        this.posts[index].score--;
      }
    },
    downVote() {
      return;
    },
    goToComments(postID) {
      this.$router.push({ name: "PostShow", params: { postID: postID } });
    },
    preview(post) {
      return post.postContent.substring(0, this.thecols * 10);
    },
    submit: function (editorcontent) {
      if (this.posttitle == "") {
        this.alerttext = "Your post needs a title.";
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }
      if (!editorcontent || editorcontent == "") {
        this.alerttext = "Type a response before submitting!";
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }
      var submission = {};
      submission.content_markdown = editorcontent;
      submission.community = this.community.id;
      submission.title = this.posttitle;

      this.$http
        .post(this.$LOTIDE + "/unstable/posts", submission)
        .then(this.submitsuccess)
        .catch(this.submitfailed);
    },
    submitlink: function () {
      if (this.posttitle == "") {
        this.alerttext = "Your post needs a title.";
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }
      if(!this.linkinput || this.linkinput == "") {
        this.alerttext = "Type a url before submitting!";
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }
      if(!this.isValidUrl(this.linkinput)) {
        this.alerttext = "Url is invalid!";
        this.alerttimeout = 5000;
        this.showalert = true;
        return;
      }

      var submission = {};
      submission.href = this.linkinput;
      submission.community = this.community.id;
      submission.title = this.posttitle;

      this.$http
        .post(this.$LOTIDE + "/unstable/posts", submission)
        .then(this.submitsuccess)
        .catch(this.submitfailed);
    },
    isValidUrl: function(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;  
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
    isValidLinkForm: function() {
      return this.posttitle && this.isValidUrl(this.linkinput);
    },
    submitsuccess: function () {
      this.alerttext = "Post submitted!";
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
  }
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