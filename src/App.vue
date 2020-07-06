<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
    <v-row justify="space-around" align="center">
      <v-col>
        <router-link :to="{ name: 'Feed' }" class="title white--text text-decoration-none">
          Hoot
        </router-link>
      </v-col>

      <v-col cols="6">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
          dense
        />
      </v-col>

      <v-col class="text-right title">
        <v-icon @click="account" color="primary">mdi-account</v-icon>
      </v-col>
    </v-row>
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
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

  methods: {
    account() {
      return;
    }
  },
};
</script>
