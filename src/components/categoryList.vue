<template>
  <div id="categoryList">
    <div id="searchCategory">
      <input type="text" v-model="search" placeholder="搜索类别..."/>
    </div>
    <div id="categoryContents">
      <div v-for="categoryInfo in filteredList" :key="categoryInfo.categoryId">
        <div v-on:click="showDishList"
                :id="categoryInfo.categoryId" class="categoryCard">
          <p class="categoryText">
            {{ categoryInfo.categoryName }}
          </p>
        </div>
      </div>
      <div>
        <div v-on:click="addCategory"
             id="addCategoryButton" class="categoryCard">
          <b-img-lazy src="http://chuantu.biz/t6/328/1528910513x-1404764331.jpg"
                      width="45"
                      height="45">
          </b-img-lazy>
        </div>
      </div>
    </div>
    <dishList :categoryID="selectedID" v-show="show" @closeDishList="closeDishList"></dishList>
  </div>
</template>

<script>
import dishList from '@/components/dishList'
// categoryInfo = {
//   categoryID: 1,
//   categoryName: 'asdfasd'
// }

export default {
  name: 'categoryList',
  components: {
    dishList
  },
  data () {
    return {
      search: '',
      selectedID: -1,
      show: false
    }
  },
  computed: {
    categoryList () {
      return this.$store.state.category.all
    },
    filteredList () {
      return this.categoryList.filter(categoryInfo => {
        return categoryInfo.categoryName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    showDishList (event) {
      // alert(event.currentTarget.id)
      this.selectedID = event.currentTarget.categoryId
      this.show = true
    },
    closeDishList (event) {
      this.selectedID = -1
      this.show = false
    },
    addCategory (event) {
      alert('add')
    }
  }
}
</script>

<style>
#categoryList {
  padding-left: 25px;
}

#searchCategory {
  max-width: 342px;
}

.categoryText {
  margin: 0;
}

#categoryContents {
    display: flex;
    max-width: 400px;
    flex-wrap: wrap;
    height: 300px;
    overflow-y: scroll;
    margin-top: 12px;
}

#categoryContents::-webkit-scrollbar {
  display: none;
}

.categoryCard {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  font-size: 15pt;
  padding: 10px 10px 10px 10px;
  max-width: 124px;
  max-height: 124px;
  margin: 10px;
  transition: .15s all ease-in-out;
  user-select: none;
}

.categoryCard:hover {
  transform: scale(1.1);
  cursor: pointer;
}

#addCategoryButton {

}

#dishList {
  position: absolute;
}

</style>
