<template>
  <div>
    <Community
      v-for="community in communities"
      :key="community.id"
      :community="community"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Community from "../components/Community";

export default {
  name: "Communities",
  components: { Community },
  mounted() {
    if (this.communities.length === 0) {
      this.getCommunities();
    }
  },

  methods: {
    ...mapActions("$community", ["getCommunities"]),
  },

  computed: {
    ...mapState("$community", ["communities"]),
  },
};
</script>

<style scoped></style>
