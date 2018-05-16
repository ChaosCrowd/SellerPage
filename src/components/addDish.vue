<template>
  <div>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-input id="input1"
                      name="dishName"
                      type="text"
                      v-model="form.dishName">
        <b-form-textarea id="textarea1"
                         name="dishDcpt"
                         placeholder="菜品描述"
                         :rows="4"
                         :max-rows="4">
        </b-form-textarea>
      </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>