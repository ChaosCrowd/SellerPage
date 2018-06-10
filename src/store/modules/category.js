import categoryAPI from '../../api/categoryAPI'

const state = {
  all: []
}

const getters = {}

const mutations = {
  getCategoryInfo (state, categories) {
    state.all = categories
  },

  addCategory (state, category) {
    state.all.push(category)
  },

  renameCategory (state, category) {
    state.all.find(ele => (ele.id === category.id)).name = category.name
  },

  delCategory (state, category) {
    state.all = state.all.filter(ele => {
      return ele.id !== category.id
    })
  }
}

const actions = {
  getCategoryInfo ({ state, commit }) {
    categoryAPI.getCategoryInfo(response => {
      if (response.status === 200) {
        commit('getCategoryInfo', response.body.data)
      } else if (response.status === 403) {
        alert('getCategoryInfo fails!')
      }
    }, response => {
      alert('getCategoryInfo fails!')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
