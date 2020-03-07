<style scoped>
.nav-menu-btn {
  padding: 0 10px;
  outline: none;
  cursor: pointer;
}
</style>


<template>
  <div class="nav-menu-btn" @click="fullScreen()">
    <i v-show="!isFullScreen" class="el-icon-full-screen"></i>
    <i v-show="isFullScreen" class="el-icon-switch-button"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullScreen: false,
    }
  },
  methods: {
    fullScreen() {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        if(document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if(document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if(document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if(document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
  }
}
</script>