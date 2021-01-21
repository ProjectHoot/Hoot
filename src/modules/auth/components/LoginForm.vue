<template>
  <v-form>
    <v-text-field label="Username" v-model="credentials.username" />
    <v-text-field
      type="password"
      label="Password"
      v-model="credentials.password"
    />
    <v-btn @click.prevent.stop="login">Login</v-btn>
  </v-form>
</template>

<script>
import LoginCredentials from "../models/loginCredentials";

export default {
  name: "LoginForm",
  data: () => ({
    /** @type {LoginCredentials} */
    credentials: new LoginCredentials({}),
  }),

  methods: {
    login() {
      this.$store
        .dispatch("$auth/login", this.credentials)
        .then(() => {
          // this.$router.go(0);
        })
        .catch(e => {
          this.$eventBus.$emit("error", e);
        });
    },
  },
};
</script>
