<template>
  <div>
    <CommunityItem
      v-for="community in communities"
      :key="community.id"
      :community="community"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CommunityItem from "../components/CommunityItem";

export default {
  name: "Communities",
  components: { CommunityItem },
  mounted() {
    if (this.communities.length === 0) {
      this.getCommunities(this.loggedIn);
    }
  },

  methods: {
    ...mapActions("$community", ["getCommunities"]),
  },

  computed: {
    ...mapGetters("$auth", ["loggedIn"]),
    ...mapState("$community", ["communities"]),
  },
};
</script>

<style scoped></style>
