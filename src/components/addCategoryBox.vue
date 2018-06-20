<template>
  <div id="addCategoryBox">
    <b-form-group>
      <b-form-input id="newCategoryName"
                    v-model="categoryName"
                    required
                    placeholder="类名">
      </b-form-input>
      <b-button id="addCategoryConfirm" @click="addCategory" variant="primary">确认</b-button>
      <b-button id="addCategoryCancel" @click="cancel" variant="primary">取消</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'addCategoryBox',
  data () {
    return {
      categoryName: ''
    }
  },
  methods: {
    addCategory () {
      this.$store.dispatch('dish/addCategory', this.categoryName)
      this.$emit('closeAddCategoryBox')
    },
    cancel () {
      this.categoryName = ''
      this.$emit('closeAddCategoryBox')
    }
  }
}
</script>

<style>

#addCategoryBox {
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  padding: 2px 2px 2px 2px;
}

#addCategoryConfirm {
  width: 70px;
}

#addCategoryCancel {
  width: 70px;
}

</style>
