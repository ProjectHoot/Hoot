<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <router-link
          :to="{ name: 'Feed' }"
          class="text--primary title text-decoration-none"
          >Hoot
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <tooltipbutton
        :to="{ name: 'Community List' }"
        hover="Community List"
        icon="mdi-clipboard-list"
      ></tooltipbutton>
      <tooltipbutton
        :clicked="toggleDark"
        :icon="$store.state.Dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
        hover="Toggle Dark/Light Mode"
      ></tooltipbutton
      ><v-menu
        v-model="searchwindow"
        :close-on-click="false"
        :close-on-content-click="false"
        ><template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn v-bind="attrs" v-on="{ ...tooltip, ...menu }" icon>
                <v-icon class="text--primary">mdi-magnify</v-icon>
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
            /><v-row>
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
      <v-menu v-if="$store.state.LoggedIn" v-model="useractions" offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn v-bind="attrs" v-on="{ ...tooltip, ...menu }" text>
                <v-icon color="gray">mdi-account</v-icon>
                {{ $store.state.Username }}
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
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon color="gray">mdi-account</v-icon>
          </v-btn>
        </template>
        <v-tabs v-model="logintabs">
          <v-tab key="0">Login</v-tab>
          <v-tab key="1">Signup</v-tab>
        </v-tabs>
        <v-tabs-items v-model="logintabs">
          <v-tab-item key="0">
            <v-card>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="loginform.username" label="Username" />
                  <v-text-field
                    v-model="loginform.password"
                    label="Password"
                    type="password"
                  />
                  <v-btn @click="login">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="1">
            <v-card>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="loginform.username" label="Username" />
                  <v-text-field
                    v-model="loginform.password"
                    label="Password"
                    type="password"
                  />
                  <v-alert
                    v-if="
                      loginform.password.length != 0 &&
                        loginform.password.length < 6
                    "
                  >
                    <v-icon>mdi-alert-circle</v-icon>
                    Password must be at least 6 characters
                  </v-alert>

                  <v-text-field
                    v-model="loginform.repeatpassword"
                    label="Repeat Password"
                    type="password"
                  />
                  <v-alert
                    v-if="loginform.password != loginform.repeatpassword"
                  >
                    <v-icon>mdi-alert-circle</v-icon>
                    Passwords don't match
                  </v-alert>

                  <v-text-field
                    v-model="loginform.email"
                    label="Email (optional)"
                    type="text"
                  />
                  <v-btn @click="signup">Sign Up</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-menu>
    </v-app-bar>

    <node></node>

    <v-main>
      <v-container fluid style="padding: 0">
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarcolor"
      :timeout="snackbartimeout"
    >
      <v-icon v-html="snackbaricon"></v-icon>
      {{ snackbartext }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Node from "./components/Node.vue";
import Tooltipbutton from "./components/Tooltipbutton.vue";
import EventBus from "./EventBus.js";

export default {
  name: "App",
  components: {
    Node,
    Tooltipbutton
  },

  data: () => ({
    useractions: false,
    limitsearch: true,
    searchwindow: false,
    loginform: {
      username: "",
      password: "",
      repeatpassword: "",
      email: ""
    },
    viewkey: 0,
    snackbar: false,
    logintabs: 0,
    snackbartimeout: 5000,
    snackbartext: "",
    snackbarcolor: "",
    snackbaricon: ""
    //
  }),
  mounted: function() {
    this.$vuetify.theme.dark = this.$store.state.Dark;
    if (this.$store.state.Username) this.$store.commit("login");

    EventBus.$on("message", this.showmessage);
    EventBus.$on("error", this.showerror);
  },
  methods: {
    login: function() {
      var postData = {};
      postData.username = this.loginform.username;
      postData.password = this.loginform.password;
      this.$http
        .post(this.$LOTIDE + "/unstable/logins", postData)
        .then(this.gotLogin)
        .catch(this.failedLogin);
    },
    logout: function() {
      this.$http.post(this.$LOTIDE + "/unstable/logins/~current");

      this.$store.commit("setToken", "");
      this.$store.commit("setUsername", "");
      this.$store.commit("logout");

      this.useractions = false;
      this.viewkey = Date.now();
      this.$router.go();
    },
    profile: function() {
      this.$router.push("/me");
    },
    signup: function() {
      // Basic form validation
      if (this.loginform.username.length < 3) {
        alert("Username must be 3 or more characters");
        return;
      }
      if (this.loginform.password.length < 6) {
        alert("Password must be 6 or more characters");
        return;
      }
      if (this.loginform.password != this.loginform.repeatpassword) {
        alert("Passwords do not match");
        return;
      }
      if (this.loginform.email.length > 0) {
        // Make sure email isn't clearly invalid
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
        if (!re.test(this.loginform.email)) {
          alert("Email address is invalid");
          return;
        }
      }
      // Actually do the thing
      var postData = {};
      postData.username = this.loginform.username;
      postData.password = this.loginform.password;
      if (this.loginform.email != "") {
        postData.email_address = this.loginform.email;
      }
      postData.login = true;
      this.$http
        .post(this.$LOTIDE + "/unstable/users", postData)
        .then(this.gotLogin)
        .catch(this.failedSignup);
    },
    gotLogin: function(d) {
      this.$store.commit("setToken", d.data.token);
      this.$store.commit("setUsername", this.loginform.username);
      this.$store.commit("login");

      this.useractions = false;
      this.loginform.username = "";
      this.loginform.password = "";
      this.loginform.repeatpassword = "";
      this.loginform.email = "";
      this.viewkey = Date.now();
      this.$router.go();
    },
    failedSignup: function() {
      EventBus.$emit("error", "Username is not available, try another");
    },
    failedLogin: function() {
      EventBus.$emit("error", "Login failed");
    },
    showmessage: function(d) {
      this.snackbartext = d;
      this.snackbarcolor = "primary";
      this.snackbaricon = "mdi-information";
      this.snackbar = true;
    },
    showerror: function(d) {
      this.snackbartext = d;
      this.snackbarcolor = "error";
      this.snackbaricon = "mdi-alert-circle";
      this.snackbar = true;
    },
    toggleDark: function() {
      var tmp = this.$store.state.Dark;
      this.$store.commit("setDark", !tmp);
      this.$vuetify.theme.dark = this.$store.state.Dark;
    }
  }
};
</script>
<style>
@import "~easymde/dist/easymde.min.css";
</style>
