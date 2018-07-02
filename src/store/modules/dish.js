import dishAPI from '../../api/dishAPI'
import categoryAPI from '../../api/categoryAPI'
// dishMap = Map(dishID, dishInfo)
// relationMap = Map(categoryID, Set([dihsID1,dishID2...]))
const state = {
  all: [],
  dishMap: new Map(),
  relationMap: new Map(),
  dishMapChange: 0,
  relationMapChange: 0,
  deletedDishMap: new Map(),
  deletedDishMapTracker: 0
}

const getters = {}

const mutations = {
  getCategoryInfo (state, categories) {
    state.all = categories
    // 在数组头中添加一个所有菜品的类别
    state.all.unshift({ categoryID: -1, categoryName: '所有菜品' })
    state.relationMap.set(-1, new Set([]))
  },

  addCategory (state, category) {
    state.all.push(category)
  },

  renameCategory (state, category) {
    // alert(category.categoryName)
    state.all.find(ele => {
      return ele.categoryID === category.categoryID
    }).categoryName = category.categoryName
  },

  delCategory (state, category) {
    state.all = state.all.filter(ele => {
      return ele.categoryID !== category.categoryID
    })
    state.relationMap.delete(category.categoryID)
  },

  addDish (state, data) {
    // 把dishInfo加入dishMap
    // 由于是新建dish，所以id不可能已经存在
    state.dishMap.set(data.dishInfo.dishID, data.dishInfo)
    // 把菜加入默认类别
    state.relationMap.get(-1).add(data.dishInfo.dishID)
    // 把所属类别加入relationMap
    // 如果map键不存在那就新建
    data.categoryID.forEach(element => {
      if (!state.relationMap.has(element)) {
        state.relationMap.set(element, new Set([data.dishInfo.dishID]))
      } else {
        state.relationMap.get(element).add(data.dishInfo.dishID)
      }
    })
  },
  delDish (state, data) {
    // 把dishInfo从dishMap中删除
    state.dishMap.delete(data.dishInfo.dishID)
    // 删除对应relation(这个方法里并没有用到返回的catagoryID数组)
    // element是Set，并且是引用
    state.relationMap.forEach(element => {
      element.delete(data.dishInfo.dishID)
    })

    // 手动追踪变化
    state.dishMapChange += 1
    state.relationMapChange += 1
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
    // 首先从所有类别中删除,但是不能从默认类别中删除
    state.relationMap.forEach((element, key) => {
      if (key !== -1) {
        element.delete(data.dishInfo.dishID)
      }
    })
    // 再重新添加
    // 注意这里categoryID有可能不存在于relationMap
    data.categoryID.forEach(element => {
      if (!state.relationMap.has(element)) {
        state.relationMap.set(element, new Set([data.dishInfo.dishID]))
      } else {
        state.relationMap.get(element).add(data.dishInfo.dishID)
      }
    })
    state.relationMapChange += 1
  },
  getDishInfo (state, data) {
    // 当前的实现仅针对第一种request
    // 如果categoryID不存在于relationMap中
    // alert('getDishInfo'+JSON.stringify(data))
    if (!state.relationMap.has(data.categoryID[0])) {
      state.relationMap.set(data.categoryID[0], new Set())
    }
    // 没有菜直接返回
    if (data.dishInfo === []) return
    // alert(JSON.stringify(state.relationMap.get(data.categoryID[0])))
    // 把dishInfo中的元素加到两个Map里
    data.dishInfo.forEach(element => {
      state.dishMap.set(element.dishID, element)
      // 所有菜都放入默认类别
      state.relationMap.get(-1).add(element.dishID)
      // 有类别的菜放入对应类别
      if (data.categoryID[0] !== -1) {
        state.relationMap.get(data.categoryID[0]).add(element.dishID)
      }
    })
  },
  getDeletedDishInfo (state, data) {
    state.deletedDishMapTracker += 1
    // console.log('In mutation getDeletedDishInfo:' + JSON.stringify(data) + data.dishID)
    if (!state.deletedDishMap.has(data.dishID)) {
      state.deletedDishMap.set(data.dishID, data)
    }
  }
}

const actions = {
  // data = { catagoryName: 'xxx' }
  addCategory ({ commit }, data) {
    categoryAPI.addCategory(data, response => {
      if (response.status === 200) {
        commit('addCategory', response.data.data)
      } else {
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
        commit('delCategory', response.data.data)
      } else {
        alert('delCategory fails!')
      }
    }, response => {
      alert('delCategory fails!')
    })
  },

  // data = { categoryID:1, catagoryName: 'xxx' }
  renameCategory ({ commit }, data) {
    return new Promise((resolve, reject) => {
      categoryAPI.renameCategory(data, response => {
        if (response.status === 200) {
          commit('renameCategory', response.data.data)
          resolve()
        } else {
          reject(new Error('renameCategory fails!'))
        }
      }, response => {
        reject(new Error('renameCategory fails!'))
      })
    })
  },

  getCategoryInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      categoryAPI.getCategoryInfo(response => {
        if (response.status === 200) {
          console.log('!!!!!' + JSON.stringify(response.data.data))
          commit('getCategoryInfo', response.data.data)
          resolve()
        } else {
          // alert('getCategoryInfo fails!')
          reject(new Error('getCategoryInfo fails!'))
        }
      }, response => {
        // alert('getCategoryInfo fails!')
        reject(new Error('getCategoryInfo fails!'))
      })
    })
  },

  addDish ({ commit }, data) {
    return new Promise((resolve, reject) => {
      dishAPI.addDish(data, response => {
        if (response.status === 200) {
          commit('addDish', response.data.data)
          resolve(response.data.data.dishInfo.dishName)
        } else {
          alert('addDish fail!')
        }
      }, err => {
        reject(err.response.data.msg)
      })
    })
  },

  delDish ({ commit }, data) {
    dishAPI.delDish(data, response => {
      if (response.status === 200) {
        commit('delDish', response.data.data)
      } else {
        alert('delDish fail!')
      }
    }, response => {
      alert('delDish fail!')
    })
  },

  modifyDish ({ commit }, data) {
    return new Promise((resolve, reject) => {
      dishAPI.modifyDish(data, response => {
        if (response.status === 200) {
          commit('modifyDish', response.data.data)
          resolve(response.data.data.dishInfo.dishName)
        } else {
          alert('modifyDish fail!')
        }
      }, err => {
        reject(err.response.data.msg)
      })
    })
  },

  getDishInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      dishAPI.getDishInfo(data, response => {
        if (response.status === 200) {
          commit('getDishInfo', response.data.data)
          resolve(response.data.data)
        } else {
          console.log('getDishInfo fails!')
        }
      }, err => {
        reject(err)
      })
    })
  },

  getDeletedDishInfo ({ commit }, data) {
    // alert(JSON.stringify(data.dishID))
    return new Promise((resolve, reject) => {
      dishAPI.getDeletedDishInfo(data, response => {
        response.data.data.dishID = data.dishID
        commit('getDeletedDishInfo', response.data.data)
        resolve(response.data.data)
      }, err => {
        reject(err)
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
