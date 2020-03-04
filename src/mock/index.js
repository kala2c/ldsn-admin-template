import Mock from 'mockjs'

Mock.mock('/api/admin/login', 'post', option => {
  option.body
  return {
    token: "token",
    userinfo: {
      avatar: '头像url',
      username: '管理员爹爹'
    },
    permission: {
      roles: ['super']
    }
  }
})

Mock.mock('/api/admin/user', 'get', option => {
  option.body
  return {
    userinfo: {
      avatar: '头像url',
      username: '管理员爹爹'
    },
    permission: {
      roles: ['super']
    }
  }
})