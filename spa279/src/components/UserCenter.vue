<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <router-link to="/UserCenter/UserInfo">个人简介</router-link>
      <router-link to="/UserCenter/UpdatePwd">修改密码</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    return {
      msg: '个人中心'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
