<template>
  <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapsed"
        :collapse-transition="true"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
</template>

<script>
	export default{
    name:'Left',
    computed: { //计算属性
      collapsed: function() {
        let collapsed = this.$store.getters.getCollapsed; //获取collapsed属性
        return collapsed;
      }
    }

	}
</script>

<style>
</style>
