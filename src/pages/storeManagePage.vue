<template>
  <div id="storeManagePage">
    <modifyBasicInfoBox></modifyBasicInfoBox>
    <tableList></tableList>
  </div>
</template>

<script>
import modifyBasicInfoBox from '@/components/modifyBasicInfoBox'
import tableList from '@/components/tableList'

export default {
  name: 'storeManagePage',
  components: {
    modifyBasicInfoBox,
    tableList
  },
  data () {
    return {
    }
  }
}
</script>

<style>

#storeManagePage {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

</style>
