import Vue from 'vue'
import Vuex from 'vuex'
// import category from './modules/category'
import dish from './modules/dish'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    dish
  },
  strict: debug
})
