<template>
  <div id="homePage" :style="note">
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
  },
  mounted () {
    this.$store.dispatch('dish/getCategoryInfo').then(() => {
      this.$store.state.dish.all.forEach((e, key) => {
        setTimeout(() => {
          this.$store.dispatch('dish/getDishInfo', { categoryID: e.categoryID })
        }, 100 * key)
      })
    }, err => {
      console.error(err)
    }).then(() => {
      this.$store.dispatch('order/getUnacceptedOrderList')
      setTimeout(() => {
        this.$store.dispatch('order/getAcceptedOrderList')
      }, 500)
      setTimeout(() => {
        this.$store.dispatch('order/getFinishedOrderList')
      }, 1000)
    })
  }
}
</script>

<style>
#homePage {
  width: 100%;
  min-height: 600px;
  margin-top: 55px !important;
  /* height: 600px; */
  /* max-height: 800px; */
}
</style>
