<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    :nudge-width="200"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on"><v-icon color="gray">mdi-account</v-icon></v-btn>
    </template>
    <v-tabs v-model="authTab">
      <v-tab key="0">Login</v-tab>
      <v-tab key="1">Signup</v-tab>
    </v-tabs>
    <v-tabs-items v-model="authTab">
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
</template>

<script>
import LoginForm from "@/modules/auth/components/LoginForm";
import RegistrationForm from "@/modules/auth/components/RegistrationForm";

export default {
  name: "AuthMenu",
  components: { RegistrationForm, LoginForm },
  data: () => ({
    authTab: 0
  }),
};
</script>

<style scoped></style>
