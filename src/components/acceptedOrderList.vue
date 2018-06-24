<template>
  <div id="acceptedOrderListContainer">
    <h5>处理中</h5>
    <div id="acceptedOrderListBody">
      <div v-for="order in acceptedOrderList" :key="order.orderID">
        <acceptedOrderCard></acceptedOrderCard>
      </div>
    </div>
  </div>
</template>

<script>
import acceptedOrderCard from '@/components/acceptedOrderCard'

export default {
  name: 'acceptedOrderList',
  components: {
    acceptedOrderCard
  },
  data () {
    return {
      acceptedOrderList: [
        {
          orderID: 1
        },
        {
          orderID: 2
        },
        {
          orderID: 3
        }
      ]
    }
  }
}
</script>

<style>
#acceptedOrderListContainer {
  width: 70%;
  min-width: 250px;
  margin: 30px auto 0 auto;
}

#acceptedOrderListBody {
  display: flex;
  flex-wrap: wrap;
}

h5 {
  text-align: left;
  padding-left: 10px;
}

.acceptedOrderViewButton {
  background: white;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  transition: 0.2s;
}

.acceptedOrderViewButton:hover {
  transform: scale(1.05);
  z-index: 1;
}

#acceptedOrderIDBox, #acceptedTableIDBox {
  width: 45%;
}
</style>
