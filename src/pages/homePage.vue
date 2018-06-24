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
    this.$store.dispatch('dish/getCategoryInfo').then(() => {
      this.$store.state.dish.all.forEach(e => {
        this.$store.dispatch('dish/getDishInfo', { categoryID: e.categoryID })
      })
    }, err => {
      console.error(err)
    }).then(() => {
      this.$store.dispatch('order/getUnacceptedOrderList')
      this.$store.dispatch('order/getAcceptedOrderList')
      this.$store.dispatch('order/getFinishedOrderList')
    })
  }
}
</script>

<style>

</style>
