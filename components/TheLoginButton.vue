<template>
  <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="gray"> mdi-account </v-icon>
      </v-btn>
    </template>
    <v-tabs v-model="currentTab">
      <v-tab key="0"> Login </v-tab>
      <v-tab key="1"> Signup </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item key="0">
        <v-card>
          <v-card-text>
            <v-form @submit.prevent>
              <v-text-field v-model="loginForm.username" label="Username" />
              <v-text-field
                v-model="loginForm.password"
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
              <v-text-field v-model="loginForm.username" label="Username" />
              <v-text-field
                v-model="loginForm.password"
                label="Password"
                type="password"
              />
              <v-alert
                v-if="
                  loginForm.password.length !== 0 &&
                  loginForm.password.length < 6
                "
              >
                <v-icon>mdi-alert-circle</v-icon>
                Password must be at least 6 characters
              </v-alert>

              <v-text-field
                v-model="loginForm.repeatpassword"
                label="Repeat Password"
                type="password"
              />
              <v-alert v-if="loginForm.password !== loginForm.repeatpassword">
                <v-icon>mdi-alert-circle</v-icon>
                Passwords don't match
              </v-alert>

              <v-text-field
                v-model="loginForm.email"
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
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        repeatpassword: '',
        email: '',
      },
      currentTab: 0,
    }
  },
  methods: {
    async login() {
      const data = {}
      data.username = this.loginForm.username
      data.password = this.loginForm.password
      try {
        await this.$auth.loginWith('local', { data })
      } catch (err) {
        this.$store.dispatch('message/showError', {
          message: err.response.data,
        })
      }
    },

    async signup() {
      // Basic form validation
      if (this.loginForm.username.length < 3) {
        alert('Username must be 3 or more characters')
        return
      }
      if (this.loginForm.password.length < 6) {
        alert('Password must be 6 or more characters')
        return
      }
      if (this.loginForm.password !== this.loginForm.repeatpassword) {
        alert('Passwords do not match')
        return
      }
      if (this.loginForm.email.length > 0) {
        // Make sure email isn't clearly invalid
        const re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
        if (!re.test(this.loginForm.email)) {
          alert('Email address is invalid')
          return
        }
      }
      // Actually do the thing
      const postData = {}
      postData.username = this.loginForm.username
      postData.password = this.loginForm.password
      if (this.loginForm.email !== '') {
        postData.email_address = this.loginForm.email
      }
      await this.$axios.post('/api/users', postData)
      this.$auth.loginWith('local', {
        data: {
          username: postData.username,
          password: postData.password,
        },
      })
    },
    failedSignup() {
      this.$store.dispatch('message/showError', {
        message: 'Username is not available',
      })
    },
    failedLogin() {
      this.$store.dispatch('message/showError', { message: 'Login failed' })
    },
  },
}
</script>
