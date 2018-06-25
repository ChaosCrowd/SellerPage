import Vue from 'vue'
import VueResource from 'vue-resource'
import apiConstant from './apiConstant'

Vue.use(VueResource)
Vue.http.options.root = apiConstant.API_URL
Vue.http.headers.common['Content-Type'] = 'application/json'

export default {
  addTable (data, resolve, reject) {
    Vue.http.get('add/table', { params: data }).then(resolve, reject)
  },

  delTable (data, resolve, reject) {
    Vue.http.get('delete/table', { params: data }).then(resolve, reject)
  },

  getTableInfo (resolve, reject) {
    Vue.http.get('query/table').then(resolve, reject)
  },

  modifyBasicInfo (data, resolve, reject) {
    Vue.http.post('modify/basic', data).then(resolve, reject)
  },

  getBasicInfo (data, resolve, reject) {
    Vue.http.get('query/basic').then(resolve, reject)
  }
}