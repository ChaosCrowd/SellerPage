import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://private-924fb8-order51.apiary-mock.com'
Vue.http.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

export default {
  signin (data, onSuccess, onError) {
    Vue.http.post('signin', data).then(onSuccess, onError)
  }
}
