import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/loginPage'
import registPage from '@/components/registPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
