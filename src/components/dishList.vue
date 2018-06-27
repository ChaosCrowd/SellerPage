<template>
  <div id="dishList">
    <div id="listHead">
      <b-form-input v-show="isActive"
                    autofocus
                    v-model="newName"
                    id="renameInput"></b-form-input>
      <b-button id="renameConfirm"
                class="btn btn-outline-secondary"
                v-show="isActive"
                @click="renameConfirm">确认</b-button>
      <b-button id="renameCancel"
                class="btn btn-outline-secondary"
                v-show="isActive"
                @click="closeInput">取消</b-button>
      <p ref="categoryNameText">{{ this.selectedName }}</p>
      <b-button id="renameCategoryButton"
                class="btn btn-outline-secondary"
                @click="showInput"
                v-show="!isDefaultCategory">修改类名</b-button>
      <b-button id="delCategoryButton"
                class="btn btn-outline-secondary"
                @click="delCategory"
                v-show="!isDefaultCategory">删除类别</b-button>
      <b-button id="returnButton"
                class="btn btn-outline-secondary"
                @click="close">返回</b-button>
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
      tempName: '',
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
      this.newName = this.selectedName
      this.tempName = this.selectedName
      this.selectedName = ''
    },
    closeInput (event) {
      this.isActive = false
      this.selectedName = this.tempName
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
  height: 66px;
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
  opacity: 0.7;
  width: 40%;
  font-size: 15pt;
  border: none;
  border-radius: 0%;
  padding: 0;
  margin: 0 0 0 0;
}

#listHead>#renameInput:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

#renameConfirm {
  position: absolute;
  border-radius: 0%;
  margin: 3px 0 0 0 !important;
  padding: 2px 5px 2px 5px;
  left: 155px;
}

#renameCancel {
  position: absolute;
  border-radius: 0%;
  margin: 3px 0 0 0 !important;
  padding: 2px 5px 2px 5px;
  left: 200px;
}

/* #renameConfirm, #renameCancel {
  background-color: #7f8183;
  opacity: 0.7;
} */

#renameCategoryButton {
  border-radius: 0%;
  position: absolute;
  padding: 2px 5px 2px 5px;
  top: 30px;
  left: 5px;
}

#delCategoryButton {
  border-radius: 0%;
  position: absolute;
  padding: 2px 5px 2px 5px;
  top: 30px;
  left: 80px;
}

#returnButton {
  border-radius: 0%;
  position: absolute;
  padding: 2px 5px 2px 5px;
  top: 30px;
  left: 155px;
}
/* #renameCategoryButton {
  left: 50;
}

#delCategoryButton {
  left: 100px;
}

#Button {
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
