import router from "@/router"
import { accessRoutes, filterRoutes } from '@/router'
const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  },
  setAddRoutes(state, routes) {
    state.addRoutes = routes
  },
}
const actions = {
  // 初始化路由表
  initRoutes({commit, state}, routes) {
    commit('setRoutes', routes)
  },
  // 添加权限路由至路由表
  addRoutes({commit, state}, permission) {
    // let routes = [{name: 'test', path: '/test', component: () => import('@/views/test')}]
    let routes = filterRoutes(accessRoutes, permission.roles)
    router.addRoutes(routes)
    commit('setAddRoutes', routes)
    commit('setRoutes', state.routes.concat(routes))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}