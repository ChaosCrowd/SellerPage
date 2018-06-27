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
        backgroundImage: 'url(' + require('../assets/Wallpaper1.png') + ')',
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
      setTimeout(() => {
        this.$store.dispatch('order/getUnacceptedOrderList')
      }, 500)
      setTimeout(() => {
        this.$store.dispatch('order/getAcceptedOrderList')
      }, 1000)
      setTimeout(() => {
        this.$store.dispatch('order/getFinishedOrderList')
      }, 1500)
    })
  }
}
</script>

<style>
#homePage {
  width: 100%;
  min-height: 600px;
  margin-top: 55px !important;
  /* margin-bottom: -30px !important; */
  /* height: 600px; */
  /* max-height: 800px; */
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
