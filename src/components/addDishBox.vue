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
        <b-form-textarea id="textarea1"
                         name="dishDcpt"
                         v-model="form.dishDcpt"
                         placeholder="菜品描述"
                         :rows="4"
                         :max-rows="4">
        </b-form-textarea>
      </b-form>
  </div>
</template>

<script>
export default {
  name: 'addDishBox',
  data () {
    return {
      form: {
        dishName: '',
        dishPrice: '',
        dishDcpt: ''
      }
    }
  }
}
</script>

<style>

</style>
