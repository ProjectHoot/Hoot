<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <router-link :to="{ name: 'Feed' }" class="title white--text text-decoration-none">Hoot</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Community List'}" class="white--text text-decoration-none">Community List</router-link>
  <tooltipbutton :clicked="toggleDark" :icon="$store.state.Dark ? 'mdi-flashlight-off' : 'mdi-flashlight'" hover="Toggle Dark/Light Mode"></tooltipbutton>
      <v-menu v-model="searchwindow" :close-on-click="false" :close-on-content-click="false">
    <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            ><v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Search</span>
        </v-tooltip>
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
    <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn text           v-bind="attrs"
              v-on="{ ...tooltip, ...menu }">
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
        <v-menu v-else v-model="useractions" :close-on-content-click="false" offset-y :nudge-width="200">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on"><v-icon color="gray">mdi-account</v-icon></v-btn>
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
               <v-text-field label="Username" v-model="loginform.username" />
               <v-text-field type="password" label="Password" v-model="loginform.password" />
               <v-btn @click="login">Login</v-btn>
             </v-form>
                </v-card-text>
              </v-card>
           </v-tab-item>
            <v-tab-item key="1">
              <v-card>
                <v-card-text>
              <v-form>
               <v-text-field label="Username" v-model="loginform.username" />
               <v-text-field type="password" label="Password" v-model="loginform.password" />
               <v-text-field type="password" label="Repeat Password" v-model="loginform.repeatpassword" />
               <v-text-field type="text" label="Email (optional)" v-model="loginform.email" />
               <v-btn @click="signup">Sign Up</v-btn>
             </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          </v-menu>
    </v-app-bar>
    <node v-on:connected="showsnackbar($event)"></node>
  
    <v-main>
      <v-container fluid style="padding: 0">
        <router-view :key="$route.fullPath"></router-view>
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
import Tooltipbutton from './components/Tooltipbutton.vue'

export default {
  name: "App",
   components: {
    Node,
    Tooltipbutton,
  },

  data: () => ({
    useractions: false,
    limitsearch: true,
    searchwindow: false,
    loginform: {
  username: '',
  password: '',
  repeatpassword: '',
  email: '',
    },
    viewkey: 0,
  snackbar: false,
  logintabs: 0,
  snackbartimeout: 5000,
  snackbartext: ""
//
  }),
  mounted: function() {
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
profile: function() {

},
    signup: function() {
        // Basic form validation
        if (this.loginform.username.length<3) {
          alert("Username must be 3 or more characters");
          return;
        }
        if (this.loginform.password.length<6) {
          alert("Password must be 6 or more characters");
          return;
        }
        if (this.loginform.password!=this.loginform.repeatpassword) {
          alert("Passwords do not match");
          return;
        }
        if (this.loginform.email.length>0) {
          // Make sure email isn't clearly invalid
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line 
            if (!re.test(this.loginform.email)) {
              alert("Email address is invalid");
              return;
            }
        }
        // Actually do the thing
        var postData={};
        postData.username=this.loginform.username;
        postData.password=this.loginform.password;
        if (this.loginform.email!="") {
            postData.email_address=this.loginform.email;
        }
        postData.login=true;
        this.$http.post(this.$LOTIDE + "/unstable/users", postData).then(this.gotLogin).catch(this.failedSignup);
    },
    gotLogin: function(d) {
      this.$store.commit("setToken", d.data.token);
      this.$store.commit("setUsername", this.loginform.username);
      this.useractions=false;
      this.loginform.username="";
      this.loginform.password="";
      this.loginform.repeatpassword="";
      this.loginform.email="";
      this.viewkey=Date.now();
    },
    failedSignup: function(d) {
      alert("Signup failed: " + d.data);
    },
    failedLogin: function(d) {
      alert("Login failed: " + d.data);
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
<style>
 @import "~easymde/dist/easymde.min.css";
</style>