<template>
  <div id="registBox">
      <registBox></registBox>
  </div>
</template>

<script>
import registBox from '@/components/registBox'
export default {
  name: 'registPage',
  components: {
    registBox
  }
}
</script>

<style>
#registBox {
  position: absolute;
  width: 180px;
  top: 30%;
  left: 60%;
  right: 30%;
}
</style>
