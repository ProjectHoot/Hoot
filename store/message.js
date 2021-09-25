import { createMutations } from '~/assets/vuex-helpers'

export const state = () => ({
  message: '',
  icon: null,
  color: '',
  show: false,
  position: {
    bottom: true,
  },
})

export const mutations = {
  ...createMutations('message', 'icon', 'color', 'show', 'position'),
}
export const actions = {
  showMessage(
    { commit },
    { message = '', icon = null, color = '', position = { bottom: true } }
  ) {
    commit('message', message)
    commit('color', color)
    commit('icon', icon)
    commit('show', true)
    commit('position', position)
  },
  showError(
    { commit },
    { message = '', icon = 'mdi-alert-circle', position = { top: true } }
  ) {
    commit('message', message)
    commit('color', 'error')
    commit('icon', icon)
    commit('show', true)
    commit('position', position)
  },
}
