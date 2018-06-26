// import Vue from 'vue'
// import VueResource from 'vue-resource'
import apiConstant from './apiConstant'

// Vue.use(VueResource)
// Vue.http.options.root = apiConstant.API_URL
// Vue.http.headers.common['Content-Type'] = 'application/json'

export default {
  addTable (data, resolve, reject) {
    apiConstant.myAxios.get('add/table', { params: data }).then(resolve, reject)
  },

  delTable (data, resolve, reject) {
    apiConstant.myAxios.get('delete/table', { params: data }).then(resolve, reject)
  },

  getTableInfo (resolve, reject) {
    apiConstant.myAxios.get('query/table').then(resolve, reject)
  },

  modifyBasicInfo (data, resolve, reject) {
    apiConstant.myAxios.post('modify/basic', data).then(resolve, reject)
  },

  getBasicInfo (resolve, reject) {
    apiConstant.myAxios.get('query/basic').then(resolve, reject)
  }
}
