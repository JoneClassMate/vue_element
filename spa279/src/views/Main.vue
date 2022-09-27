<template>
  <el-container class="main-container">
    <el-aside v-bind:class="asideClass">
      <LeftAside></LeftAside>
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <TopNav></TopNav>
      </el-header>
      <el-main class="main-center">
       <!-- 欢迎来到T279 -->
          <!-- <button style="margin-bottom: 1000px;"></button> -->
        <!-- 显示视图-->
        <!-- <h2>{{$store.getters.getRoleId}}</h2> -->
        <router-view></router-view>
        <!-- 没有效果-->
        <el-backtop></el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  // 导入组件
  import TopNav from '@/views/TopNav.vue'
  import LeftAside from '@/views/LeftAside.vue'

  // 导出模块
  export default {
    name: "Main",
    data: function() {
      return {
        /* collapsed: false */
      }
    },
    methods: {
    },
    computed: { //计算属性
      asideClass: function() { //如果collapsed属性为true就不展开样式 反之就展开样式
        let collapsed=this.$store.getters.getCollapsed;//获取collapsed属性
        return collapsed ? "main-aside-collapsed" : "main-aside";
      }
    },
    components: { //引入组件
      TopNav,
      LeftAside

    },
    created: function() { //钩子函数
      /* this.$root.Bus.$on("Handle", value => {
        this.collapsed = value;
      }); */
    }
  };
</script>
<style scoped>
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
    background-color: #334157;
    margin: 0px;
  }

  /* 展开样式*/
  .main-aside {
    width: 240px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-header,
  .main-center {
    padding: 0px;
    border-left: 2px solid #333;
  }
</style>
