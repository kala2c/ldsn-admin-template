<template>
  <div class="breadcrumb">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in linkList"
        :key="index"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      linkList: [
      ]
    }
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  watch: {
    $route(route) {
      this.changeLinkList(route.path)
    }
  },
  methods: {
    changeLinkList(path) {
      console.log(path)
      // let linkList = []
      let submenuMeta
      this.menuList.forEach(submenu => {
        if (!submenu.hidden) {
          // if (submenu.children && submenu.children.length > 1) {
          if (submenu.children) {
            submenuMeta = {name: submenu.meta.title, path: submenu.path}
            let itemPath
            submenu.children.forEach(menuItem => {
              itemPath = this.joinPath(submenu.path, menuItem.path)
              if (path === itemPath) {
                this.linkList = []
                this.linkList.push(submenuMeta)
                this.linkList.push({name: menuItem.meta.title, path: menuItem.meta.path})
              }
            })
          } 
          // else {
          //   let title = submenu.meta.title
          //   let path = submenu.path
          // }
        }
      })
    },
    joinPath(submenuPath, menuItemPath) {
      // 菜单子项不为”/“起始的路由，需拼接submenupath 
      if (menuItemPath.substr(0, 1) != '/') { 
        // 判断submenu结尾有没有”/“，没有则添加
        return submenuPath+(submenuPath.substr(-1, 1) == '/' ? '' : '/')+menuItemPath
      } else { 
        // 如果菜单子项为”/“起始的路由，则不拼接submenupath       
        return menuItemPath
      }
    }
  },
  created() {
    this.changeLinkList(this.$route.path)
  }
}
</script>

