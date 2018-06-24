<template>
  <div id="unacceptedOrderCardContainer">
    <p id="unacceptedOrderTimeText">{{ this.orderInfo.time }}</p>
    <div id="unacceptedOrderCardBody">
        <b-table small
                  hover
                  :items="this.orderInfo.specificOrderContent">
          <template slot="table-caption">
            总价: {{ this.orderInfo.totalPrice }}
          </template>
        </b-table>
        <button>接收订单</button>
        <button>拒绝订单</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unacceptedOrderCard',
  props: ['orderID'],
  data () {
    return {
      orderInfo: {
        orderID: null,
        tableID: null,
        time: null,
        orderContent: [],
        specificOrderContent: [],
        totalPrice: null
      }
    }
  },
  mounted () {
    // alert(this.orderID)
    // alert(JSON.stringify(this.$store.state.order.unacceptedOrderList.get(this.orderID)))
    this.orderInfo = JSON.parse(JSON.stringify(this.$store.state.order.unacceptedOrderList.get(this.orderID)))
    this.orderInfo.time = (new Date(this.orderInfo.time)).toLocaleString()
    this.orderInfo.specificOrderContent = []
    // alert(JSON.stringify(this.orderInfo.orderContent))
    this.orderInfo.orderContent.forEach(e => {
      // alert(e.dishID)
      var dishInfo = this.$store.state.dish.dishMap.get(e.dishID)
      // alert(JSON.stringify(dishInfo))
      this.orderInfo.specificOrderContent.push({
        菜名: dishInfo.dishName,
        单价: dishInfo.dishPrice,
        数量: e.dishNum
      })
    })
  }
}
</script>

<style>

#unacceptedOrderCardContainer {
  font-size: 10pt;
  padding: 5px 3px 5px 3px;
}

#unacceptedOrderTimeText {
  margin: 0;
}

</style>
