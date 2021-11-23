<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      data-cy="appDrawer"
      absolute
      temporary
    >
      <v-list>
        <v-list-item data-cy="appDrawer-home" nuxt to="/">
          <v-list-item-icon>
            <v-icon> mdi-home </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item data-cy="appDrawer-communities" nuxt to="/communities">
          <v-list-item-icon>
            <v-icon> mdi-clipboard-list </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Communities </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="$auth.loggedIn"
          data-cy="appDrawer-profile"
          nuxt
          to="/me"
        >
          <v-list-item-icon>
            <v-icon> mdi-account </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Profile </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="$auth.loggedIn"
          data-cy="appDrawer-logout"
          @click="$auth.logout()"
        >
          <v-list-item-icon>
            <v-icon> mdi-logout </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="primary--text">
        <nuxt-link
          to="/"
          class="title text-decoration-none"
          :class="
            $vuetify.theme.dark
              ? 'primary--text'
              : 'primary--text text--darken-3'
          "
        >
          Hoot
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <TooltipButton
        :icon="$vuetify.theme.dark ? 'mdi-flashlight-off' : 'mdi-flashlight'"
        hover="Toggle Dark/Light Mode"
        @click="setDark(!$vuetify.theme.dark)"
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
      <v-btn
        data-cy="appBar-communities"
        title="communities"
        to="/communities"
        :icon="$vuetify.breakpoint.smAndDown"
        :text="$vuetify.breakpoint.mdAndUp"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp">
          mdi-clipboard-list
        </v-icon>
        <template v-if="$vuetify.breakpoint.mdAndUp"> Communities </template>
      </v-btn>
      <TheLoginButton v-if="!$auth.loggedIn" />
      <TheProfileButton v-else />
    </v-app-bar>

    <!-- <Node /> -->

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <TheMessageBar />
  </v-app>
</template>

<script>
import TooltipButton from '~/components/TooltipButton.vue'
import TheLoginButton from '~/components/TheLoginButton.vue'

export default {
  components: {
    TooltipButton,
    TheLoginButton,
  },

  data: () => ({
    limitsearch: true,
    searchwindow: false,
    drawer: false,
  }),
  mounted() {
    const isDarkTheme = this.$auth.$storage.getUniversal('isDarkTheme')
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    if (isDarkTheme !== undefined) {
      this.setDark(isDarkTheme)
    } else {
      darkMediaQuery.matches ? this.setDark(false) : this.setDark(true)
    }
    darkMediaQuery.addEventListener('change', (e) => {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    })
  },
  methods: {
    setDark(val) {
      this.$vuetify.theme.dark = val
      this.$auth.$storage.setUniversal('isDarkTheme', val)
    },
  },
}
</script>
