<template>
    <el-container>
      <!--头部-->
      <el-header style="background-color: aqua">

      </el-header>
      <el-container >
        <!--侧边栏-->
        <el-aside width="200px"  style="">
           <menu-bar></menu-bar>
        </el-aside>
        <!--右边栏-->
        <el-main style="padding: 0px ">
          <!--路径导航-->
          <path-nav></path-nav>
          <!--路由-->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
// 引入左边菜单栏
import MenuBar from '../../components/menu/MenuBar'
import PathNav from '../../components/pathNav/PathNav'
export default {
  name: 'home',
  components: {
     'menu-bar':MenuBar,
      'path-nav':PathNav
  }
}
</script>
<style scoped lang="less">
  ul{
    width: 100%;
  }
</style>