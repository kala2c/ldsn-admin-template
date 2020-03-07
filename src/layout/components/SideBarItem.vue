<template>
  <div class="side-bar-item">
    <el-submenu :index="`${submenuIndex}`">
      <template slot="title">
        <i :class="`el-icon-${submenu.meta.icon}`"></i>
        <span>{{ submenu.meta.title }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item 
          class="menu-item"
          v-for="(menuItem, menuItemIndex) in submenu.children"
          :key="menuItem.path"
          :index="`${submenuIndex}-${menuItemIndex}`"
          @click="changeActive(`${submenuIndex}-${menuItemIndex}`, joinPath(submenu.path, menuItem.path))">
          {{ menuItem.meta.title }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
export default {
  props: {
    submenu: {
      type: Object,
      default: null
    },
    submenuIndex: {
      type: Number,
      default: null
    }
  },
  methods: {
    joinPath(submenuPath, menuItemPath) {
      // 菜单子项不为”/“起始的路由，需拼接submenupath 
      if (menuItemPath.substr(0, 1) != '/') { 
        // 判断submenu结尾有没有”/“，没有则添加
        return submenuPath+(submenuPath.substr(-1, 1) == '/' ? '' : '/')+menuItemPath
      } else { 
        // 如果菜单子项为”/“起始的路由，则不拼接submenupath       
        return menuItemPath
      }
    },
    // 切换页面
    changeActive(activeIndex, path) {
      this.activeIndex = activeIndex
      if (this.$route.path != path) {
        this.$router.push({ path })
      }
    },
  }
}
</script>

