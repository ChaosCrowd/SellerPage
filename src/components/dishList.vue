<template>
  <div id="dishList">
    <div id="search">
      <input type="text" v-model="search" placeholder="根据菜名搜索.."/>
    </div>
    <ul class="list-unstyled" id="wrapper">
      <div v-for="dishInfo in filteredList" :key="dishInfo.id">
        <b-media id="dishInfo" tag="li">
          <b-img id="dishPic" slot="aside" :src="dishInfo.picPath" width="80" height="80" :alt="dishInfo.dishName" />
          <div id="dishName">
            {{ dishInfo.dishName }}
          </div>
          <div id="dishDcpt">
            {{ dishInfo.dishDcpt }}
          </div>
          <div id="dishPrice">
            {{ dishInfo.dishPrice }}￥
          </div>
        </b-media>
        <hr id="divider">
      </div>
    </ul>
  </div>
</template>

<script>
class DishInfo {
  constructor (dishId, dishName, dishPrice, picPath, dishDcpt) {
    this.dishId = dishId
    this.dishName = dishName
    this.dishPrice = dishPrice
    this.picPath = picPath
    this.dishDcpt = dishDcpt
  }
}
export default {
  name: 'dishList',
  data () {
    return {
      search: '',
      dishList: [
        new DishInfo(
          0,
          '番茄炒蛋',
          '998',
          require('../assets/1.jpg'),
          '西红柿炒鸡蛋，又名番茄炒蛋，是许多百姓家庭中一道普通的大众菜肴。烹饪方法简单易学，营养搭配合理。'
        ),
        new DishInfo(
          1,
          '西红柿炒蛋',
          '998',
          require('../assets/1.jpg'),
          '西红柿炒鸡蛋，又名番茄炒蛋，是许多百姓家庭中一道普通的大众菜肴。烹饪方法简单易学，营养搭配合理。'
        )
      ]
    }
  },
  computed: {
    filteredList () {
      return this.dishList.filter(dishInfo => {
        return dishInfo.dishName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style>
#search {
  margin: 0 auto 0 auto;
}

#wrapper {
  margin-top: 30px;
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
  left: 50%;
  font-size: 10pt;
  text-align: justify;
}

#divider {
  width: 80%;
  margin: 5px auto 5px auto;
  color: black;
}
</style>
