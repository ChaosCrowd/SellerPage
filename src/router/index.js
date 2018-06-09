import Vue from 'vue'
import Router from 'vue-router'
import signinPage from '@/pages/signinPage'
import registPage from '@/pages/registPage'
import homePage from '@/pages/homePage'
import dishManagePage from '@/pages/dishManagePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: homePage
    },
    {
      path: '/signin',
      name: 'signin',
      component: signinPage
    },
    {
      path: '/regist',
      name: 'regist',
      component: registPage
    },
    {
      path: '/home',
      name: 'home',
      component: homePage,
      children: [
        {
          path: 'dishManage',
          component: dishManagePage
        }
      ]
    }
  ]
})
