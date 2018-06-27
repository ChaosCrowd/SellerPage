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
  },
  data () {
    return {
    }
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
  background-image: url();
}

#addDishBox {
  margin: 5% auto 5% auto;
  padding: 0 25px 0 25px;
  width: 300px;
}

#listContainer {
  margin: 5% auto 0 auto;
  width: 400px;
}

</style>
