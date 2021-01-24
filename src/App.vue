<template>
  <v-app :dark="dark">
    <AppBar />

    <Node></Node>

    <v-main>
      <v-container fluid style="padding: 0">
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>

    <v-snackbar
      v-model="snackbar"
      :timeout="snackbartimeout"
      :color="snackbarcolor"
    >
      <v-icon v-html="snackbaricon"></v-icon>
      {{ snackbartext }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Node from "./components/Node.vue";
import EventBus from "./EventBus.js";
import AppBar from "@/components/menu/AppBar";

export default {
  name: "App",
  components: {
    AppBar,
    Node,
  },

  data: () => ({
    viewkey: 0,
    snackbar: false,
    snackbartimeout: 5000,
    snackbartext: "",
    snackbarcolor: "",
    snackbaricon: "",
  }),
  mounted() {
    this.$vuetify.theme.dark = this.$store.state.$preferences.dark;
    EventBus.$on("message", this.showMessage);
    EventBus.$on("error", this.showError);
  },
  methods: {
    ...mapActions("$auth", ["logout"]),
    /*logout() {
      this.$http.post(this.$LOTIDE + "/unstable/logins/~current");

      this.$store.commit("setToken", "");
      this.$store.commit("setUsername", "");
      this.useractions = false;
      this.viewkey = Date.now();
      this.$router.go();
    },*/
    failedSignup() {
      EventBus.$emit("error", "Username is not available, try another");
    },
    failedLogin() {
      EventBus.$emit("error", "Login failed");
    },
    showMessage(text) {
      this.snackbartext = text;
      this.snackbarcolor = "primary";
      this.snackbaricon = "mdi-information";
      this.snackbar = true;
    },
    showError(text) {
      this.snackbartext = text;
      this.snackbarcolor = "error";
      this.snackbaricon = "mdi-alert-circle";
      this.snackbar = true;
    },
  },

  computed: {
    ...mapState("$preferences", ["dark"]),
    ...mapState("$auth", ["user"]),
  },
};
</script>
<style>
@import "~easymde/dist/easymde.min.css";
</style>
