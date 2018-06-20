import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://private-0131b-order210.apiary-mock.com'
Vue.http.headers.common['Content-Type'] = 'application/json'

export default {
  addDish (data, onSuccess, onError) {
    Vue.http.post('add/dish', data).then(onSuccess, onError)
  },
  delDish (data, onSuccess, onError) {
    Vue.http.get('delete/dish', { params: data }).then(onSuccess, onError)
  },
  modifyDish (data, onSuccess, onError) {
    Vue.http.post('modify/dish', data).then(onSuccess, onError)
  },
  getDishInfo (data, onSuccess, onError) {
    Vue.http.get('query/dish', { params: data }).then(onSuccess, onError)
  }
}
