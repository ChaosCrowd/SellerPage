<template>
  <div id="dishManagePage">
    <addDishBox></addDishBox>
    <!-- <dishList></dishList> -->
    <categoryList></categoryList>
  </div>
</template>

<script>
import addDishBox from '@/components/addDishBox'
// import dishList from '@/components/dishList'
import categoryList from '@/components/categoryList'

export default {
  name: 'dishManagePage',
  components: {
    addDishBox,
    categoryList
  }
}
</script>

<style>
#dishManagePage {
  position: relative;
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  width: 100%;
}

#addDishBox {
  margin: 10% auto 5% auto;
  width: 250px;
}

#categoryList {
  margin: 10% auto 0 auto;
  width: 400px;
}

</style>
