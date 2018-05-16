import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/pages/loginPage'
import registPage from '@/pages/registPage'
import test from '@/pages/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/home',
      name: 'login',
      component: loginPage
    },
    {
      path: '/regist',
      name: 'regist',
      component: registPage
    }
  ]
})
