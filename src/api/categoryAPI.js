// import Vue from 'vue'
// import VueResource from 'vue-resource'
import apiConstant from './apiConstant'

// Vue.use(VueResource)
// Vue.http.options.root = apiConstant.API_URL
// Vue.http.headers.common['content-type'] = 'application/json;charset=UTF-8'

export default {
  addCategory (data, resolve, reject) {
    apiConstant.myAxios.post('add/category', { categoryName: data }).then(resolve, reject)
  },
  delCategory (data, resolve, reject) {
    apiConstant.myAxios.get('delete/category', { params: data }).then(resolve, reject)
  },
  renameCategory (data, resolve, reject) {
    apiConstant.myAxios.post('modify/category', data).then(resolve, reject)
  },
  getCategoryInfo (resolve, reject) {
    apiConstant.myAxios.get('query/category').then(resolve, reject)
  }
}
