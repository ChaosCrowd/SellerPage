<template>
  <div id="categoryList">
    <div id="searchCategory">
      <input type="text" v-model="search" placeholder="搜索类别..."/>
    </div>
    <transition name="slide-left" mode="out-in">
      <div id="categoryContents" v-if="contentsFlag">
        <div>
          <div v-on:click="showAddCategoryBox"
              id="addCategoryButton"
              class="categoryCard">
            <b-img-lazy src="http://chuantu.biz/t6/328/1528910513x-1404764331.jpg"
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
              :key="categoryInfo.categoryID">
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
      <dishList :categoryID="selectedID"
                :search="search"
                v-else
                @closeDishList="closeDishList">
      </dishList>
    </transition>
  </div>
</template>

<script>
import dishList from '@/components/dishList'
import addCategoryBox from '@/components/addCategoryBox'

export default {
  name: 'categoryList',
  components: {
    dishList,
    addCategoryBox
  },
  data () {
    return {
      search: '',
      selectedID: -1,
      contentsFlag: true,
      categoryFlag: true,
      addCategoryBoxFlag: false,
      dishListFlag: false
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
      this.dishListFlag = true
      this.contentsFlag = false
    },
    closeDishList (event) {
      this.selectedID = -1
      this.dishListFlag = false
      this.contentsFlag = true
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
#categoryList {
  padding-left: 25px;
}

#searchCategory {
  max-width: 342px;
}

/*category内容框的样式*/
#categoryContents {
  position: relative;
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

/*category内容框的动画*/
.slide-left-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all .3s ease;
}
.slide-left-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
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

/* !!!!!!!!子组件 */
/*dishList样式*/
#dishList {
  position: absolute;
}

/*dishList动画*/
.slide-right-enter-active {
  transition: all .3s ease;
}
.slide-right-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-right-enter, .slide-right-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/*addCategoryBox的style*/
#addCategoryBox {
  position: absolute;
  top: 50px;
  left: 100px;
  overflow: hidden;
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
    top: 0;
    left: 0;
  }
  50% {
    transform: scale(1.5);
    top: 50px;
    left: 100px;
  }
  100% {
    transform: scale(1);
  }
}

</style>
