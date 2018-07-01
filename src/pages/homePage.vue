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
        backgroundImage: 'url(' + require('@/assets/homebgi.png') + ')',
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
      }, 600)
      setTimeout(() => {
        this.$store.dispatch('order/getAcceptedOrderList')
      }, 1000)
      setTimeout(() => {
        this.$store.dispatch('order/getFinishedOrderList')
      }, 1400)
    })
    var that = this
    var myws = new WebSocket('ws://139.199.71.21:8080/ordering/myHandler')
    myws.onmessage = function (event) {
      // var newOrder = JSON.parse(data)
      try {
        var newOrder = JSON.parse(event.data)
        if (newOrder.orderID) {
          that.$store.dispatch('order/addUnacceptedOrder', newOrder)
        }
      } catch (err) {
        console.log('websocket 接收数据解析失败')
      }
    }
    myws.onopen = function () {
      console.log('onpen')
      myws.send('{}')
    }

    myws.onclose = function () {
      console.log('onclose')
    }
  }
}
</script>

<style>
#homePage {
  width: 100%;
  min-height: 625px;
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
