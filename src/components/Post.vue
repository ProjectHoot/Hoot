<template>
    <v-list-item>
        <v-list-item-action>
            <v-btn v-if="!top" icon @click="expanded=!expanded"><v-icon v-html="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon></v-btn>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title class="text-h5" >
                 By {{ post.author.username }}@{{ post.author.host }}         <since :Timestamp="post.created"></since><br>
             </v-list-item-title>

             <v-list-item-subtitle  v-if="expanded" v-html="post.content_html ? post.content_html : post.content_text"></v-list-item-subtitle>
             <span  v-if="expanded"><v-btn icon @click="upVote(post.id)"><v-icon  >mdi-arrow-up</v-icon></v-btn>
             <v-btn text>Reply</v-btn></span>
                <v-list v-if="post.comments && expanded">
                        <post v-for="(p, i) in post.comments" :top="false" :key="i" :post="p" :id="i"></post>
                </v-list>
        </v-list-item-content>

    </v-list-item> 
</template>
<script>
import Since from "../components/Since";

export default {
  components: {
    Since,
  },
  data: function () {
    return {
      expanded: true,
    };
  },
  name: "post",
  props: {
    post: Object,
    id: Number,
    top: Boolean
  },
  created: function() {
      if (this.post.has_replies && this.post.replies) {
          this.post.comments=this.post.replies;
      }
  },
  mounted: function () {
    console.log;
  },
};
</script>
