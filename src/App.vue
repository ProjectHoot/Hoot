<template>
  <v-app :dark="dark">
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <router-link
          :to="{ name: 'Feed' }"
          class="text--primary title text-decoration-none"
          >Hoot</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <TooltipButton
        :to="{ name: 'Community List' }"
        icon="mdi-clipboard-list"
        hover="Community List"
      />
      <TooltipButton
        :clicked="toggleDark"
        :icon="$store.state.Dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
        hover="Toggle Dark/Light Mode"
      />
      <v-menu
        v-model="searchwindow"
        :close-on-click="false"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }"
                ><v-icon class="text--primary">mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Search</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title>This isn't implemented yet</v-card-title>
          <v-card-text>
            <v-text-field
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
            />
            <v-checkbox
              v-model="limitsearch"
              label="Limit results to this server"
            />
            <v-row>
              <v-col cols="6">
                <v-btn dense @click="searchwindow = false">Search!</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn dense @click="searchwindow = false">Close</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-menu v-if="loggedIn" v-model="useractions" offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn text v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                <v-icon color="gray">mdi-account</v-icon>
                {{ user.username }}
              </v-btn>
            </template>
            <span>User Settings</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item @click="logout">Logout</v-list-item>
          <v-list-item @click="profile">Profile</v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        v-else
        v-model="useractions"
        :close-on-content-click="false"
        offset-y
        :nudge-width="200"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"
            ><v-icon color="gray">mdi-account</v-icon></v-btn
          >
        </template>
        <v-tabs v-model="logintabs">
          <v-tab key="0">Login</v-tab>
          <v-tab key="1">Signup</v-tab>
        </v-tabs>
        <v-tabs-items v-model="logintabs">
          <v-tab-item key="0">
            <v-card>
              <v-card-text>
                <LoginForm />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="1">
            <v-card>
              <v-card-text>
                <RegistrationForm />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-menu>
    </v-app-bar>

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

export default {
  name: "App",
  components: {
    RegistrationForm,
    LoginForm,
    Node,
    TooltipButton,
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
    toggleDark() {
      this.$store.commit("$preferences/setDarkState", !this.dark);
    },
  },

  computed: {
    ...mapState("$preferences", ["dark"]),
    ...mapState("$auth", ["user"]),

    loggedIn() {
      return Boolean(this.$store.state.$auth.token);
    },
  },
};
</script>
<style>
@import "~easymde/dist/easymde.min.css";
</style>
