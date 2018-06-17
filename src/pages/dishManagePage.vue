<template>
  <div id="dishManagePage">
    <addDishBox></addDishBox>
    <!-- <dishList></dishList> -->
    <listContainer></listContainer>
  </div>
</template>

<script>
import addDishBox from '@/components/addDishBox'
// import dishList from '@/components/dishList'
import listContainer from '@/components/listContainer'

export default {
  name: 'dishManagePage',
  components: {
    addDishBox,
    listContainer
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

#listContainer {
  margin: 10% auto 0 auto;
  width: 400px;
}

</style>
