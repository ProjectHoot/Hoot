<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                By {{ post.author.username }}@{{ post.author.host }}         <since :Timestamp="post.created"></since><br>
                <span v-if="post.content_html" v-html="post.content_html"></span>
                <span v-else-if="post.content_text" v-html="post.content_text"></span>
                <br>

        <v-btn  icon @click="upVote(post.id)"
          ><v-icon  >mdi-arrow-up</v-icon></v-btn
        >
        <v-btn icon @click="downVote(post.id)"
          ><v-icon >mdi-arrow-down</v-icon></v-btn
        >
        <v-btn text @click="doReply(post.id)">Reply</v-btn>

    <div v-if="post.comments">
        <div v-for="(p, i) in post.comments" :key="i">
          <post :post="p" :id="i"></post>
        </div>
      </div>

      <div v-if="post.has_replies">
          |_
        <div v-for="(p, i) in post.replies" :key="i">
          <post :post="p" :id="i"></post>
        </div>
      </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Since from "../components/Since";

export default {
  components: {
    Since,
  },
  name: "post",
  props: {
    post: Object,
    id: Number,
  },
  mounted: function () {
    console.log;
  },
};
</script>
