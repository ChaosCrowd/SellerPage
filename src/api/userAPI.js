// import Vue from 'vue'
// import VueResource from 'vue-resource'
import apiConstant from './apiConstant'

// Vue.use(VueResource)
// Vue.http.options.root = apiConstant.API_URL
// Vue.http.headers.common['Content-Type'] = 'application/json'

export default {
  signin (data, onSuccess, onError) {
    apiConstant.myAxios.post('signin', data).then(onSuccess, onError)
  },

  signup (data, onSuccess, onError) {
    apiConstant.myAxios.post('signup', data).then(onSuccess, onError)
  }
}
