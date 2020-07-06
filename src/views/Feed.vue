<template>
  <v-container>
    <v-row v-for="post in orderedPosts" :key="post.id">
      <v-col cols="12">
        <v-card class="text-primary">
          <v-card-text>
            <v-row>
              <v-col cols="12" class="pb-0 mb-0">
                <router-link class="text-h5 text-decoration-none" :to="{ name: 'PostShow', params: { postID: post.id } }">{{ post.title }}</router-link>
              </v-col>
              <v-col cols="12" class="pt-0 mt-0">
                <span class="text--secondary">Posted by <router-link to="" class="grey--text">{{ post.authorUsername }}</router-link> on {{ post.postedDate | moment("MMM DD YYYY, h:MMa") }}</span>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-row justify="space-around">
              <v-col cols="4" class="text-left">
                <v-icon @click="upVote(post.id)">
                  mdi-arrow-up-bold
                </v-icon>
                <span>
                  {{ post.voteCount }}
                </span>
                <v-icon @click="downVote(post.id)">
                  mdi-arrow-down-bold
                </v-icon>
              </v-col>
              <v-spacer />
              <v-col cols="4" class="text-right">
                <v-icon @click="goToComments(post.id)">
                  mdi-message-reply
                </v-icon>
                {{ post.commentCount }}
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['posts']),
    orderedPosts() {
      return this.posts
    },
  },
  data() {
    return {
    }
  },
  methods: {
    goToUser() {
      return;
    },
    upVote() {
      return;
    },
    downVote() {
      return;
    },
    goToComments(postID) {
      this.$router.push({name: "PostShow", params: { postID: postID }})
    }
  },
}
</script>
