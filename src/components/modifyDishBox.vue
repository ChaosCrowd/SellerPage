<template>
  <div id="modifyDishBox">
    <div id="modifyDishHead">
      <p>修改菜品信息</p>
      <button @click="confirmModify" id="modifyDishConfirm">确认修改</button>
      <button @click="cancelModify" id="modifyDishCancel">取消</button>
    </div>
    <b-form id="modifyDishForm">
      <b-img id="modifyDishImgPreview"
             :src="oldDishImg"
             width="80"
             height="80"></b-img>
      <div id="modifyDishNameGroup">
        <p>菜名:</p>
        <b-form-input id="modifyDishNameInput"
                      type="text"
                      v-model="form.dishName">
        </b-form-input>
      </div>
      <div id="modifyDishPriceGroup">
        <p>价格:</p>
        <b-form-input id="modifyDishPriceInput"
                      type="number"
                      step="0.01"
                      v-model="form.dishPrice">
        </b-form-input>
      </div>
      <div id="modifyBelongedCategoryGroup">
        <p>所属类别:</p>
        <b-form-checkbox-group v-model="form.categoryID"
                               :options="options">
        </b-form-checkbox-group>
      </div>
      <div id="modifyDishDescriptionGroup">
        <b-form-textarea v-model="form.dishDescription"
                         :rows="4"
                         :max-rows="4">
        </b-form-textarea>
      </div>
      <div id="modifyDishImgGroup">
        <label for="modifyDishImgInput">选择图片</label>
        <input type="file"
               accept="image/*"
               id="modifyDishImgInput"
               @change="modifyDishImg"/>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'modifyDishBox',
  props: ['dishID'],
  data () {
    return {
      form: {
        dishID: '',
        dishName: '',
        dishPrice: '',
        dishImg: null,
        dishDescription: '',
        categoryID: []
      },
      oldDishImg: '',
      options: []
    }
  },
  computed: {
  },
  methods: {
    confirmModify (event) {
      this.$store.dispatch('dish/modifyDish', this.form)
      this.$emit('closeSelf')
    },
    cancelModify (event) {
      this.$emit('closeSelf')
    },
    modifyDishImg (event) {
    }
  },
  mounted () {
    // 根据ID获取dishInfo
    var dishInfo = this.$store.state.dish.dishMap.get(this.dishID)
    // 预览老图片
    this.oldDishImg = dishInfo.dishImg
    // 新值=旧值
    this.form.dishID = dishInfo.dishID
    this.form.dishName = dishInfo.dishName
    this.form.dishPrice = dishInfo.dishPrice
    this.form.dishImg = null
    this.form.dishDescription = dishInfo.dishDescription
    // 类别列表
    this.$store.state.dish.all.forEach(e => {
      if (e.categoryID !== -1) {
        this.options.push({ text: e.categoryName, value: e.categoryID })
      }
    })
    // 选中当前菜品所属类别
    this.$store.state.dish.relationMap.forEach((e, key) => {
      if (e.has(dishInfo.dishID) && key !== -1) {
        this.form.categoryID.push(key)
      }
    })
  }
}
</script>

<style>
#modifyDishBox {
  position: relative;
  padding: 0 10px 0 10px;
}

/***
表头
***/
#modifyDishHead {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

#modifyDishHead>p {
  margin: 0;
  padding: 0 0 0 0px;
  font-size: 13pt;
  text-align: left;
  width: 130px;
}

#modifyDishConfirm, #modifyDishCancel {
  font-size: 10pt;
  margin-left: 10px;
}

/*****
表内容
*****/
#modifyDishForm {
  position: relative;
}

#modifyDishImgPreview {
  position: absolute;
  top: 0;
  right: 30px;
}

#modifyDishNameGroup, #modifyDishPriceGroup{
  /* display: inline; */
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  font-size: 10pt;
  width: 60%;
}

#modifyDishNameInput, #modifyDishPriceInput{
  font-size: 10pt;
  width: 70%;
  padding: 4px 6px 4px 6px;
}

#modifyDishNameGroup>p, #modifyDishPriceGroup>p{
  width: 40px;
  margin: 0;
  padding: 10px 0 0 0;
}

#modifyBelongedCategoryGroup>p, #modifyDishDescriptionGroup>p {
  text-align: left;
  margin: 5px 0 5px 0;
}

#modifyDishImgInput {
  opacity: 0;
}

</style>
