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
import Node from "./components/Node.vue";
import TooltipButton from "./components/TooltipButton.vue";
import EventBus from "./EventBus.js";
import LoginForm from "@/modules/auth/components/LoginForm";
import RegistrationForm from "@/modules/auth/components/RegistrationForm";
import { mapActions, mapState } from "vuex";
import AppBar from "@/components/menu/AppBar";

export default {
  name: "App",
  components: {
    AppBar,
    Node,
  },

  data: () => ({
    useractions: false,
    limitsearch: true,
    searchwindow: false,
    viewkey: 0,
    snackbar: false,
    logintabs: 0,
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
    profile() {
      this.$router.push("/me");
    },
    gotLogin: function (d) {
      this.$store.commit("setToken", d.data.token);
      this.$store.commit("setUsername", this.loginform.username);
      this.useractions = false;
      this.loginform.username = "";
      this.loginform.password = "";
      this.loginform.repeatpassword = "";
      this.loginform.email = "";
      this.viewkey = Date.now();
      this.$router.go();
    },
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
