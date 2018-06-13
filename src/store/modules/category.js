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
    state.all.find(ele => (ele.categoryID === category.categoryID)).categoryName = category.categoryName
  },

  delCategory (state, category) {
    state.all = state.all.filter(ele => {
      return ele.categoryID !== category.categoryID
    })
  }
}

const actions = {

  // data = { catagoryName: 'xxx' }
  addCategory ({ commit }, data) {
    categoryAPI.addCategory(data, response => {
      if (response.status === 200) {
        commit('addCategory', response.body.data)
      } else if (response.status === 403) {
        alert('addCategory fails')
      }
    }, response => {
      alert('addCategory fails')
    })
  },

  // data = { categoryID:1, catagoryName: 'xxx' }
  delCategory ({ commit }, data) {
    categoryAPI.delCategory(data, response => {
      if (response.status === 200) {
        commit('delCategory', response.body.data)
      } else if (response.status === 403) {
        alert('delCategory fails!')
      }
    }, response => {
      alert('delCategory fails!')
    })
  },

  // data = { categoryID:1, catagoryName: 'xxx' }
  renameCategory ({ commit }, data) {
    categoryAPI.getCategoryInfo(response => {
      if (response.status === 200) {
        commit('renameCategory', response.body.data)
      } else if (response.status === 403) {
        alert('renameCategory fails!')
      }
    }, response => {
      alert('renameCategory fails!')
    })
  },

  getCategoryInfo ({ commit }) {
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
