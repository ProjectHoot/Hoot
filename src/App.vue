<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <router-link :to="{ name: 'Feed' }" class="title white--text text-decoration-none">Hoot</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark=!$vuetify.theme.dark;">
        <v-icon
          color="secondary"
          v-html="$vuetify.theme.dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
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

      <v-icon @click="account" color="secondary">mdi-account</v-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    limitsearch: true,
    searchwindow: false
    //
  }),

  methods: {
    account() {
      return;
    }
  }
};
</script>
