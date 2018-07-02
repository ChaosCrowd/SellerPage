<template>
  <div id="finishedOrderCardContainer">
    <p id="finishedOrderTimeText">{{ this.orderInfo.time }}</p>
    <div id="finishedOrderCardBody">
        <b-table small
                  hover
                  :items="this.orderInfo.specificOrderContent">
          <template slot="table-caption">
            总价: {{ this.orderInfo.totalPrice }}
          </template>
        </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'finishedOrderCard',
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
  methods: {
    acceptOrder (event) {
      this.$store.dispatch('order/acceptOrder', { orderID: this.orderID })
    },
    refuseOrder (event) {
      this.$store.dispatch('order/refuseOrder', { orderID: this.orderID })
    }
  },
  mounted () {
    // alert(this.orderID)
    // alert(JSON.stringify(this.$store.state.order.finishedOrderList.get(this.orderID)))
    this.orderInfo = JSON.parse(JSON.stringify(this.$store.state.order.finishedOrderList.get(this.orderID)))
    // alert(JSON.stringify(this.orderInfo))
    this.orderInfo.time = (new Date(this.orderInfo.time)).toLocaleString()
    this.orderInfo.specificOrderContent = []
    // alert(JSON.stringify(this.orderInfo.orderContent))
    this.orderInfo.orderContent.forEach(e => {
      // alert(e.dishID)
      var dishInfo = this.$store.state.dish.dishMap.get(e.dishID)
      // console.log(dishInfo)
      // alert(dishInfo)
      if (dishInfo === undefined) {
        dishInfo = this.$store.state.dish.deletedDishMap.get(e.dishID)
        // console.log(dishInfo)
      }
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

#finishedOrderCardContainer {
  font-size: 10pt;
  padding: 5px 3px 5px 3px;
}

#finishedOrderTimeText {
  margin: 0;
}

/* .finishedOrderCardButton {
  font-size: 9pt;
  border-radius: 0%;
  border: none;
  padding: 4px 8px 4px 8px;
  color: #ff5858bb;
} */

</style>
