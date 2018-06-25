<template>
  <div id="acceptedOrderCardContainer">
    <div id="acceptedOrderCardHeader">
      <p id="acceptedOrderOrderIDText">订单号: {{ localOrderInfo.orderID }}</p>
      <p id="acceptedOrderTableIDText">桌号: {{ localOrderInfo.tableID }}</p>
      <p id="acceptedOrderTimeText">{{ localOrderInfo.time }}</p>
    </div>
    <div id="acceptedOrderCardBody">
      <b-table small
               hover
               :items="this.localOrderInfo.specificOrderContent"
               :fields="this.fields">
        <template slot="state" slot-scope="row">
          <p id="acceptedOrderState"
             @click.stop="finishDish(row.item)">{{ row.item.state }}</p>
        </template>
      </b-table>
    </div>
    <button>完成订单</button>
  </div>
</template>

<script>
export default {
  name: 'acceptedOrderCard',
  props: ['orderInfo'],
  data () {
    return {
      fields: [
        { key: '菜名', label: '菜名' },
        { key: '数量', label: '数量' },
        { key: 'state', label: '状态' }
      ],
      // asdf
      localOrderInfo: {
        orderID: null,
        orderState: null,
        tableID: null,
        time: null,
        orderContent: [],
        specificOrderContent: [],
        totalPrice: null
      }
    }
  },
  methods: {
    finishDish (item) {
      if (item.state === '等待中') {
        item.state = '准备中'
        item._cellVariants.state = 'info'
      } else if (item.state === '准备中') {
        item.state = '已完成'
        item._rowVariant = 'success'
      }
    }
  },
  mounted () {
    this.localOrderInfo = JSON.parse(JSON.stringify(this.orderInfo))
    this.localOrderInfo.time = (new Date(this.localOrderInfo.time)).toLocaleString()
    this.localOrderInfo.specificOrderContent = []
    this.localOrderInfo.orderContent.forEach((e) => {
      this.localOrderInfo.specificOrderContent.push({
        菜名: this.$store.state.dish.dishMap.get(e.dishID).dishName,
        数量: e.dishNum,
        state: '等待中',
        _rowVariant: 'none',
        _cellVariants: { state: 'warning' }
      })
    })
    // console.log(JSON.stringify(this.$store.state.order.acceptedOrderList))
  }
}
</script>

<style>

#acceptedOrderCardContainer {
  font-size: 10pt;
  padding: 5px 3px 5px 3px;
  width: 230px;
  box-shadow: 2px 2px 5px #888888;
  margin: 10px;
}

#acceptedOrderCardHeader {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

#acceptedOrderOrderIDText, #acceptedOrderTableIDText {
  text-align: left;
  margin: 5px 0 5px 10px;
  width: 40%;
  font-size: 11pt;
  font-weight: bold;
}

#acceptedOrderTimeText {
  text-align: left;
  margin: 0 0 5px 10px;
  font-size: 9pt;
}

#acceptedOrderState {
  cursor: pointer;
  margin: 0;
}

</style>
