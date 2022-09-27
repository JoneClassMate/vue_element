<template>
  <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff"
    active-text-color="#ffd04b" :collapse="collapsed" :collapse-transition="bb">
    <!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <!-- 设置两个值：key index必须都是唯一的-->
    <el-submenu v-for="root in childNode" :index="'index-'+root.id" :key="'key-'+root.id">
      <template slot="title">
        <i :class="root.icon"></i>
        <span>{{root.text}}</span>
      </template>
      <!-- 生成子菜单 两个参数都不能唯一 index是跳转路径-->
      <el-menu-item v-for="node in root.modules" :index="node.url" :key="'key-'+node.id">
        <i :class="node.icon"></i>
        <span slot="title">{{node.text}}</span>
      </el-menu-item>
    </el-submenu>
    <!-- <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group> -->
  </el-menu>
</template>
<script>
  export default {
    name: "LeftAside",
    data: function() {
      return {
        /* collapsed: false, */
        bb: true,
        childNode: [] //用来保存接收初始化菜单的值
      }
    },
    methods: {},
    created: function() { //钩子函数
      //请求地址
      let url = this.axios.urls.QueryChildNodeByPid;
      let reloId={
        id:this.$store.getters.getRoleId
      };
      //开始请求后端
      this.axios.post(url,reloId).then(resp => { //成功回调函数
        this.childNode = resp.data.rows;
         /* console.info(this.childNode) */
      }).catch(resp => { //失败回调函数
        console.info(resp)
      });
    },
    computed: { //计算属性
      collapsed: function() {
        let collapsed = this.$store.getters.getCollapsed; //获取collapsed属性
        return collapsed;
      }
    }

  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }

  .el-menu-item-group__title {
    padding: 0px;
  }

  .el-menu-bg {
    background-color: #1f2d3d !important;
  }

  .el-menu {
    border: none;
  }

  .logobox {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }

  .logoimg {
    height: 40px;
  }
</style>
