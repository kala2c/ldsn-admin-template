<template>
  <div class="side-bar">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo menu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#393d49"
        text-color="#fff"
        >
        <el-submenu 
          v-for="(submenu, index) in menuList"
          :key="submenu.path"
          :index="`${index}`"
          v-if="!submenu.hidden"
        >
          <template slot="title" v-if="!submenu.hidden">
            <i v-if="submenu.children.length > 1" :class="`el-icon-${submenu.meta.icon}`"></i>
            <i v-else :class="`el-icon-${submenu.children[0].meta.icon}`"></i>
            <span v-if="submenu.children.length > 1">{{ submenu.meta.title }}</span>
            <span v-else>{{ submenu.children[0].meta.title }}</span>
          </template>
          <el-menu-item-group v-if="!submenu.hidden">
            <el-menu-item 
              class="menu-item"
              v-for="(menuitem, itemIndex) in submenu.children"
              :key="menuitem.path"
              :index="`${index}-${itemIndex}`"
              @click="changeActive(`${index}-${itemIndex}`, (submenu.children.length > 1 
                                                                ? submenu.path+(submenu.path.substr(-1, 1) == '/' ? '' : '/')+menuitem.path
                                                                : menuitem.path))">
              {{ menuitem.meta.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: ''
    }
  },
  computed: {
    ...mapGetters(['menuList'])
    // routes() {
    //   // return this.$router.options.routes
    //   return store.getters.menuList
    // }
  },
  methods: {
    changeActive(activeIndex, path) {
      this.activeIndex = activeIndex
      localStorage.setItem('active-index', activeIndex)
      if (this.$route.path != path) {
        this.$router.push({ path })
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  },
  mounted() {
    this.activeIndex = localStorage.getItem('active-index')    
    console.log(this.menuList)
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


