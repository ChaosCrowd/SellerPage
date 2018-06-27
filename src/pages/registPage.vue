<template>
  <div id="registPage" :style="note">
      <registBox></registBox>
  </div>
</template>

<script>
import registBox from '@/components/registBox'
export default {
  name: 'registPage',
  components: {
    registBox
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
  top: 20%;
  right: 10%;
}
</style>
