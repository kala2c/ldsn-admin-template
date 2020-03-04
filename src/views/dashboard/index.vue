<template>
  <div class="index">后台首页

    <el-button @click="test"></el-button>
  </div>
</template>

<script>
import router from '@/router'
export default {
  mounted() {
    //  
  },
  methods: {
    test() {
      router.addRoutes([{name: 'test', path: '/test', component: () => import('@/views/test')}])
    }
  }
}
</script>

