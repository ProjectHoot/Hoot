<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on"><v-icon color="gray">mdi-cog</v-icon></v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>
          <TooltipButton
            :clicked="toggleDark"
            :icon="flashlightIcon"
            hover="Toggle Dark/Light Mode"
        /></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from "vuex";
import TooltipButton from "@/components/TooltipButton";

export default {
  name: "PreferencesMenu",
  components: { TooltipButton },

  methods: {
    toggleDark() {
      this.$store.commit("$preferences/setDarkState", !this.dark);
    },
  },

  computed: {
    ...mapState("$preferences", ["dark"]),

    /** @returns {string} */
    flashlightIcon() {
      return this.dark ? "mdi-flashlight-off" : "mdi-flashlight";
    },
  },
};
</script>

<style scoped></style>
