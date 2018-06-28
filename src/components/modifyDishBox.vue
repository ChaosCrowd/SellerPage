<template>
  <div id="modifyDishBox">
    <div id="modifyDishHead">
      <p>修改菜品信息</p>
      <b-button class="btn btn-outline-secondary"
                @click="confirmModify"
                id="modifyDishConfirm">确认修改</b-button>
      <b-button class="btn btn-outline-secondary"
                @click="cancelModify"
                id="modifyDishCancel">取消</b-button>
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
        <label id="modifyDishNameErrorLabel"
               ref="modifyDishNameErrorLabel"></label>
      </div>
      <div id="modifyDishPriceGroup">
        <p>价格:</p>
        <b-form-input id="modifyDishPriceInput"
                      type="number"
                      step="0.01"
                      v-model="form.dishPrice">
        </b-form-input>
        <label id="modifyDishPriceErrorLabel"
               ref="modifyDishPriceErrorLabel"></label>
      </div>
      <div id="modifyBelongedCategoryGroup">
        <p>所属类别:</p>
        <b-form-checkbox-group id="modifyBelongedCategoryBox"
                                v-model="form.categoryID"
                               buttons
                               button-variant="outline-secondary"
                               :options="options">
        </b-form-checkbox-group>
      </div>
      <div id="modifyDishDescriptionGroup">
        <b-form-textarea id="modifyDishDescriptionInput"
                         v-model="form.dishDescription"
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
        <p ref="modifyDishImgPath"></p>
        <canvas ref="modifyDishImgPreview" height="0" width="0"></canvas>
      </div>
    </b-form>
  </div>
</template>

<script>
import tool from '@/tool/tool'

export default {
  name: 'modifyDishBox',
  props: ['dishID'],
  data () {
    return {
      form: {
        dishID: '',
        dishName: '',
        dishPrice: '',
        dishImg: '',
        dishDescription: '',
        categoryID: []
      },
      oldDishImg: '',
      options: [],
      errorMsg: {
        dishNameErrorMsg: '',
        dishPriceErrorMsg: ''
      }
    }
  },
  computed: {
  },
  methods: {
    confirmModify (event) {
      this.errorMsg.dishNameErrorMsg = tool.isValidDishName(this.form.dishName)
      this.errorMsg.dishPriceErrorMsg = tool.isValidPrice(this.form.dishPrice)

      this.$refs['modifyDishNameErrorLabel'].innerText = this.errorMsg.dishNameErrorMsg
      this.$refs['modifyDishPriceErrorLabel'].innerText = this.errorMsg.dishPriceErrorMsg

      for (var index in this.errorMsg) {
        if (this.errorMsg[index] !== '') {
          alert('输入信息有误')
          return
        }
      }

      this.$store.dispatch('dish/modifyDish', this.form).then(dishName => {
        alert(dishName + ' 修改成功')
        this.$emit('closeSelf')
      }, errorMsg => {
        console.log(errorMsg)
      })
    },
    cancelModify (event) {
      this.$emit('closeSelf')
    },
    modifyDishImg (event) {
      let file = event.target.files[0]
      let reader = new FileReader()
      let img = new Image()

      this.$refs['modifyDishImgPath'].innerText = file.name

      reader.readAsDataURL(file)

      // 获取html元素
      let canvas = this.$refs['modifyDishImgPreview']
      let context = canvas.getContext('2d')

      // 读取完图片后把图片赋给img
      reader.onloadend = (e) => {
        img.src = e.target.result
        // console.log(reader.result)
        this.form.dishImg = reader.result
      }

      // 设置图片大小并把图画到canvas
      img.onload = () => {
        img.width = 100
        img.height = 100
        // 设置canvas大小
        canvas.width = 100
        canvas.height = 100
        // 清空canvas
        context.clearRect(0, 0, 100, 100)
        // 画图
        context.drawImage(img, 0, 0, 100, 100)
      }
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
    this.form.dishImg = ''
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
  border-radius: 0%;
  padding: 2px 5px 2px 5px;
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

#modifyDishNameInput, #modifyDishPriceInput, #modifyDishDescriptionInput {
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  border-radius: 0%;
  border: none;
  background-color: #7f8183;
  opacity: 0.7;
  /* border-color: #6c757d; */
  color: white;
}

#modifyDishNameInput:focus, #modifyDishPriceInput:focus, #modifyDishDescriptionInput:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

#modifyDishNameGroup, #modifyDishPriceGroup{
  position: relative;
  /* display: inline; */
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  font-size: 10pt;
  width: 60%;
  margin: 0 0 20px 0;
}

#modifyDishNameInput, #modifyDishPriceInput{
  font-size: 10pt;
  width: 70%;
  padding: 4px 6px 4px 6px;
  margin: 0;
}

#modifyDishNameGroup>p, #modifyDishPriceGroup>p{
  width: 40px;
  margin: 0;
  padding: 4px 0 0 0;
}

#modifyBelongedCategoryGroup {
  margin: 0 0 10px 0;
}

#modifyBelongedCategoryGroup>p, #modifyDishDescriptionGroup>p {
  text-align: left;
  margin: 5px 0 5px 0;
}

#modifyDishNameErrorLabel, #modifyDishPriceErrorLabel {
  position: absolute;
  top: 27px;
  left: 45px;
  color: rgb(233, 102, 102);
  font-size: 8pt;
}

#modifyDishImgInput {
  opacity: 0;
}

#modifyBelongedCategoryBox {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0 0 0;
}

#modifyBelongedCategoryBox>label {
  /* background-color: #7f8183; */
  /* box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px; */
  border: none;
  font-size: 9pt;
  font-weight: 550;
  border-radius: 0%;
  margin: 5px;
  padding: 4px 8px 4px 8px;
}

/*修改图片框的样式*/
#modifyDishImgGroup {
  position: relative;
  font-weight: 550;
  text-align: center;
  margin: 5px 0 5px 0;
}

#modifyDishImgInput {
  display: none;
}

#modifyDishImgGroup>label {
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  width: 80px;
  padding: 2px 5px 2px 5px;
  margin: 5px 85px 5px 85px;
  background-color: #7f8183;
  color: white;
  opacity: 0.7;
  transition: .15s all ease-in-out;
}

#modifyDishImgGroup>label:hover {
  cursor: pointer;
  transform: scale(1.1);
  background-color: #4f5052;
}

#modifyDishImgGroup>label:active {
  transform: scale(0.95);
}

</style>
