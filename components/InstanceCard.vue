<template>
  <v-card>
    <v-card-title> Hoot </v-card-title>
    <v-card-subtitle> lotide: {{ software.version }} </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      This is hoot! Hoot is really cool. It's a "federated" reddit, using a
      thing called lotide! If you're the instance owner, you can change this
      card by editing <b>/content/InstanceCard.md</b>, or you can get rid of it
      by deleting the file
    </v-card-text>
    <v-card-actions>
      <v-btn text> dismiss </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" nuxt to="/communities" depressed>
        Find Communities
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      software: {},
    }
  },
  async fetch() {
    try {
      const { software } = await this.$axios.$get(`/instance`)
      this.software = software
    } catch (err) {
      console.error(err)
    }
  },
}
</script>
