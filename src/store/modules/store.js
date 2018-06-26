import storeAPI from '../../api/storeAPI'

const state = {
  tableList: [],
  name: '',
  notice: '',
  phone: '',
  location: '',
  status: 1
}

const getters = {}

const mutations = {

  addTable (state, data) {
    state.tableList.push(data)
  },

  delTable (state, data) {
    for (var i = 0; i < state.tableList.length; i++) {
      if (state.tableList[i].tableID === data.tableID) {
        state.tableList.splice(i, 1)
        break
      }
    }
  },

  getTableInfo (state, data) {
    data.tableID.forEach((e) => {
      state.tableList.push({ tableID: e })
    })
  },

  setBasicInfo (state, data) {
    state.name = data.name
    state.notice = data.notice
    state.phone = data.phone
    state.location = data.location
    state.status = data.status
  }
}

const actions = {
  addTable ({ commit }, data) {
    storeAPI.addTable(data, response => {
      if (response.status === 200) {
        commit('addTable', response.data.data)
      } else if (response.status === 403) {
        alert('addTable fails!')
      }
    }, response => {
      alert('addTable fails!')
    })
  },

  delTable ({ commit }, data) {
    storeAPI.delTable(data, response => {
      if (response.status === 200) {
        commit('delTable', response.data.data)
      } else if (response.status === 403) {
        alert('delTable fails!')
      }
    }, response => {
      alert('delTable fails!')
    })
  },

  getTableInfo ({ commit }) {
    storeAPI.getTableInfo(response => {
      if (response.status === 200) {
        commit('getTableInfo', response.data.data)
      } else if (response.status === 403) {
        alert('getTableInfo fails!')
      }
    }, response => {
      alert('getTableInfo fails!')
    })
  },

  modifyBasicInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      storeAPI.modifyBasicInfo(data, response => {
        if (response.status === 200) {
          commit('setBasicInfo', response.data.data)
          resolve()
        } else {
          reject(new Error('modifyBasicInfo fails!'))
        }
      }, response => {
        reject(new Error('modifyBasicInfo fails!'))
      })
    })
  },

  getBasicInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      storeAPI.getBasicInfo(response => {
        if (response.status === 200) {
          commit('setBasicInfo', response.data.data)
          resolve()
        } else {
          reject(new Error('getBasicInfo fails!'))
        }
      }, response => {
        reject(new Error('getBasicInfo fails!'))
      })
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
