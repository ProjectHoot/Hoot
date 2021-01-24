<template>
  <v-app-bar app color="primary">
    <v-toolbar-title>
      <router-link
        :to="{ name: 'Feed' }"
        class="text--primary title text-decoration-none"
        >Hoot</router-link
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <PreferencesMenu />
    <SearchMenu />
    <AuthMenu v-if="!loggedIn" />
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import AuthMenu from "@/components/menu/AuthMenu";
import SearchMenu from "@/components/menu/SearchMenu";
import PreferencesMenu from "@/components/menu/PreferencesMenu";

export default {
  name: "AppBar",
  components: { PreferencesMenu, SearchMenu, AuthMenu },

  computed: {
    ...mapGetters("$auth", ["loggedIn"]),
  },
};
</script>

<style scoped></style>
