<template>
  <v-form>
    <v-text-field label="Username" v-model="credentials.username" />
    <v-text-field
      type="password"
      label="Password"
      v-model="credentials.password"
    />
    <v-alert v-if="!credentials.passwordValid">
      <v-icon>mdi-alert-circle</v-icon> At least 6 characters</v-alert
    >

    <v-text-field
      type="password"
      label="Repeat Password"
      v-model="credentials.repeatPassword"
    />
    <v-alert v-if="!credentials.passwordsMatch"
      ><v-icon>mdi-alert-circle</v-icon>Passwords don't match</v-alert
    >

    <v-text-field
      type="text"
      label="Email (optional)"
      v-model="credentials.email"
    />
    <v-btn @click="signUp(credentials)">Sign Up</v-btn>
  </v-form>
</template>

<script>
import registrationCredentials from "../models/registrationCredentials";
import { mapActions } from "vuex";

export default {
  name: "RegistrationForm",
  data: () => ({
    /** @type {RegistrationCredentials} */
    credentials: new registrationCredentials({}),
  }),

  methods: {
    ...mapActions("$auth", ["signUp"]),
  }
};
</script>

<style scoped></style>
