import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import UserCenter from '@/components/UserCenter'
import UpdatePwd from '@/components/UpdatePwd'
import UserInfo from '@/components/UserInfo'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Main from '@/views/Main'
import Page1 from '@/views/Page1'
import Page2 from '@/views/Page2'
import Index from '@/views/Index'
import BookList from '@/views/book/BookList'
import AddBook from '@/views/book/AddBook'
import Indexs from '@/views/indexPage/Index.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Indexs',
      name: 'Indexs',
      component: Indexs
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [{
          path: '/Page1',
          name: 'Page1',
          component: Page1
        },
        {
          path: '/Page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: '/Index',
          name: 'Index',
          component: Index
        },
        {
          path: '/book/BookList',
          name: 'book/BookList',
          component: BookList
        },
        {
          path: '/book/AddBook',
          name: 'book/BookList',
          component: AddBook
        }
      ]
      /* redirect:'/Index'//自定义跳转指定页面 */
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter,
      children: [{
          path: 'UpdatePwd',
          name: 'UpdatePwd',
          component: UpdatePwd
        },
        {
          path: 'UserInfo',
          name: 'UserInfo',
          component: UserInfo
        }
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
