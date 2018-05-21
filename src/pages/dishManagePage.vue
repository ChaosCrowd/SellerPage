<template>
  <div id="dishManagePage">
    <addDishBox></addDishBox>
    <dishList></dishList>
  </div>
</template>

<script>
import addDishBox from '@/components/addDishBox'
import dishList from '@/components/dishList'

export default {
  name: 'dishManagePage',
  components: {
    addDishBox,
    dishList
  }
}
</script>

<style>
#dishManagePage {
  position: absolute;
  width: 100%;
}

#addDishBox {
  position: relative;
  margin: 100px 0 0 100px;
  width: 25%;
}

#dishList {
  position: relative;
  left: 45%;
  top: -250px;
}
</style>
