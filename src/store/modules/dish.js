import dishAPI from '../../api/dishAPI'

// dishMap = Map(dishID, dishInfo)
// relationMap = Map(categoryID, Set([dihsID1,dishID2...]))
const state = {
  dishMap: new Map(),
  relationMap: new Map()
}

const getters = {}

const mutations = {
  addDish (state, data) {
    // 把dishInfo加入dishMap
    // 由于是新建dish，所以id不可能已经存在
    state.dishMap.set(data.dishInfo.dishID, data.dishInfo)
    // 把所属类别加入relationMap
    // 如果map键不存在那就新建
    data.categoryID.forEach(element => {
      if (state.relationMap.get(element) === undefined) {
        state.relationMap.set(element, new Set([data.dishInfo.dishID]))
      } else {
        state.relationMap.get(element).add(data.dishInfo.dishID)
      }
    })
  },
  delDish (state, data) {
    // 把dishInfo从dishMap中删除
    state.dishMap.delete(data.dishInfo.dishID)
    // 删除对应relation
    // element是Set，并且是引用
    state.relationMap.forEach(element => {
      element.delete(data.dishInfo.dishID)
    })
    // 下面的方法效率高,但通用性差(从action modify中调用会出错),备用
    // data.categoryID.forEach(element => {
    //   state.relationMap.get(element).delete(data.dishInfo.dishID)
    // })
  },
  modifyDish (state, data) {
    // 只考虑categoryID不为空的情况,其余交给delDish
    // 修改dishMap中对饮的dishInfo
    state.dishMap.set(data.dishInfo.dishID, data.dishInfo)
    // 修改类别(目前效率不高)
    // 首先从所有类别中删除
    state.relationMap.forEach(element => {
      element.delete(data.dishInfo.dishID)
    })
    // 再重新添加
    // 注意这里categoryID有可能不存在于relationMap
    data.categoryID.forEach(element => {
      if (state.relationMap.get(element) === undefined) {
        state.relationMap.set(element, new Set([data.dishInfo.dishID]))
      } else {
        state.relationMap.get(element).add(data.dishInfo.dishID)
      }
    })
  },
  getDishInfo (state, data) {
    // 当前的实现仅针对第一种request
    // 如果categoryID不存在于relationMap中
    if (state.relationMap.get(data.categoryID) === undefined) {
      state.relationMap.set(data.categoryID, new Set())
    }
    // 把dishInfo中的元素加到两个Map里
    data.dishInfo.forEach(element => {
      state.dishMap.set(element.dishID, element)
      state.relationMap.get(data.categoryID).add(element)
    })
  }
}

const actions = {
  addDish ({ commit }, data) {
    dishAPI.addDish(data, response => {
      if (response.status === 200) {
        commit('addDish', response.body.data)
      } else if (response.status === 403) {
        alert('addDish fail!')
      }
    }, response => {
      alert('addDish fail!')
    })
  },
  delDish ({ commit }, data) {
    dishAPI.delDish(data, response => {
      if (response.status === 200) {
        commit('delDish', response.body.data)
      } else if (response.status === 403) {
        alert('delDish fail!')
      }
    }, response => {
      alert('delDish fail!')
    })
  },
  modifyDish ({ commit }, data) {
    dishAPI.modifyDish(data, response => {
      if (response.status === 200) {
        if (response.body.data.categoryID.length === 0) {
          // 如果categoryID长度为0那么就需要完全删除菜品
          commit('delDish', response.body.data)
        } else {
          // 如果categoryID长度不为0那么就修改信息
          commit('modifyDish', response.body.data)
        }
      } else if (response.status === 403) {
        alert('modifyDish fail!')
      }
    }, response => {
      alert('modifyDish fail!')
    })
  },
  getDishInfo ({ commit }, data) {
    dishAPI.getDishInfo(data, response => {
      if (response.status === 200) {
        commit('getDishInfo', response.body.data)
      } else if (response.status === 403) {
        alert('getDishInfo fail!')
      }
    }, response => {
      alert('getDishInfo fail!')
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
