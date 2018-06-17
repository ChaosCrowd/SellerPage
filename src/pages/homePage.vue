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
    this.$store.dispatch('category/getCategoryInfo').then(() => {
      this.$store.state.category.all.forEach(e => {
        this.$store.dispatch('dish/getDishInfo', { categoryID: e.categoryID, dishID: 0 })
      })
    }, err => {
      console.error(err)
    })
  }
}
</script>

<style>

</style>
