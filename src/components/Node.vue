<template>
  <div></div>
</template>
<script>
import EventBus from "../EventBus.js";

export default {
  data: () => ({
    theInfo: "Loading",
  }),

  mounted() {
    this.$http
      .get(this.$LOTIDE + "/unstable/instance")
      .then(this.gotServerInfo);
  },

  methods: {
    gotServerInfo(d) {
      EventBus.$emit(
        "message",
        "Connected to server " +
          d.data.software.name +
          " version " +
          d.data.software.version
      );
    },
  },
};
</script>
