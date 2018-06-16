import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://private-924fb8-order51.apiary-mock.com'

export default {
  addDish (data, onSuccess, onError) {
    Vue.http.post('dish', data).then(onSuccess, onError)
  },
  delDish (data, onSuccess, onError) {
    Vue.http.delete('dish', { body: data }).then(onSuccess, onError)
  },
  modifyDish (data, onSuccess, onError) {
    Vue.http.patch('dish', data).then(onSuccess, onError)
  },
  getDishInfo (data, onSuccess, onError) {
    Vue.http.get('dish', { body: data }).then(onSuccess, onError)
  }
}
