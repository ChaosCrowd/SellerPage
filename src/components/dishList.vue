<template>
  <div id="dishList">
    <div id="listHead">
      <b-form-input v-show="isActive"
                    autofocus
                    v-model="newName"
                    id="renameInput"></b-form-input>
      <button id="renameConfirm"
              v-show="isActive"
              @click="renameConfirm">确认</button>
      <button id="renameCancel"
              v-show="isActive"
              @click="closeInput">取消</button>
      <p>{{ this.selectedName }}</p>
      <button id="renameCategoryButton"
              @click="showInput"
              v-show="!isDefaultCategory">修改类名</button>
      <button id="delCategoryButton"
              @click="delCategory"
              v-show="!isDefaultCategory">删除类别</button>
      <button id="return"
              @click="close">返回</button>
    </div>
    <transition name="slide-left" mode="out-in">
      <ul class="list-unstyled scrollbar-info" id="dishContents" v-if="!modifyDishFlag">
        <div v-for="dishInfo in filteredList" :key="dishInfo.dishID">
          <dishCell :dishInfo="dishInfo"
                    :categoryID="selectedCategoryID"
                    :isDefaultCategory="isDefaultCategory"
                    @modifyDish="showModifyDishBox"></dishCell>
          <hr id="divider">
        </div>
      </ul>
      <modifyDishBox v-else
                     :dishID="selectedDishID"
                     @closeSelf="closeModifyDishBox"></modifyDishBox>
    </transition>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import dishCell from '@/components/dishCell'
import modifyDishBox from '@/components/modifyDishBox'

export default {
  name: 'dishList',
  props: ['selectedCategoryID', 'search', 'isDefaultCategory'],
  components: {
    dishCell,
    modifyDishBox
  },
  data () {
    return {
      isActive: false,
      newName: '',
      selectedName: '',
      selectedDishID: 1,
      modifyDishFlag: false
    }
  },
  computed: {
    dishList () {
      // eslint-disable-next-line
      this.$store.state.dish.relationMapChange
      // eslint-disable-next-line
      this.$store.state.dish.dishMapChange
      var temp = []
      if (this.$store.state.dish.relationMap.has(this.selectedCategoryID)) {
        this.$store.state.dish.relationMap.get(this.selectedCategoryID).forEach(e => {
          temp.push(this.$store.state.dish.dishMap.get(e))
        })
      }
      return temp
    },
    filteredList () {
      return this.dishList.filter(dishInfo => {
        return dishInfo.dishName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    close (event) {
      this.$emit('closeDishList')
    },
    showInput (event) {
      this.isActive = true
    },
    closeInput (event) {
      this.isActive = false
    },
    renameConfirm (event) {
      if (this.newName === '') return
      this.$store.dispatch('dish/renameCategory', {
        categoryID: this.selectedCategoryID,
        categoryName: this.newName
      }).then(() => {
        this.isActive = false
        this.selectedName = this.newName
      }, err => {
        console.log(err)
      })
    },
    delCategory (event) {
      this.close()
      this.$store.dispatch('dish/delCategory', { categoryID: this.selectedCategoryID })
    },
    delDishFromCategory (event) {

    },
    showModifyDishBox (dishID) {
      this.selectedDishID = dishID
      this.modifyDishFlag = true
    },
    closeModifyDishBox () {
      this.modifyDishFlag = false
    }
  },
  mounted () {
    this.selectedName = this.$store.state.dish.all.find(e => {
      return e.categoryID === this.selectedCategoryID
    }).categoryName
    this.newName = this.selectedName
  }
}
</script>

<style>
#listHead {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-left: 5px;
  font-size: 15pt;
  font: bolder;
  text-align: left;
}

#listHead>p {
  margin: 0;
  width: 100%;
}

#listHead>button {
  font-size: 10pt !important;
  margin: 5px 10px 5px 0;
}

/*
rename部分
*/
#listHead>#renameInput {
  position: absolute;
  background-color: white;
  width: 40%;
  font-size: 15pt;
  padding: 0;
  margin: 0 0 0 0;
}

#renameConfirm {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 45%;
}

#renameCancel {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 55%;
}

/* #renameCategoryButton {
  left: 50;
}

#delCategoryButton {
  left: 100px;
}

#return {
  left: 200px;
}*/

#dishContents {
  margin-top: 0;
  height: 300px;
  width: 100%;
  overflow-y: scroll;
}

#dishContents::-webkit-scrollbar {
  display: none;
}

#divider {
  width: 80%;
  margin: 8px auto 8px auto;
  color: black;
}

/* .scrollbar-info::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-info::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-info::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #33b5e5;
} */
</style>
