import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://private-0131b-order210.apiary-mock.com'
Vue.http.headers.common['content-type'] = 'application/json'

export default {
  addCategory (data, resolve, reject) {
    Vue.http.post('add/category', data).then(resolve, reject)
  },
  delCategory (data, resolve, reject) {
    Vue.http.get('delete/category', { params: data }).then(resolve, reject)
  },
  renameCategory (data, resolve, reject) {
    Vue.http.post('modify/category', data).then(resolve, reject)
  },
  getCategoryInfo (resolve, reject) {
    Vue.http.get('query/category').then(resolve, reject)
  }
}
