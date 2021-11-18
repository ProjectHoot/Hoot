import { createMutations } from '~/assets/vuex-helpers'

export const state = () => ({
  username: '',
  token: '',
  dark: true,
  loggedIn: false,
})

export const mutations = {
  ...createMutations('username', 'token', 'dark', 'loggedIn'),
}

export const actions = {
  nuxtServerInit(_, { $auth, $vuetify }) {
    // updating vuetify theme here so the theme is consistent during SSR
    $vuetify.theme.dark = $auth.$storage.getUniversal('isDarkTheme')
  },
}
