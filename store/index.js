import { createMutations } from '~/assets/vuex-helpers'

export const state = () => ({
  username: '',
  token: '',
  dark: true,
  loggedIn: false
})

export const mutations = {
  ...createMutations('username', 'token', 'dark', 'loggedIn')
}
