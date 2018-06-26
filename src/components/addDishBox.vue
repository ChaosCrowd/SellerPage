<template>
  <div id="addDishBox">
      <b-form>
        <h2>添加菜品</h2>
        <b-form-input id="addDishNameInput"
                      class="btn-outline-secondary"
                      type="text"
                      v-model="form.dishName"
                      placeholder="菜品名称">
        </b-form-input>
        <b-form-input id="addDishPriceInput"
                      class="btn-outline-secondary"
                      name="dishPrice"
                      type="number"
                      step="0.01"
                      v-model="form.dishPrice"
                      placeholder="菜品价格">
        </b-form-input>
        <p id="selectCategoryTitle">选择类别</p>
        <b-form-checkbox-group id="checkBox1"
                               v-model="form.categoryID"
                               :options="options">
        </b-form-checkbox-group>
        <!-- <b-form-input id="input3"
                      name="category"
                      type="text"
                      v-model="form.category"
                      placeholder="菜品类别">
        </b-form-input> -->
        <b-form-textarea id="addDishDescriptionInput"
                         name="dishDcpt"
                         class="btn-outline-secondary"
                         v-model="form.dishDescription"
                         placeholder="菜品描述"
                         :rows="4"
                         :max-rows="4">
        </b-form-textarea>
        <div id="addDishImgInputBox">
          <label for="addDishImgInput">选择图片</label>
          <input id="addDishImgInput"
                 type="file"
                 accept="image/*"
                 @change="addDishImg" />
          <canvas ref="addDishImgPreview" height="0"></canvas>
        </div>
      </b-form>
      <b-button class="btn btn-dark" @click="onSubmit">确认添加</b-button>
      <!-- <b-button variant="primary" @click="showInfo">显示</b-button> -->
  </div>
</template>

<script>
// import imageAPI from '@/api/imageAPI'

export default {
  name: 'addDishBox',
  data () {
    return {
      form: {
        dishName: '',
        dishPrice: null,
        dishImg: null,
        dishDescription: '',
        categoryID: []
      }
    }
  },
  computed: {
    options () {
      var temp = []
      // eslint-disable-next-line
      this.$store.state.dish.all.forEach((e, key) => {
        if (e.categoryID !== -1) {
          temp.push({ text: e.categoryName, value: e.categoryID })
        }
      })
      return temp
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('dish/addDish', this.form)
    },
    addDishImg (event) {
      let file = event.target.files[0]
      let reader = new FileReader()
      let img = new Image()

      // 读取图片
      reader.readAsDataURL(file)

      // 获取html元素
      let canvas = this.$refs['addDishImgPreview']
      let context = canvas.getContext('2d')

      // 读取完图片后把图片赋给img
      reader.onloadend = (e) => {
        img.src = e.target.result
        console.log(reader.result)
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

      // 压缩图片并转成base64
      // let newData = canvas.toDataURL('image/png', 1)
      // let files = []
      // files.push(newData)
      // eslint-disable-next-line
      // let tempfile = new File([newData], 'C:/Users/SGAFPZ/Desktop/ttt.txt')
      // tempfile.open('w')
      // tempfile.write(newData)
      // tempfile.close()

      // this.form.dishImg = newData
      // 发送图片
      // imageAPI.addImg(newData, response => {
      //   if (response.status === 200) {
      //     console.log(response.data.data.imgURL)
      //   } else {
      //     console.log('addImg fails!!!!!')
      //   }
      // }, err => {
      //   console.error(err)
      // })
    }
  }
}
</script>

<style>
#addDishNameInput, #addDishPriceInput, #addDishDescriptionInput {
  border-radius: 0%;
  background-color: white !important;
  border-color: #6c757d;
  color: rgb(66, 66, 66);
}

#selectCategoryTitle, #addDishImgInputBox {
  font-weight: 550;
  text-align: left;
  padding-left: 12px;
  margin: 5px 0 5px 0;
}

#addDishImgInput {
  display: none;
}

::-webkit-input-placeholder {
  text-align: left !important;
}
</style>
