import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index'
import store from '@/store'

Vue.use(VueRouter)

// 需要权限的路由
export const accessRoutes = [{
  path: '/form',
  component: Layout,
  redirect: '/form/simple',
  meta: {title: '表单', icon: 'circle-plus-outline', roles: ['super']},
  children: [{
    path: 'simple',
    name: 'Simple',
    component: () => import('../views/form/simple'),
    meta: {title: '简单表单', icon: ''}
  },{
    path: 'step',
    name: 'Step',
    component: () => import('../views/form/step'),
    meta: {title: '分布表单', icon: ''}
  }]
}]

// 不需要权限的路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
    meta: {title: '登录'},
    hidden: true,
  },
  {
    path: '/dashboard',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/index'),
      meta: {title: '控制台', icon: 'menu'}
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    meta: {title: "欢迎", icon: 'check'},
    children: [{
      path: 'welcome',
      component: () => import('../views/welcome/welcome'),
      meta: {title: '欢迎页面', icon: ''}
    }, {
      path: 'about',
      component: () => import('../views/welcome/about'),
      meta: {title: '关于页面', icon: ''}
    }]
  },
]
const createRouter = function() {
  return new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: constantRoutes
  })
}
const router = createRouter()

// 重置路由 退出登录时清除添加的路由表
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  store.dispatch('routes/initRoutes', constantRoutes)
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
// 路由过滤 根据权限筛选路由
export function filterRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export default router
