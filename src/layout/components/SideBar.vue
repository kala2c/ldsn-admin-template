<template>
  <div class="side-bar">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo menu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="sideBarCollapse"
        background-color="#393d49"
        text-color="#fff"
        >
        <side-bar-item
          v-for="(submenu, index) in menuList"
          :key="submenu.path"
          v-if="!submenu.hidden"
          :submenu="submenu"
          :submenuIndex="index"
        >
        </side-bar-item>
      </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import SideBarItem from './SideBarItem'
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SideBarItem
  },
  data() {
    return {
      activeIndex: ''
    }
  },
  computed: {
    ...mapGetters(['menuList', 'sideBarCollapse'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.el-menu {
  border: none;
  min-width: 200px;
}
.el-menu--collapse {
  min-width: 0;
}
.menu-item {
  width: 100%;
  background-color: rgba(0, 0, 0, .3);
}
.side-bar {
  height: 100%;
  overflow: auto;
}
.side-bar .menu {
  min-height: 100%;
}
/* .link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
} */
</style>


