<template>
  <div id="listContainer">
    <div id="searchCategory">
      <b-form-input type="text" v-model="search" placeholder="搜索名称...">
      </b-form-input>
    </div>
    <transition name="slide-left" mode="out-in">
      <categoryList v-if="flag"
                    :search="search"
                    @selectCategory="selectCategory">
      </categoryList>
      <dishList v-else
                :search="search"
                :selectedCategoryID="selectedCategoryID"
                :isDefaultCategory="isDefaultCategory"
                @closeDishList="closeDishList">
      </dishList>
    </transition>
  </div>
</template>

<script>
import dishList from '@/components/dishList'
import categoryList from '@/components/categoryList'

export default {
  name: 'listContainer',
  components: {
    categoryList,
    dishList
  },
  data () {
    return {
      search: '',
      selectedCategoryID: '', // 从categoryList传过来的值只能是string,在dishList中改成int
      flag: true,
      isDefaultCategory: false
    }
  },
  methods: {
    selectCategory (selectedCategoryID, isDefaultCategory) {
      this.selectedCategoryID = selectedCategoryID
      this.isDefaultCategory = isDefaultCategory
      // alert(isDefaultCategory)
      this.flag = false
    },
    closeDishList () {
      this.flag = true
      this.selectedCategoryID = ''
    }
  }
}
</script>

<style>
#listContainer {
  padding: 0 25px 0 25px;
}

#searchCategory {
  max-width: 342px;
}

#searchCategory>input {
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  border-radius: 0%;
  border: none;
  background-color: #7f8183;
  opacity: 0.7;
  /* border-color: #6c757d; */
  color: white;
}

#searchCategory>input:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

#searchCategory>input:active {
  border: none;
}

#categoryList, #dishList {
  margin-top: 10px;
  margin-bottom: 70px;
}

/*两个List的动画*/
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

/*dishList样式*/
/* #dishList {
  position: absolute;
} */

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

</style>
