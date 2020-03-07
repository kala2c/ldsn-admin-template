const getters = {
  device: state => state.app.device,
  sideBarCollapse: state => state.app.sideBarCollapse,
  menuList: state => state.routes.routes,
  userAvatar: state => state.user.userAvatar,
  username: state => state.user.username,
  token: state => state.user.token,
  roles: state => state.user.roles
}
export default getters