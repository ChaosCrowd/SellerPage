<template>
  <div id="addCategoryBox">
    <b-form-group id="addCategoryGroup"
                  label="请勿输入重复的类名"
                  :description="addCategoryErrorMsg">
      <b-form-input id="addCategoryInput"
                    v-model="categoryName"
                    placeholder="类名">
      </b-form-input>
    </b-form-group>
    <b-button id="addCategoryConfirm"
              @click="addCategory"
              class="btn btn-outline-secondary">确认</b-button>
    <b-button id="addCategoryCancel"
              @click="cancel"
              class="btn btn-outline-secondary">取消</b-button>
  </div>
</template>

<script>
export default {
  name: 'addCategoryBox',
  data () {
    return {
      categoryName: '',
      addCategoryErrorMsg: ''
    }
  },
  methods: {
    addCategory () {
      if (this.categoryName === '') {
        this.addCategoryErrorMsg = '类名不能为空'
        return
      }
      for (var i = 0; i < this.$store.state.dish.all.length; i++) {
        if (this.$store.state.dish.all[i].categoryName === this.categoryName) {
          this.addCategoryErrorMsg = '类名不能重复'
          return
        }
      }
      this.$store.dispatch('dish/addCategory', this.categoryName)
      this.addCategoryErrorMsg = ''
      this.$emit('closeAddCategoryBox')
    },
    cancel () {
      this.categoryName = ''
      this.addCategoryErrorMsg = ''
      this.$emit('closeAddCategoryBox')
    }
  }
}
</script>

<style>

#addCategoryBox {
  width: 180px;
  padding: 10px 15px 10px 15px;
  background-color: #4a4b4d;
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  opacity: 0.8;
}

#addCategoryBox>fieldset {
  margin: 0;
}

#addCategoryGroup {
  text-align: left;
  margin: 0;
}

#addCategoryInput {
  border: none;
  border-radius: 0%;
  color: #2a2a2b;
  border: none;
  border-radius: 0%;
  color: #2a2a2b;
  box-shadow: none;
}

#addCategoryInput::-webkit-input-placeholder {
  color: #484849 !important;
}

#addCategoryGroup>legend {
  padding: 0;
  font-size: 9pt;
  font-weight: bold;
  color: white;
}

#addCategoryGroup small {
  color: rgb(233, 102, 102) !important;
  font-size: 9pt;
  margin: 4px 0 4px 0;
}

#addCategoryConfirm, #addCategoryCancel {
  border-radius: 0%;
  border: none;
  color: white;
  padding: 2px 5px 2px 5px;
  margin: 0 10px 0 10px;
}

</style>
