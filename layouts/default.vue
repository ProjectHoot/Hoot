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
        to="/communities"
        hover="Community List"
        icon="mdi-clipboard-list"
      />
      <TooltipButton
        :icon="$vuetify.theme.dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
        hover="Toggle Dark/Light Mode"
        @click="toggleDark"
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
      <TheLoginButton v-if="!$auth.loggedIn" />
      <TheProfileButton v-else />
    </v-app-bar>

    <Node />

    <v-main>
      <v-container fluid style="padding: 0">
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
  components: {
    Node,
    TooltipButton,
  },

  data: () => ({
    limitsearch: true,
    searchwindow: false,
  }),
  mounted() {
    this.$vuetify.theme.dark = this.$auth.$storage.getUniversal('isDarkTheme')
  },
  methods: {
    toggleDark() {
      const val = !this.$vuetify.theme.dark
      this.$vuetify.theme.dark = val
      this.$auth.$storage.setUniversal('isDarkTheme', val)
    },
  },
}
</script>
