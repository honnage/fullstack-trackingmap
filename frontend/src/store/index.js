import { createStore } from 'vuex'


export default createStore({
  state: {
    token: null,
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
  },
  modules: {
  }
})
