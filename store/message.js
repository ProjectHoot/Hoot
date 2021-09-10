import { createMutations } from '~/assets/vuex-helpers'

export const state = () => ({
  message: '',
  icon: null,
  color: '',
  show: false
})

export const mutations = {
  ...createMutations('message', 'icon', 'color', 'show')
}

export const actions = {
  showMessage({ commit }, { message = '', icon = null, color = '' }) {
    commit('message', message)
    commit('color', color)
    commit('icon', icon)
    commit('show', true)
  },
  showError({ commit }, { message = '', icon = 'mdi-alert-circle' }) {
    commit('message', message)
    commit('color', 'error')
    commit('icon', icon)
    commit('show', true)
  }
}
