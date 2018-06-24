<template>
  <div id="acceptedOrderCardContainer">
    <div id="acceptedOrderCardHeader">
      <p id="acceptedOrderOrderIDText">订单号: {{ this.orderInfo.orderID }}</p>
      <p id="acceptedOrderTableIDText">桌号: {{ this.orderInfo.tableID }}</p>
      <p id="acceptedOrderTimeText">{{ this.orderInfo.time }}</p>
    </div>
    <div id="acceptedOrderCardBody">
      <b-table small
               hover
               :items="this.orderInfo.orderContent"
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
  props: ['orderID'],
  data () {
    return {
      orderInfo: {
        orderID: null,
        tableID: null,
        time: null,
        orderContent: []
      },
      fields: [
        { key: '菜名', label: '菜名' },
        { key: '数量', label: '数量' },
        { key: 'state', label: '状态' }
      ]
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
    this.orderInfo.orderID = 5
    // 先写死数据
    this.orderInfo.tableID = 10
    this.orderInfo.time = (new Date()).toLocaleString()
    this.orderInfo.orderContent.push({
      菜名: '烤鱿鱼丝',
      数量: 2,
      state: '等待中',
      _rowVariant: 'none',
      _cellVariants: { state: 'warning' }
    })
    this.orderInfo.orderContent.push({
      菜名: '炒土豆丝',
      数量: 2,
      state: '等待中',
      _rowVariant: 'none',
      _cellVariants: { state: 'warning' }
    })
    this.orderInfo.orderContent.push({
      菜名: '炒土豆丝',
      数量: 2,
      state: '等待中',
      _rowVariant: 'none',
      _cellVariants: { state: 'warning' }
    })
    this.orderInfo.orderContent.push({
      菜名: '炒土豆丝',
      数量: 2,
      state: '等待中',
      _rowVariant: 'none',
      _cellVariants: { state: 'warning' }
    })
    this.orderInfo.orderContent.push({
      菜名: '炒土豆丝',
      数量: 2,
      state: '等待中',
      _rowVariant: 'none',
      _cellVariants: { state: 'warning' }
    })
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
