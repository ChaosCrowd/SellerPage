// import Vue from 'vue'
// import VueResource from 'vue-resource'
import apiConstant from './apiConstant'

// Vue.use(VueResource)
// Vue.http.options.root = apiConstant.API_URL
// Vue.http.headers.common['content-type'] = 'application/json'

export default {
  getOrderInfo (data, resolve, reject) {
    apiConstant.myAxios.get('query/order', { params: data }).then(resolve, reject)
  },

  acceptOrder (data, resolve, reject) {
    apiConstant.myAxios.get('accept/order', { params: data }).then(resolve, reject)
  },

  refuseOrder (data, resolve, reject) {
    apiConstant.myAxios.get('refuse/order', { params: data }).then(resolve, reject)
  },

  finishOrder (data, resolve, reject) {
    apiConstant.myAxios.get('finish/order', { params: data }).then(resolve, reject)
  }
}
