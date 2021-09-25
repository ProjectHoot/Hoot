import { createMutations } from '~/assets/vuex-helpers'
import { asyncFunc } from '~/assets/async-func'
const makeRequest = async (commit, promise) => {
  commit('loading', true)
  const [response, err] = await asyncFunc(promise)
  if (err) {
    console.error('error', err.message)
  }
  commit('loading', false)
  return [response, err]
}
export const state = () => ({
  communities: [],
  loading: [],
})

export const mutations = { ...createMutations('communities', 'loading') }

export const actions = {
  async createCommunity({ commit }, { name }) {
    return await makeRequest(
      commit,
      this.$axios({
        url: `${this.$config.lotide}/communities`,
        method: 'POST',
        data: { name },
      })
    )
  },
}
