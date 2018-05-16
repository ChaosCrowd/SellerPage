<template>
  <div id="loginBox">
      <loginBox></loginBox>
  </div>
</template>

<script>
import loginBox from '@/components/loginBox'
export default {
  name: 'loginPage',
  components: {
    loginBox
  }
}
</script>

<style>
#loginBox {
  position: absolute;
  width: 180px;
  top: 30%;
  left: 60%;
  right: 30%;
}
</style>
