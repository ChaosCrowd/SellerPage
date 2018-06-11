<template>
  <div id="homePage">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from '@/components/navBar'
// import addDish from '@/components/addDish'
export default {
  name: 'homePage',
  components: {
    navBar
  },
  mounted () {
    this.$store.dispatch('category/getCategoryInfo')
  }
}
</script>

<style>

</style>
