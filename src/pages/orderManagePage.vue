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
