<template>
  <v-app-bar app color="primary">
    <v-toolbar-title>
      <router-link
        :to="{ name: 'Feed' }"
        class="text--primary title text-decoration-none"
        >{{ name }}</router-link
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <TooltipButton
      :to="{ name: 'Communities' }"
      icon="mdi-clipboard-list"
      hover="Community List"
    />

    <PreferencesMenu />
    <SearchMenu />
    <AuthMenu />
  </v-app-bar>
</template>

<script>
import AuthMenu from "@/components/menu/AuthMenu";
import SearchMenu from "@/components/menu/SearchMenu";
import PreferencesMenu from "@/components/menu/PreferencesMenu";
import TooltipButton from "@/components/TooltipButton";
import { mapState } from "vuex";

export default {
  name: "AppBar",
  components: { TooltipButton, PreferencesMenu, SearchMenu, AuthMenu },

  computed: {
    ...mapState("$feed", ["community"]),

    /** @returns {string} */
    name() {
      return (this.$route.name === "Community" ||
        this.$route.name === "Post") &&
        this.community.name
        ? this.community.name
        : "Hoot";
    },
  },
};
</script>
