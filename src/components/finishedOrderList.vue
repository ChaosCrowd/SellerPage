<template>
  <div id="finishedOrderListContainer">
    <h5>已完成</h5>
    <div id="finishedOrderListBody">
      <div v-for="(order, index) in finishedOrderList" :key="order.orderID">
        <div @click="toggleFinishedOrder(index)" class="finishedOrderViewBox">
          <div id="finishedOrderIDBox">订单号: {{ order.orderID }}</div>
          <div id="finishedTableIDBox">桌号: {{ order.tableID }}</div>
        </div>
        <!-- isShow不能加this!!! -->
        <b-collapse v-model="isShow[index]" id="order.orderID" :key="order.orderID">
          <finishedOrderCard :orderID="order.orderID"></finishedOrderCard>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import finishedOrderCard from '@/components/finishedOrderCard'

export default {
  name: 'finishedOrderList',
  components: {
    finishedOrderCard
  },
  data () {
    return {
      // isShow写到store里
      isShow: []
    }
  },
  computed: {
    finishedOrderList () {
      // 如果store中用Map,那么这里必定要把Map转为Array,
      // 因为v-for不支持Map(tracker也没用)
      // 所以如果要提高效率,就需要把store中结构换成array
      var temp = []
      // 手动追踪
      // eslint-disable-next-line
      this.$store.state.order.finishedOrderListTracker
      // eslint-disable-next-line
      this.$store.state.order.finishedOrderList.forEach(e => {
        temp.push(e)
      })
      return temp
    }
  },
  methods: {
    toggleFinishedOrder (index) {
      // alert(index)
      this.isShow[index] = !this.isShow[index]
      // eslint-disable-next-line
      this.isShow.push(1)
      this.isShow.splice(this.isShow.length - 1, 1)
      // this.isShow.length += 1
      // this.isShow.length -= 1
    }
  },
  mounted () {
    // this.isShow = [false, false]
    this.$store.state.order.finishedOrderList.forEach((e) => {
      this.isShow.push(false)
    })
  }
}
</script>

<style>
#finishedOrderListContainer {
  width: 200px;
  margin: 30px auto 0 5%;
}

#finishedOrderListBody {
  box-shadow: 2px 2px 5px #888888;
}

h5 {
  text-align: left;
  padding-left: 10px;
}

.finishedOrderViewBox {
  background: white;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  transition: 0.2s;
}

.finishedOrderViewBox:hover {
  transform: scale(1.05);
  z-index: 1;
}

#finishedOrderIDBox, #finishedTableIDBox {
  width: 45%;
}
</style>
