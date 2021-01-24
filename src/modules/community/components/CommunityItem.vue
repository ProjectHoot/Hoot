<template>
  <v-card elevation="2" @click="gotoCommunity" class="mt-2">
    <v-card-title>
      {{ community.name }}
    </v-card-title>
    <v-card-subtitle>{{ community.host }}</v-card-subtitle>
  </v-card>
</template>

<script>
import Community from "../models/community";

export default {
  name: "CommunityItem",
  props: {
    community: {
      type: Community,
      required: true,
    },
  },

  methods: {
    gotoCommunity() {
      this.$router.push({
        name: "Community",
        params: {
          id: this.community.id,
          name: this.community.name
        },
      });
    }
  }
};
</script>

<style scoped></style>
