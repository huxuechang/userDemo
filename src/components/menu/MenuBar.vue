<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo"  background-color="#2B8FC0" text-color="#F5F5F5" active-text-color="red" style="border:#2B8FC0 "
             unique-opened router>
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index+''" v-if="!item.leaf">
          <template slot="title"><i :class="item.iconCls"></i>{{item.label}}</template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.label}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].label}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "MenuBar",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
a{
  text-decoration: none;
}
.el-submenu__title{
  padding: 0 50px;

}
  .el-submenu__title i{
    color: #f2f6fc;
  }
.el-submenu .el-menu-item{
    min-width: 199px;
  }
</style>
