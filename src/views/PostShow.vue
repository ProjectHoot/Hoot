<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="text-center" justify="space-around" align="center">
        <v-row>
          <v-icon @click="upVote(post.id)">
            mdi-arrow-up-bold
          </v-icon>
        </v-row>

        <v-row>
          <span>
            {{ post.voteCount }}
          </span>
        </v-row>

        <v-row>
          <v-icon @click="downVote(post.id)">
            mdi-arrow-down-bold
          </v-icon>
        </v-row>
      </v-col>
      <v-col cols="10" class="display-1 primary--text">
        {{ post.title }}
      </v-col>

      <v-col cols="12">
        <span class="text--secondary"><router-link to="" class="grey--text">{{ post.authorUsername }}</router-link> on {{ post.postedDate | moment("MMM DD YYYY, h:MMa") }}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        {{ post.postContent }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  created() {
    this.fetchData();
  },
  watch: {
    postID() {
      this.fetchData()
    },
  },
  computed: {
    ...mapGetters(['postWithID']),
    postID() {
      return this.$route.params['postID']
    },
  },
  data() {
    return {
      post: {},
    }
  },
  methods: {
    fetchData() {
      this.post = {}
      this.post = Object.assign({}, this.postWithID(this.postID));
    },
    upVote() {
      return;
    },
    downVote() {
      return;
    },
  },
}
</script>
