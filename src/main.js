// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
// import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
// Vue.use(VueResource)

router.beforeEach((to, from, next) => {
  if (to.meta.needSignin) {
    if (window.localStorage.data) {
      next()
    } else {
      alert('请先登录')
      next('/signin')
    }
  } else {
    next()
  }
})

// Vue.http.options.root = 'https://private-924fb8-order51.apiary-mock.com'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
