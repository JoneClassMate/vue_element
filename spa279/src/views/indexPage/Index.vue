<template>
  <!-- 外层容器-->
 <el-container style="height: 100%;">
    <!-- 左侧区域-->
   <el-aside  :class="collapsed" style="height: 100%;">
      <Left style="height: 100%;"></Left>
    </el-aside>
    <!-- 主要内容区-->
   <el-main style="padding: 0;">
      <!-- 顶部区域-->
     <el-header style="padding: 0;">
          <Top></Top>
      </el-header>
      <!-- 内容区域-->
      <el-main>
        欢迎来到主页
      </el-main>
   </el-main>
  </el-container>
</template>


<script>
  /* 导入左侧菜单栏*/
  import Left from '@/views/indexPage/Left.vue'
  /* 导入头部区域*/
  import Top from '@/views/indexPage/Top.vue'
  export default {
    name: "Index",
    data() {
      return {

      }
    },
    methods: {

    },
    components: {
      Left,
      Top
    },
    computed: { //计算属性
    /* 自定义*/
      collapsed: function() {
        let collapsed = this.$store.getters.getCollapsed; //获取collapsed属性
        console.info("主页"+collapsed)
        return collapsed?'min':'';
      },
      /* copy*/
      asideClass: function() { //如果collapsed属性为true就不展开样式 反之就展开样式
        let collapsed=this.$store.getters.getCollapsed;//获取collapsed属性
        return collapsed ? "main-aside-collapsed" : "main-aside";
      }
    }
  }
</script>

<style>
  .min{
    width: 63px !important;
    transition: .5s;
  }
/*  .max{
    transition: .5s;
  } */

 .main-container {
   height: 100%;
   width: 100%;
   box-sizing: border-box;
 }



 /* 不展开样式*/
 .main-aside-collapsed {
   /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
   width: 64px !important;
   height: 100%;
   background-color: #545c64;
   margin: 0px;
 }

 /* 展开样式*/
 .main-aside {
   width: 240px !important;
   height: 100%;
   background-color: #545c64;
   margin: 0px;
 }

 .main-header,
 .main-center {
   padding: 0px;
   border-left: 2px solid #333;
 }

</style>
