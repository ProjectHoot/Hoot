<template>
  <v-menu
    v-model="menuOpen"
    offset-y
    :close-on-click="false"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }"
            ><v-icon class="text--primary">mdi-magnify</v-icon>
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
          v-model="searchTerm"
          single-line
        />
        <v-checkbox
          v-model="limitSearch"
          label="Limit results to this server"
        />
        <v-row>
          <v-col cols="6">
            <v-btn dense @click="search">Search!</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn dense @click="hide">Close</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "SearchMenu",

  data: () => ({
    searchTerm: "",
    menuOpen: false,
    limitSearch: false,
  }),

  methods: {
    search() {
      throw Error("Not implemented");
    },

    hide() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped></style>
