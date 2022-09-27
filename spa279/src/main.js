// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' //新添加1
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前
import App from './App'
import router from './router'
import axios from '@/api/http'
import VueAxios from 'vue-axios'
import store from './store'

//在开发环境中引入mackjs
/* process.env.MOCK && require('@/mock') */

Vue.use(VueAxios, axios)
Vue.use(ElementUI) //新添加3
Vue.config.productionTip = false

/* eslint-disable no-new */
window.jwt=new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  data: {//Bus总线
    //自定义的事件总线对象，用于父子组件的通信
    Bus: new Vue()
  }
})
