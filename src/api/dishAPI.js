// import Vue from 'vue'
// import VueResource from 'vue-resource'
import apiConstant from './apiConstant'

// Vue.use(VueResource)
// Vue.http.options.root = apiConstant.API_URL
// Vue.http.headers.common['Content-Type'] = 'application/json'

export default {
  addDish (data, onSuccess, onError) {
    apiConstant.myAxios.post('add/dish', data).then(onSuccess, onError)
  },
  delDish (data, onSuccess, onError) {
    apiConstant.myAxios.get('delete/dish', { params: data }).then(onSuccess, onError)
  },
  modifyDish (data, onSuccess, onError) {
    apiConstant.myAxios.post('modify/dish', data).then(onSuccess, onError)
  },
  getDishInfo (data, onSuccess, onError) {
    apiConstant.myAxios.get('query/dish', { params: data }).then(onSuccess, onError)
  }
}
