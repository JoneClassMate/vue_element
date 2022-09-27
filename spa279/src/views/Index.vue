<template>
    <el-carousel indicator-position="outside" height="600px">
      <el-carousel-item v-for="item in 4" :key="item">
       <img src="../assets/img/bg.png" />
      </el-carousel-item>
    </el-carousel>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: '欢迎来到明辉工作室'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
