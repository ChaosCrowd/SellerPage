<template>
  <div id="dishList">
    <div id="listHead">
      <p>{{ this.selectedName }}</p>
      <button id="renameCategoryButton" @click="close">修改类名</button>
      <button id="delCategoryButton" @click="close">删除类别</button>
      <button id="return" @click="close">返回</button>
    </div>
    <ul class="list-unstyled scrollbar-info" id="dishContents">
      <div v-for="dishInfo in filteredList" :key="dishInfo.dishID">
        <b-media id="dishInfo" tag="li">
          <b-img id="dishPic" slot="aside" :src="dishInfo.dishImg" width="80" height="80" :alt="dishInfo.dishName" />
          <div id="dishName">
            {{ dishInfo.dishName }}
          </div>
          <div id="dishDcpt">
            {{ dishInfo.dishDescription }}
          </div>
          <div id="dishPrice">
            {{ dishInfo.dishPrice }}￥
          </div>
          <div id="buttonContainer">
            <button id="modifyDish">修改信息</button>
            <button id="delDish1">从该类别中删除</button>
            <button id="delDish2">完全删除</button>
          </div>
        </b-media>
        <hr id="divider">
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'dishList',
  props: ['selectedName', 'selectedID', 'search'],
  data () {
    return {
    }
  },
  computed: {
    dishList () {
      var temp = []
      // eslint-disable-next-linea
      if (this.$store.state.dish.relationMap.has(parseInt(this.selectedID))) {
        this.$store.state.dish.relationMap.get(parseInt(this.selectedID)).forEach(e => {
          temp.push(this.$store.state.dish.dishMap.get(e))
        })
      }
      return temp
    },
    filteredList () {
      return this.dishList.filter(dishInfo => {
        return dishInfo.dishName.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    ...mapState({
      categoryList: state => state.category.all
    })
  },
  methods: {
    close (event) {
      this.$emit('closeDishList')
    }
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

#dishInfo {
  position: relative;
  height: 80px;
  width: 100%;
}

#dishPic {
  width: 80px;
  height: 80px;
  margin: 0 0 0 0;
}

#dishName {
  position: absolute;
  width: auto;
  top: 5px;
  font-size: 10pt;
  font-weight: bold;
}

#dishPrice {
  position: absolute;
  width: auto;
  top: 30px;
  font-size: 10pt;
}

#dishDcpt {
  position: absolute;
  width: 50%;
  height: 50px;
  left: 50%;
  padding-right: 25px;
  font-size: 10pt;
  text-align: justify;
  overflow: hidden !important;
}

#buttonContainer {
  position: absolute;
  top: 60px;
  display: flex;
  flex-wrap: wrap;
  font-size: 7pt;
}

/* .dishManageButton {
  position: absolute;
  font-size: 5pt;
} */

#modifyDish {
}

#delDish1 {
  margin-left: 10px;
}

#delDish2 {
  margin-left: 10px;
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
