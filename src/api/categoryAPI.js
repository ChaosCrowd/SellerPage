import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://private-924fb8-order51.apiary-mock.com'

export default {
  getCategoryInfo(onSuccess, onError) {
    Vue.http.get('category').then(onSuccess, onError)
  }
}