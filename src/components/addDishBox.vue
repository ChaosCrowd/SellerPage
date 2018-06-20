<template>
  <div id="addDishBox">
      <b-form>
        <h2>添加菜品</h2>
        <b-form-input id="input1"
                      name="dishName"
                      type="text"
                      v-model="form.dishName"
                      placeholder="菜品名称">
        </b-form-input>
        <b-form-input id="input2"
                      name="dishPrice"
                      type="number"
                      v-model="form.dishPrice"
                      placeholder="菜品价格">
        </b-form-input>
        <p id="selectCategory">选择类别</p>
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
        <b-form-textarea id="textarea1"
                         name="dishDcpt"
                         v-model="form.dishDescription"
                         placeholder="菜品描述"
                         :rows="4"
                         :max-rows="4">
        </b-form-textarea>
        <b-form-file accept="image/*"
                     v-model="form.dishImg"
                     :state="Boolean(form.dishImg)"
                     text="选择图片"
                     plain>
        </b-form-file>
      </b-form>
      <b-button variant="primary" @click="onSubmit">确认添加</b-button>
      <!-- <b-button variant="primary" @click="showInfo">显示</b-button> -->
  </div>
</template>

<script>
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
      this.$store.state.dish.all.forEach(e => {
        temp.push({ text: e.categoryName, value: e.categoryID })
      })
      return temp
    }
  },
  methods: {
    showInfo () {
      alert(JSON.stringify(this.$store.state.dish.dishMap))
    },
    onSubmit () {
      this.$store.dispatch('dish/addDish', this.form)
    }
  }
}
</script>

<style>
#selectCategory {
  text-align: left;
  padding-left: 12px;
}

b-form-file.placeholder {
  text-align: left !important;
}

::-webkit-input-placeholder {
  text-align: left !important;
}
</style>
