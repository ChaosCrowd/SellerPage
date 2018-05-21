<template>
  <div id="dishList">
    <div id="search">
      <input type="text" v-model="search" placeholder="根据菜名搜索.."/>
    </div>
    <ul class="list-unstyled scrollbar-info" id="wrapper">
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
        ),
        new DishInfo(
          1,
          '西红柿炒蛋',
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
        ),
        new DishInfo(
          1,
          '西红柿炒蛋',
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
#dishList {
  width: 50%;
}

#search {
  margin: 0 auto 0 auto;
}

#wrapper {
  margin-top: 30px;
  height: 300px;
  width: 100%;
  overflow-y: scroll;
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
  padding-right: 5px;
  font-size: 10pt;
  text-align: justify;
}

#divider {
  width: 80%;
  margin: 8px auto 8px auto;
  color: black;
}

.scrollbar-info::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px; }

.scrollbar-info::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5; }

.scrollbar-info::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #33b5e5; }
</style>
