<template>
  <div id="orderManagePage">
    <unacceptedOrderList></unacceptedOrderList>
    <acceptedOrderList></acceptedOrderList>
  </div>
</template>

<script>
import unacceptedOrderList from '@/components/unacceptedOrderList'
import acceptedOrderList from '@/components/acceptedOrderList'

export default {
  name: 'orderManagePage',
  components: {
    unacceptedOrderList,
    acceptedOrderList
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
