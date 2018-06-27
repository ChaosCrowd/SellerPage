<template>
  <b-media id="dishInfo" tag="li">
    <b-img id="dishPic" slot="aside" :src="dishInfo.dishImg" width="80" height="80" :alt="dishInfo.dishName" />
    <div id="dishName">
      {{ dishInfo.dishName }}
    </div>
    <div id="dishDcpt">
      {{ dishInfo.dishDescription }}
    </div>
    <div id="dishPrice">
      ￥{{ dishInfo.dishPrice }}
    </div>
    <div id="buttonContainer">
      <div id="modifyDish"
              @click="modifyDish">修改信息</div>
      <div id="delDish1"
              @click="delDishFromCategory"
              v-show="!isDefaultCategory">从该类别中删除</div>
      <div id="delDish2"
              @click="delDish">完全删除</div>
    </div>
  </b-media>
</template>

<script>
export default {
  name: 'dishCell',
  props: ['dishInfo', 'categoryID', 'isDefaultCategory'],
  data () {
    return {
    }
  },
  methods: {
    modifyDish () {
      this.$emit('modifyDish', this.dishInfo.dishID)
    },
    delDishFromCategory () {
      var temp = []
      this.$store.state.dish.relationMap.forEach((e, key) => {
        // 从该类别删除,key不能等于-1,不能等于该类别
        if (e.has(this.dishInfo.dishID) && key !== this.categoryID && key !== -1) {
          temp.push(key)
        }
      })
      this.$store.dispatch('dish/modifyDish', {
        dishID: this.dishInfo.dishID,
        dishName: this.dishInfo.dishName,
        dishPrice: this.dishInfo.dishPrice,
        dishImg: null,
        dishDescription: this.dishInfo.dishDescription,
        categoryID: temp
      })
    },
    delDish (event) {
      this.$store.dispatch('dish/delDish', {
        dishID: this.dishInfo.dishID
      })
    }
  }
}
</script>

<style>
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
  padding: 0 25px 0 5px;
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

#modifyDish, #delDish1, #delDish2 {
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  background-color: #7f8183;
  opacity: 0.7;
  color: white;
  padding: 2px 5px 2px 5px;
  transition: .15s all ease-in-out;
}

#delDish1 {
  margin-left: 10px;
}

#delDish2 {
  margin-left: 10px;
}

#modifyDish:hover, #delDish1:hover, #delDish2:hover {
  cursor: pointer;
  transform: scale(1.1);
  background-color: #4f5052;
}

#modifyDish:active, #delDish1:active, #delDish2:active {
  transform: scale(0.95);
}

</style>
