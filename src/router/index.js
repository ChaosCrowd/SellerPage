import Vue from 'vue'
import Router from 'vue-router'
import signinPage from '@/pages/signinPage'
import registPage from '@/pages/registPage'
import homePage from '@/pages/homePage'
import dishManagePage from '@/pages/dishManagePage'
import orderManagePage from '@/pages/orderManagePage'
import storeManagePage from '@/pages/storeManagePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      meta: {
        needSignin: true
      },
      children: [
        {
          path: 'dishManage',
          name: 'dishManage',
          component: dishManagePage,
          meta: {
            needSignin: true
          }
        },
        {
          path: 'orderManage',
          name: 'orderManage',
          component: orderManagePage,
          meta: {
            needSignin: true
          }
        },
        {
          path: 'storeManage',
          name: 'storeManage',
          component: storeManagePage,
          meta: {
            needSignin: true
          }
        }
      ]
    },
    {
      path: '*',
      component: signinPage
    }
  ]
})
