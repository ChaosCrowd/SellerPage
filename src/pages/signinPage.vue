<template>
  <div id="signinBox">
      <signinBox></signinBox>
  </div>
</template>

<script>
import signinBox from '@/components/signinBox'
export default {
  name: 'signinPage',
  components: {
    signinBox
  }
}
</script>

<style>
#signinBox {
  position: absolute;
  width: 180px;
  top: 30%;
  left: 60%;
  right: 30%;
}
</style>
