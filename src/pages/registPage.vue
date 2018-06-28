<template>
  <div id="registPage" :style="note">
      <registBox></registBox>
      <productionInfo></productionInfo>
  </div>
</template>

<script>
import registBox from '@/components/registBox'
import productionInfo from '@/components/productionInfo'

export default {
  name: 'registPage',
  components: {
    registBox,
    productionInfo
  },
  data () {
    return {
      note: {
        backgroundImage: 'url(' + require('@/assets/bgi.png') + ')',
        backgroundRepeat: 'repeat',
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
        margin: '0'
      }
    }
  }
}
</script>

<style>
#registPage {
  width: 100%;
  min-height: 600px;
}

#registBox {
  position: absolute;
  width: 180px;
  top: 30%;
  right: 10%;
}

#productionInfo {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 180px;
}
</style>
