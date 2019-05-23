<template>
    <div class="pathNav">
     <i>当前位置：</i>
    <el-breadcrumb separator="/"  style="line-height: 2;">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>

<script>

    export default {
        name: "PathNav",
        components: {


        }
    }
</script>

<style scoped lang="less">
    .pathNav{
        width: 100%;
        height: 30px;
        /*text-align: left;*/
        font-size: 12px;
        background-color: bisque;
        display: inline-flex;
        i{
            padding-left: 10px;
            line-height: 30px;
            font-size: 12px;
            padding-right: 5px;
        }
    }
</style>
