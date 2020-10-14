<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <router-link :to="{ name: 'Feed' }" class="title white--text text-decoration-none">Hoot</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDark">
        <v-icon
          color="secondary"
          v-html="$store.state.Dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
        ></v-icon>
      </v-btn>
      <v-menu v-model="searchwindow" :close-on-click="false" :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <template>
            <span v-on="on">
              <v-icon color="secondary">mdi-magnify</v-icon>
            </span>
          </template>
        </template>
        <v-card>
          <v-card-text>
            <v-text-field label="Search" prepend-inner-icon="mdi-magnify" single-line />
            <v-checkbox v-model="limitsearch" label="Limit results to this server" />
            <v-row>
              <v-col cols="6">
                <v-btn dense @click="searchwindow=false">Search!</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn dense @click="searchwindow=false">Close</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-menu>
        <v-menu v-if="$store.state.Username" v-model="useractions" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on }">
              <v-btn text v-on="on">{{ $store.state.Username }}<v-icon color="gray">mdi-account</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">Logout</v-list-item>
            <v-list-item @click="profile">Profile</v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-else v-model="useractions" :close-on-content-click="false" offset-y :nudge-width="200">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on"><v-icon color="gray">mdi-account</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>Login/Sign Up</v-card-title>
            <v-card-text>
            <v-form>
              <v-text-field label="Username" v-model="loginform.username" />
              <v-text-field type="password" label="Password" v-model="loginform.password" />
              <v-btn @click="login">Login</v-btn>
              <v-btn @click="signup">Sign Up</v-btn>
            </v-form>
            </v-card-text>
            </v-card>
        </v-menu>
    </v-app-bar>
    <node v-on:connected="showsnackbar($event)"></node>
    <v-main>
      <v-container fluid>
        <router-view :key="viewkey"></router-view>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbartimeout"
    >
      {{ snackbartext }}

    </v-snackbar>
  </v-app>
</template>

<script>
import Node  from "./components/Node.vue";

export default {
  name: "App",
   components: {
    Node
  },

  data: () => ({
    useractions: false,
    limitsearch: true,
    searchwindow: false,
    loginform: {
  username: '',
  password: '',
    },
    viewkey: 0,
  snackbar: false,
  snackbartimeout: 5000,
  snackbartext: ""
//
  }),
  mounted: function() {
 console.log("Now setting dark to " +this.$store.state.Dark );
    this.$vuetify.theme.dark=this.$store.state.Dark;

  },
  methods: {
    login: function() {
      var postData={};
      postData.username=this.loginform.username;
      postData.password=this.loginform.password;
      this.$http.post(this.$LOTIDE +"/unstable/logins", postData).then(this.gotLogin).catch(this.failedLogin);
    },
    logout: function() {
      this.$http.post(this.$LOTIDE + "/unstable/logins/~current");

      this.$store.commit("setToken", "");
      this.$store.commit("setUsername", "");
      this.useractions=false;
      this.viewkey=Date.now();
},
    signup: function() {


    },
    profile: function() {

    },
    gotLogin: function(d) {
      this.$store.commit("setToken", d.data.token);
      this.$store.commit("setUsername", this.loginform.username);
      this.useractions=false;
      this.viewkey=Date.now();
    },
    failedLogin: function(d) {
      alert("Login failed: " + d);
    },
    showsnackbar: function(d) {
      this.snackbartext=d;
      this.snackbar=true;
    },
    toggleDark: function() {
      var tmp=this.$store.state.Dark;
      this.$store.commit("setDark",!tmp);
      this.$vuetify.theme.dark=this.$store.state.Dark;
    }
  },
};
</script>
