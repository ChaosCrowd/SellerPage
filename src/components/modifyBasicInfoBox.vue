<template>
  <div id="modifyBasicInfoBoxContainer">
    <div id="modifyBasicInfoBoxHead">
      <p>店铺信息</p>
      <b-button v-show="!isActive"
                @click="startToModify"
                class="btn btn-outline-secondary modifyBasicInfoButton">修改</b-button>
      <b-button v-show="isActive"
                @click="confirmModify"
                class="btn btn-outline-secondary modifyBasicInfoButton">确认</b-button>
      <b-button v-show="isActive"
                @click="cancelModify"
                class="btn btn-outline-secondary modifyBasicInfoButton">取消</b-button>
    </div>
    <div id="modifyBasicInfoBoxBody">
      <div id="basicInfoNameBox">
        <p class="basicInfoTitle">店名:</p>
        <p id="basicInfoNameText">{{ this.form.name }}</p>
        <b-form-input v-show="isActive"
                      autofocus
                      v-model="newForm.name"
                      class="modifyBasicInfoInput"
                      id="basicInfoNameInput"></b-form-input>
      </div>
      <div id="basicInfoPhoneBox">
        <p class="basicInfoTitle">电话:</p>
        <p id="basicInfoPhoneText">{{ this.form.phone }}</p>
        <b-form-input v-show="isActive"
                      v-model="newForm.phone"
                      class="modifyBasicInfoInput"
                      id="basicInfoPhoneInput"></b-form-input>
      </div>
      <div id="basicInfoLocationBox">
        <p class="basicInfoTitle">地址:</p>
        <p id="basicInfoLocationText">{{ this.form.location }}</p>
        <b-form-input v-show="isActive"
                      v-model="newForm.location"
                      class="modifyBasicInfoInput"
                      id="basicInfoLocationInput"></b-form-input>
      </div>
      <div id="basicInfoNoticeBox">
        <p class="basicInfoTitle">公告:</p>
        <p id="basicInfoNoticeText">{{ this.form.notice }}</p>
        <b-form-textarea v-show="isActive"
                        v-model="newForm.notice"
                        :rows="5"
                        :max-rows="5"
                        class="modifyBasicInfoInput"
                        id="basicInfoNoticeInput"></b-form-textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modifyBasicInfoBox',
  data () {
    return {
      newForm: {
        name: '',
        notice: '',
        phone: '',
        location: '',
        status: 1
      },
      isActive: false
    }
  },
  computed: {
    form () {
      return {
        name: this.$store.state.store.name,
        notice: this.$store.state.store.notice,
        phone: this.$store.state.store.phone,
        location: this.$store.state.store.location,
        status: this.$store.state.store.status
      }
    }
  },
  methods: {
    startToModify (event) {
      this.isActive = true
    },

    cancelModify (event) {
      this.isActive = false
    },

    confirmModify (event) {
      // alert(JSON.stringify(this.newForm))
      this.$store.dispatch('store/modifyBasicInfo', this.newForm).then(() => {
        this.isActive = false
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.isActive = false
    this.$store.dispatch('store/getBasicInfo').then(() => {
      // alert(JSON.stringify(this.form))
      this.newForm = JSON.parse(JSON.stringify(this.form))
    }, (err) => {
      console.log(err)
    })
  }
}
</script>

<style>
#modifyBasicInfoBoxContainer {
  position: relative;
  text-align: left;
  width: 260px;
  height: 380px;
  margin: 25px auto 0 auto;
}

#modifyBasicInfoBoxHead {
  text-align: center;
  font-size: 14pt;
  font-weight: bold;
}

#modifyBasicInfoBoxHead>p {
  margin: 0 0 0 0;
}

#modifyBasicInfoBoxHead>button {
  font-size: 8pt;
}

.modifyBasicInfoButton {
  border-radius: 0%;
  border: none;
  padding: 4px 8px 4px 8px;
}

#modifyBasicInfoBoxBody {
  position: relative;
}

.basicInfoTitle {
  width: 40px;
  margin: 0;
  padding-top: 12px;
  font-weight: bold;
}

/*店名,电话,地址*/
#basicInfoNameBox, #basicInfoPhoneBox, #basicInfoLocationBox {
  position: relative;
  width: 100%;
  height: 50px;
}

#basicInfoNameText, #basicInfoPhoneText, #basicInfoLocationText {
  position: absolute;
  text-align: center;
  margin: 0;
  width: 180px;
  top: 12px;
  left: 50px;
}

#basicInfoNameInput, #basicInfoPhoneInput, #basicInfoLocationInput {
  position: absolute;
  text-align: center;
  width: 180px;
  top: 0;
  left: 50px;
}

/*公告*/
#basicInfoNoticeBox {
  position: relative;
  width: 100%;
}

#basicInfoNoticeText {
  text-align: center;
  margin: 5px 0 10px 0;
  padding: 6px 12px 6px 12px;
  font-size: 10pt;
}

#basicInfoNoticeInput {
  text-align: center;
  position: absolute;
  font-size: 10pt;
  top: 39.5px;
  left: 0;
}

.modifyBasicInfoInput {
  border-radius: 0%;
  border-color: rgba(108, 117, 125, 0.5);
}

.modifyBasicInfoInput:focus {
  border-color: rgba(108, 117, 125, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

</style>
