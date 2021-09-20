export const createMutations = (...keys) => {
  const mutations = {}
  keys.forEach(key => {
    mutations[key] = (state, val) => (state[key] = val)
  })
  return mutations
}
