<template>
  <div id="categoryList">
    <div id="searchCategory">
      <input type="text" v-model="search" placeholder="根据菜名搜索.."/>
    </div>
    <div id="categoryContents">
      <div v-for="categoryInfo in filteredList" :key="categoryInfo.categoryId">
        <b-card :title="categoryInfo.categoryName"
                v-on:click="showDishList"
                :id="categoryInfo.categoryId">
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'categoryList',
  data () {
    return {
      search: ''
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
      alert(JSON.stringify(this.$store.state.category.all))
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

.card {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  max-width: 124px;
  margin: 12px;
  transition: .15s all ease-in-out;
  user-select: none;
}

.card:hover {
  transform: scale(1.1);
  cursor: pointer;
}

</style>
