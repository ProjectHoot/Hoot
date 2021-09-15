<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <nuxt-link to="/" class="text--primary title text-decoration-none">
          Hoot
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <TooltipButton
        to="/comunities"
        hover="Community List"
        icon="mdi-clipboard-list"
      />
      <TooltipButton
        :clicked="toggleDark"
        :icon="$vuetify.theme.dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
        hover="Toggle Dark/Light Mode"
      /><v-menu
        v-model="searchwindow"
        :close-on-click="false"
        :close-on-content-click="false"
      >
        <template #activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-btn v-bind="attrs" icon v-on="{ ...tooltip, ...menu }">
                <v-icon class="text--primary"> mdi-magnify </v-icon>
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
                <v-btn dense @click="searchwindow = false"> Search! </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn dense @click="searchwindow = false"> Close </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-menu v-if="$store.state.LoggedIn" v-model="useractions" offset-y>
        <template #activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-btn v-bind="attrs" text v-on="{ ...tooltip, ...menu }">
                <v-icon color="gray"> mdi-account </v-icon>
                {{ $store.state.Username }}
              </v-btn>
            </template>
            <span>User Settings</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item @click="logout"> Logout </v-list-item>
          <v-list-item @click="profile"> Profile </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        v-else
        v-model="useractions"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="gray"> mdi-account </v-icon>
          </v-btn>
        </template>
        <v-tabs v-model="logintabs">
          <v-tab key="0"> Login </v-tab>
          <v-tab key="1"> Signup </v-tab>
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
                  <v-btn @click="login"> Login </v-btn>
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
                      loginform.password.length !== 0 &&
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
                    v-if="loginform.password !== loginform.repeatpassword"
                  >
                    <v-icon>mdi-alert-circle</v-icon>
                    Passwords don't match
                  </v-alert>

                  <v-text-field
                    v-model="loginform.email"
                    label="Email (optional)"
                    type="text"
                  />
                  <v-btn @click="signup"> Sign Up </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-menu>
    </v-app-bar>

    <Node />

    <v-main>
      <v-container fluid style="padding: 0">
        <v-card-title> TEST </v-card-title>
        <Nuxt />
      </v-container>
    </v-main>
    <TheMessageBar />
  </v-app>
</template>

<script>
import Node from '~/components/Node.vue'
import TooltipButton from '~/components/TooltipButton.vue'

export default {
  name: 'App',
  components: {
    Node,
    TooltipButton,
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
    logintabs: 0,
    snackbartimeout: 5000,

    //
  }),
  mounted() {
    this.$vuetify.theme.dark = localStorage.getItem('isDarkTheme')
    if (this.$store.state.Username) this.$store.commit('loggedIn', true)
  },
  methods: {
    login() {
      const postData = {}
      postData.username = this.loginform.username
      postData.password = this.loginform.password
      this.$axios
        .post('/api/logins', postData)
        .then(this.gotLogin)
        .catch(this.failedLogin)
    },
    logout() {
      this.$axios.post('/api/logins/~current')

      this.$store.commit('token', '')
      this.$store.commit('username', '')
      this.$store.commit('loggedIn', false)

      this.useractions = false
      this.viewkey = Date.now()
      this.$router.go()
    },
    profile() {
      this.$router.push('/me')
    },
    signup() {
      // Basic form validation
      if (this.loginform.username.length < 3) {
        alert('Username must be 3 or more characters')
        return
      }
      if (this.loginform.password.length < 6) {
        alert('Password must be 6 or more characters')
        return
      }
      if (this.loginform.password !== this.loginform.repeatpassword) {
        alert('Passwords do not match')
        return
      }
      if (this.loginform.email.length > 0) {
        // Make sure email isn't clearly invalid
        const re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
        if (!re.test(this.loginform.email)) {
          alert('Email address is invalid')
          return
        }
      }
      // Actually do the thing
      const postData = {}
      postData.username = this.loginform.username
      postData.password = this.loginform.password
      if (this.loginform.email !== '') {
        postData.email_address = this.loginform.email
      }
      postData.login = true
      this.$axios
        .post('/api/users', postData)
        .then(this.gotLogin)
        .catch(this.failedSignup)
    },
    gotLogin(d) {
      this.$store.commit('token', d.data.token)
      this.$store.commit('username', this.loginform.username)
      this.$store.commit('login')

      this.useractions = false
      this.loginform.username = ''
      this.loginform.password = ''
      this.loginform.repeatpassword = ''
      this.loginform.email = ''
      this.viewkey = Date.now()
      this.$router.go()
    },
    failedSignup() {
      this.$store.dispatch('message/showError', {
        message: 'Username is not available',
      })
    },
    failedLogin() {
      this.$store.dispatch('message/showError', { message: 'Login failed' })
    },
    toggleDark() {
      const val = !this.$vuetify.theme.dark
      this.$vuetify.theme.dark = val
      localStorage.setItem('isDarkTheme', val)
    },
  },
}
</script>
