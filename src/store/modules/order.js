import orderAPI from '../../api/orderAPI'

const state = {
  unacceptedOrderList: new Map(),
  acceptedOrderList: new Map(),
  finishedOrderList: new Map(),
  // isShow: [],
  unacceptedOrderListTracker: 0,
  acceptedOrderListTracker: 0,
  finishedOrderListTracker: 0
}

const getters = {}

const mutations = {
  getUnacceptedOrderList (state, data) {
    data.forEach(e => {
      if (!state.unacceptedOrderList.has(e.orderID)) {
        // 控制ui中unacceptedOrderCard是否显示
        // state.isShow.push(false)
        state.unacceptedOrderList.set(e.orderID, e)
      }
    })
    state.unacceptedOrderListTracker += 1
  },

  getAcceptedOrderList (state, data) {
    data.forEach(e => {
      if (!state.acceptedOrderList.has(e.orderID)) {
        state.acceptedOrderList.set(e.orderID, e)
      }
    })

    state.acceptedOrderListTracker += 1
  },

  getFinishedOrderList (state, data) {
    data.forEach(e => {
      if (!state.finishedOrderList.has(e.orderID)) {
        state.finishedOrderList.set(e.orderID, e)
      }
    })

    state.finishedOrderListTracker += 1
  },

  acceptOrder (state, data) {
    // 可能有bug, 如果商家连点accept那么可能发送多个请求
    // 收到response后可能unacceptedOrderList没有data.orderID
    var temp = state.unacceptedOrderList.get(data.orderID)
    // (对上述问题的部分解决,完全解决需要在服务端也进行判断)
    if (temp === undefined) return
    state.unacceptedOrderList.delete(data.orderID)
    temp.orderState = 'accepted'
    state.acceptedOrderList.set(data.orderID, temp)

    state.unacceptedOrderListTracker += 1
    state.acceptedOrderListTracker += 1
  },

  refuseOrder (state, data) {
    // 问题同上
    var temp = state.unacceptedOrderList.get(data.orderID)

    if (temp === undefined) return
    state.unacceptedOrderList.delete(data.orderID)
    temp.orderState = 'refused'
    // 拒绝的订单也视为结束
    state.finishedOrderList.set(data.orderID, temp)

    state.unacceptedOrderListTracker += 1
    state.finishedOrderListTracker += 1
  },

  finishOrder (state, data) {
    // 问题同上
    var temp = state.acceptedOrderList.get(data.orderID)

    if (temp === undefined) return
    state.acceptedOrderList.delete(data.orderID)
    temp.orderState = 'finished'
    // 拒绝的订单也视为结束
    state.finishedOrderList.set(data.orderID, temp)

    state.acceptedOrderListTracker += 1
    state.finishedOrderListTracker += 1
  },

  // 没有异步操作,所以就不写对应的action了
  trackUnacceptedOrderList (state) {
    state.unacceptedOrderListTracker += 1
  },

  trackAcceptedOrderList (state) {
    state.acceptedOrderListTracker += 1
  },

  trackFinishedOrderList (state) {
    state.finishedOrderListTracker += 1
  }
}

const actions = {

  getUnacceptedOrderList ({ commit }) {
    orderAPI.getOrderInfo({ orderState: 'unaccepted' }, response => {
      if (response.status === 200) {
        // alert(JSON.stringify(response.data))
        commit('getUnacceptedOrderList', response.data.data)
      } else if (response.status === 403) {
        alert('getUnacceptedOrderList fails!')
      }
    }, response => {
      alert('getUnacceptedOrderList fails!')
    })
  },

  getAcceptedOrderList ({ commit }) {
    orderAPI.getOrderInfo({ orderState: 'accepted' }, response => {
      if (response.status === 200) {
        commit('getAcceptedOrderList', response.data.data)
      } else if (response.status === 403) {
        alert('getAcceptedOrderList fails!')
      }
    }, response => {
      alert('getAcceptedOrderList fails!')
    })
  },

  getFinishedOrderList ({ commit }) {
    orderAPI.getOrderInfo({ orderState: 'finished' }, response => {
      if (response.status === 200) {
        commit('getFinishedOrderList', response.data.data)
      } else if (response.status === 403) {
        alert('getFinishedOrderList fails!')
      }
    }, response => {
      alert('getFinishedOrderList fails!')
    })
  },

  acceptOrder ({ commit }, data) {
    orderAPI.acceptOrder(data, response => {
      if (response.status === 200) {
        commit('acceptOrder', response.data.data)
      } else if (response.status === 403) {
        alert('acceptOrder fails!')
      }
    }, response => {
      alert('acceptOrder fails!')
    })
  },

  refuseOrder ({ commit }, data) {
    orderAPI.refuseOrder(data, response => {
      if (response.status === 200) {
        commit('refuseOrder', response.data.data)
      } else if (response.status === 403) {
        alert('refuseOrder fails!')
      }
    }, response => {
      alert('refuseOrder fails!')
    })
  },

  finishOrder ({ commit }, data) {
    orderAPI.finishOrder(data, response => {
      if (response.status === 200) {
        commit('finishOrder', response.data.data)
      } else if (response.status === 403) {
        alert('finishOrder fails!')
      }
    }, response => {
      alert('finishOrder fails!')
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
