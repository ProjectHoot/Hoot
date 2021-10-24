<template>
  <v-menu offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn data-cy="authUsername" v-bind="attrs" text v-on="{ ...tooltip, ...menu }">
            <v-icon left color="gray">
              mdi-account
            </v-icon>
            {{ $auth.user.username }}
          </v-btn>
        </template>
        <span>User Settings</span>
      </v-tooltip>
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
