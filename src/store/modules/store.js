import storeAPI from '../../api/storeAPI'
import { resolve } from 'dns';

const state = {
  tableList: [],
  name: "",
  notice: "",
  icon: "",
  phone: "",
  location: "",
  status: 1
}

const getters = {}

const mutations = {

    addTable (state, data) {
      state.tableList.push(data)
    },

    delTable (state, data) {
      for (var i = 0; i < state.tableList.length; i++) {
        if (state.tableList[i] === data) {
          state.tableList.splice(i, 1)
          break
        }
      }
    },

    getTableInfo (state, data) {
      state.tableList = data
    },

    setBasicInfo (state, data) {
      state.name = data.name
      state.notice = data.notice
      state.icon = data.icon
      state.phone = data.phone
      state.location = data.location
      state.status = data.status
    }
}

const actions = {
  addTable ({ commit }, data) {
    storeAPI.addTable(data, response => {
      if (response.status === 200) {
        commit('addTable', response.body.data)
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
        commit('delTable', response.body.data)
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
        commit('getTableInfo', response.body.data)
      } else if (response.status === 403) {
        alert('getTableInfo fails!')
      }
    }, response => {
      alert('getTableInfo fails!')
    })
  },

  modifyBasicInfo ({ commit }, data) {
    storeAPI.modifyBasicInfo(data, response => {
      if (response.status === 200) {
        commit('setBasicInfo', response.body.data)
      } else {
        alert('modifyBasicInfo fails!')
      }
    }, response => {
      alert('modifyBasicInfo fails!')
    })
  },

  getBasicInfo ({ commit }, data) {
    storeAPI.getBasicInfo(response => {
      if (response.status === 200) {
        commit()
      }
    })
  }
}