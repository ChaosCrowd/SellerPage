<template>
  <div id="registPage" :style="note">
      <registBox></registBox>
      <productionInfo></productionInfo>
      <producerInfo></producerInfo>
  </div>
</template>

<script>
import registBox from '@/components/registBox'
import productionInfo from '@/components/productionInfo'
import producerInfo from '@/components/producerInfo'

export default {
  name: 'registPage',
  components: {
    registBox,
    productionInfo,
    producerInfo
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
  min-height: 625px;
}

#registBox {
  position: absolute;
  width: 180px;
  top: 180px;
  right: 10%;
}

#productionInfo {
  position: absolute;
  top: 80px;
  right: 10%;
  width: 180px;
}

#producerInfo {
  text-align: center;
  position: fixed;
  width: 100%;
  padding: 0 20px 10px 20px;
  bottom: 0;
  font-size: 10pt;
}
</style>
