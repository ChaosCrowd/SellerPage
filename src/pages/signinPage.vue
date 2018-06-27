<template>
  <div id="signinPage" :style="note">
      <signinBox></signinBox>
  </div>
</template>

<script>
import signinBox from '@/components/signinBox'
export default {
  name: 'signinPage',
  components: {
    signinBox
  },
  data () {
    return {
      note: {
        backgroundImage: 'url(' + require('../assets/bgi.png') + ')',
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
#signinPage {
  width: 100%;
  min-height: 600px;
}

#signinBox {
  position: absolute;
  width: 180px;
  top: 30%;
  right: 10%;
}
</style>
