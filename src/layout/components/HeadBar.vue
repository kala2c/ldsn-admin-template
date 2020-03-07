<template>
  <div class="head-bar">
    <el-menu
      class="nav-menu"
      mode="horizontal"
      >
      <div class="nav-menu-btn" @click="toggleSideBarCollapse">
        <i :class="`el-icon-s-${ sideBarCollapse ? `fold` : `unfold`}`"></i>
      </div>
      <breadcrumb class="breadcrumb"></breadcrumb>
      <div class="search">
        <el-input
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          v-model="key">
        </el-input>
      </div>
      <full-screen-button></full-screen-button>
      <el-submenu index="3">
        <template slot="title">{{userAvatar}} | {{username}}</template>
        <el-menu-item index="4-1">个人资料</el-menu-item>
        <el-menu-item index="4-2">设置</el-menu-item>
        <el-menu-item index="4-3" @click="logout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

import Breadcrumb from './Breadcrumb'
import FullScreenButton from './FullScreenButton'
export default {
  components: {
    Breadcrumb,
    FullScreenButton
  },
  data() {
    return {
      key: ''
    }
  },
  computed: {
    ...mapGetters(['menuList', 'username', 'userAvatar', 'sideBarCollapse'])
  },
  methods: {
    toggleSideBarCollapse() {
      if (this.sideBarCollapse) {
        store.dispatch('app/unfoldSideBar')
      } else {
        store.dispatch('app/foldSideBar')
      }
    },
    logout() {
      store.dispatch('user/logout')
      setTimeout(() => {
        this.$router.push({path: 'login'})
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #cbcbcb;
  .el-menu-item,
  .el-submenu {
    border: none!important;
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    padding-left: 15px;
    outline: none;
  }
  .nav-menu-btn {
    padding: 0 10px;
    outline: none;
    cursor: pointer;
  }
  .search {
    margin: 0 10px;
  }
}
</style>
