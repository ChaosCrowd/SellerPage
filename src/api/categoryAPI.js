import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://private-924fb8-order51.apiary-mock.com'
Vue.http.headers.common['content-type'] = 'application/json;charset=UTF-8'

export default {
  addCategory (data, resolve, reject) {
    Vue.http.post('category', data).then(resolve, reject)
  },
  delCategory (data, resolve, reject) {
    Vue.http.delete('category', { body: data }).then(resolve, reject)
  },
  renameCategory (data, resolve, reject) {
    Vue.http.patch('category', data).then(resolve, reject)
  },
  getCategoryInfo (resolve, reject) {
    Vue.http.get('category').then(resolve, reject)
  }
}
