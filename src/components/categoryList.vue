<template>
  <div id="categoryList">
    <div id="addCategoryButtonBox">
      <div v-on:click="showAddCategoryBox"
           id="addCategoryButton"
           class="categoryCard">
        <b-img-lazy src="http://i1.bvimg.com/645609/410f489eb4657367.png"
                    width="45"
                    height="45">
        </b-img-lazy>
      </div>
      <transition name="bounce">
        <addCategoryBox v-show="addCategoryBoxFlag"
                        @closeAddCategoryBox="closeAddCategoryBox">
        </addCategoryBox>
      </transition>
    </div>
    <div v-for="categoryInfo in filteredList"
         :key="categoryInfo.categoryID"
         class="categoryCardBox">
      <transition name="fade">
        <div v-on:click="showDishList"
             :id="categoryInfo.categoryID"
             v-show="categoryFlag"
             class="categoryCard">
          <p class="categoryText">
            {{ categoryInfo.categoryName }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import addCategoryBox from '@/components/addCategoryBox'

export default {
  name: 'categoryList',
  props: ['search'],
  components: {
    addCategoryBox
  },
  data () {
    return {
      categoryFlag: true,
      addCategoryBoxFlag: false
    }
  },
  computed: {
    categoryList () {
      return this.$store.state.dish.all
    },
    filteredList () {
      return this.categoryList.filter(categoryInfo => {
        return categoryInfo.categoryName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    showDishList (event) {
      // 这里的id是<div>的id
      // var name = this.categoryList.find(e => {
      //   return e.categoryID === parseInt(event.currentTarget.id)
      // }).categoryName
      var temp = parseInt(event.currentTarget.id)
      this.$emit('selectCategory', temp, (temp === -1))
    },
    showAddCategoryBox (event) {
      this.addCategoryBoxFlag = true
      this.categoryFlag = false
    },
    closeAddCategoryBox (event) {
      this.addCategoryBoxFlag = false
      this.categoryFlag = true
    }
  }
}
</script>

<style>
/*category内容框的样式*/
#categoryList {
  position: relative;
  display: flex;
  max-width: 400px;
  min-height: 160px;
  max-height: 300px;
  flex-wrap: wrap;
  overflow-y: scroll;
  z-index: 0;
}

#categoryList::-webkit-scrollbar {
  display: none;
}

/*categoryCard的样式*/
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

.categoryText {
  margin: 0;
}

/* .categoryCardBox {
  height: 70px;
} */

/*categoryCard的动画*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/*增加category按钮的样式*/
#addCategoryButton {
  padding: 2px;
  width: 50px;
  height: 50px;
}

/* #addCategoryButtonBox {
  height: 70px;
} */

/* !!!!!!!!子组件 */
/*addCategoryBox的style*/
#addCategoryBox {
  position: absolute;
  top: 50px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 1 !important;
}

</style>
