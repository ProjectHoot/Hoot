<template>
  <v-menu offset-y>
    <template #activator="{ on: menu, attrs }">
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn title="Account" data-cy="authUsername" v-bind="attrs" text v-on="{ ...menu }">
          <v-icon left color="gray">
            mdi-account
          </v-icon>
          {{ $auth.user.username }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn data-cy="authUsername" v-bind="attrs" icon v-on="{ ...menu }">
          <v-icon color="gray">
            mdi-account
          </v-icon>
        </v-btn>
      </template>
    </template>
    <v-list>
      <v-list-item @click="$auth.logout()">
        Logout
      </v-list-item>
      <v-list-item @click="$router.push('/me')">
        Profile
      </v-list-item>
    </v-list>
  </v-menu>
</template>
