<template>
  <div id="orderManagePage">
    <unacceptedOrderList></unacceptedOrderList>
    <acceptedOrderList></acceptedOrderList>
    <finishedOrderList></finishedOrderList>
  </div>
</template>

<script>
import unacceptedOrderList from '@/components/unacceptedOrderList'
import acceptedOrderList from '@/components/acceptedOrderList'
import finishedOrderList from '@/components/finishedOrderList'

export default {
  name: 'orderManagePage',
  components: {
    unacceptedOrderList,
    acceptedOrderList,
    finishedOrderList
  },
  mounted () {
    // var ws = new WebSocket('ws://172.18.156.83:8080/myHandler')
    // ws.onopen = function () {
    //   console.log('onpen')
    //   ws.send('{}')
    // }

    // ws.onclose = function () {
    //   console.log('onclose')
    // }

    // ws.onmessage = function (msg) {
    //   console.log(msg.data)
    // }
  }
}
</script>

<style>

#orderManagePage {
  display: flex;
  flex-wrap: wrap;
}

table {
  padding: 8px;
  margin: 0 !important;
}

caption {
  padding: 0 10px 0 0;
  margin-bottom: 5px;
  text-align: right;
}

button {
  font-size: 8pt;
}

th {
  padding: 2px !important;
}

td {
  padding: 1.5px !important;
}

</style>
