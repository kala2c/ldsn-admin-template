import router from '@/router'
import { constantRoutes } from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import api from '@/api'

// 添加初始路由到路由表
store.dispatch('routes/initRoutes', constantRoutes)

// 验证是否有登录token
let token = getToken()
if (token) {
  async function setUserInfo() {
    let res = await api.getUserInfo()
    // 设置用户信息
    store.dispatch('user/setUserInfo', res.data.userinfo)
    // 添加权限路由到路由表
    store.dispatch('routes/addRoutes', res.data.permission)
  }
  setUserInfo()
}

const noAuthPath = ['/login', '/test']
router.beforeEach(async(to, form, next) => {
  let hasToken = getToken()
  console.log("路由开始载入", to)
  if (hasToken) {
    console.log("检测到token存在", hasToken)
    if (to.path == '/login') {
      console.log("从登录页跳转至控制台")
      next({
        path: '/'
      })
    }
    next()
  } else {
    console.log("没有登录token, 将重定向至登录页")
    if (noAuthPath.indexOf(to.path) == -1) {
      console.log("重定向至登录页")
      next({
        to: '/login?from='+to.path,
        path: '/login'
      })
    } else {
      console.log("免登录页，无需重定向")
      next()           
    }
  }
})

router.afterEach(() => {
  // done
  console.log("路由加载完成")
})
