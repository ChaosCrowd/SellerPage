import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://private-924fb8-order51.apiary-mock.com'

export default {
  addCategory (data, onSuccess, onError) {
    Vue.http.post('category', data).then(onSuccess, onError)
  },
  delCategory (data, onSuccess, onError) {
    Vue.http.delete('category', { body: data }).then(onSuccess, onError)
  },
  renameCategory (data, onSuccess, onError) {
    Vue.http.patch('category', data).then(onSuccess, onError)
  },
  getCategoryInfo (onSuccess, onError) {
    Vue.http.get('category').then(onSuccess, onError)
  }
}
