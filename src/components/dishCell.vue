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
      <button id="modifyDish">修改信息</button>
      <button id="delDish1" @click="delDishFromCategory">从该类别中删除</button>
      <button id="delDish2">完全删除</button>
    </div>
  </b-media>
</template>

<script>
export default {
  name: 'dishCell',
  props: ['dishInfo', 'categoryID'],
  data () {
    return {
    }
  },
  methods: {
    delDishFromCategory () {
      var temp = []
      this.$store.state.dish.relationMap.forEach((e, key) => {
        if (e.has(this.dishInfo.dishID) && key !== this.categoryID) {
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

</style>
