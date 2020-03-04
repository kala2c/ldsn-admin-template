import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const state = {
  userAvatar: null,
  username: null,
  roles: [],
  token: getToken(),
}
const mutations = {
  setUserAvatar(state, userAvatar) {
    state.userAvatar = userAvatar
  },
  setUsername(state, username) {
    state.username = username
  },
  setRoles(state, role) {
    state.roles = role
  },
  setToken(state, token) {
    state.token = token
  }
}
const actions = {
  setUserInfo({commit, state}, user) {
    commit('setUserAvatar', user.avatar)
    commit('setUsername', user.username)
  },
  setToken({commit, state}, token) {
    commit('setToken', token)
    setToken(token)
  },
  login({dispatch}, data) {
    dispatch('setUserInfo', data.userinfo)
    dispatch('setToken', data.token)
  },
  logout({commit, state}) {
    commit('setUserAvatar', null)
    commit('setUsername', null)
    commit('setToken', null)
    removeToken()
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}