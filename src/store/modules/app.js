
const state = {
  device: 'desktop',
  sideBarCollapse: false
}

const mutations = {
  setDevice(state, device) {
    state.device = device
  },
  setSideBarCollapse(state, status) {
    state.sideBarCollapse = status
  }
}

const actions = {
  foldSideBar({commit}) {
    commit('setSideBarCollapse', true)
  },
  unfoldSideBar({commit}) {
    commit('setSideBarCollapse', false)
  },
  changeDeivce({commit}, device) {
    commit('setDevice', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}