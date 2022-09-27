<template>

  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  >
   <el-button class="showimg" @click="doToggle()">{{collapsed?imgshow:imgsq}}</el-button>
    <el-menu-item index="1" style="margin-left: 85%;">首页中心</el-menu-item>
    <el-submenu index="2" class="submenu">
      <template slot="title">我的</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default{
    name:"Top",
    data() {
      return {
        activeIndex:'1',
        imgshow: '展开',
        imgsq: '关闭',
      }
    },
    methods:{
      doToggle: function() { //主要控制collapsed为true和false
        /* this.collapsed = !this.collapsed; //取反 */
        /* this.$root.Bus.$emit("Handle", this.collapsed);//传参 */
        this.$store.commit('setCollapsed', {
          name: !this.$store.getters.getCollapsed
        })
      }

    },
    computed: { //计算属性
      collapsed: function() {
        return this.$store.getters.getCollapsed
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
  }

  .submenu {
    float: right;
  }

  .buttonimg {
    height: 60px;
    background-color: transparent;
    border: none;
  }

  .showimg {
   /* width: 26px;
    height: 26px;
    position: absolute;
    top: 17px;
    left: 17px; */
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .showimg:active {
    border: none;
  }
</style>
