<template>
  <div class="login" label-width="100px">
    <div class="content">
      <p class="logo">logo</p>
      <p class="title">登录后台管理</p>
      <el-form class="form" ref="form" :model="formData">
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-key" v-model="formData.password" show-password></el-input>
        </el-form-item>
        <div class="auto-login-wrap">
          <el-checkbox class="auto-login-wrap" v-model="isAutoLogin" label="1">自动登录</el-checkbox>
          <el-link href="" type="primary">忘记密码</el-link>
        </div>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
import api from '@/api'
import store from '@/store'
// import { mapActions } from 'vuex'
export default {
  data() {
    return {
      isAutoLogin: true,
      formData: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  watch: {
    isAutoLogin(val) {
      console.log(val)
    }
  },
  methods: {
    // 登录
    async onSubmit() {
      let res = await api.login({data: this.formData})
      let data = res.data
      // 根据许可信息添加路由
      store.dispatch('routes/addRoutes', data.permission)
      // 设置用户信息
      // store.dispatch('user/setUserInfo', data.userinfo)
      // 设置token信息
      // store.dispatch('user/setToken', data.token)
      // 两步并为一步
      store.dispatch('user/login', data)
      this.$message({
        message: '登录成功',
        duration: 1200
      })
      console.log(this.$routes)
      return
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 1200)
    }
  },
  mounted() {
    if (this.isAutoLogin) {
      // this.onSubmit()
    }
    axios.post('/api/admin/login', this.formData).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  .content {
    box-sizing: border-box;
    width: 100%;
    max-width: 400px;
    padding: 10px 15px;
    text-align: center;
    // background-color: #fff;
    .logo {
      font-size: 3em;
    }
    .title {
      margin-top: 10px;
    }
    .form {
      width: 100%;
      margin-top: 20px;
      .auto-login-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .submit-btn {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
