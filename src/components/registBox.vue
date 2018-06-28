<template>
    <div id="registBox">
        <b-form>
          <b-form-group ref="phoneGroup"
                        id="phoneGroup"
                        :description="errorMsg.phoneErrorMsg">
            <b-form-input id="registPhoneInput"
                          type="text"
                          placeholder="电话号码"
                          class="registInput"
                          v-model="form.phone"></b-form-input>
          </b-form-group>
          <b-form-group ref="emailGroup"
                        id="emailGroup"
                        :description="errorMsg.emailErrorMsg">
            <b-form-input id="registEmailInput"
                          type="text"
                          placeholder="邮箱"
                          class="registInput"
                          v-model="form.email"></b-form-input>
          </b-form-group>
          <b-form-group ref="usernameGroup"
                        id="usernameGroup"
                        :description="errorMsg.usernameErrorMsg">
            <b-form-input id="registUsernaemInput"
                          type="text"
                          placeholder="用户名"
                          class="registInput"
                          v-model="form.username"></b-form-input>
          </b-form-group>
          <b-form-group ref="passwordGroup"
                        id="passwordGroup"
                        :description="errorMsg.passwordErrorMsg">
            <b-form-input id="registPasswordInput"
                          type="password"
                          placeholder="密码"
                          class="registInput"
                          v-model="form.password"></b-form-input>
          </b-form-group>
          <b-form-group ref="repeatPasswordGroup"
                        id="repeatPasswordGroup"
                        :description="errorMsg.repeatPasswordErrorMsg">
            <b-form-input id="repeatPasswordInput"
                          type="password"
                          placeholder="重复密码"
                          class="registInput"
                          v-model="repeatPassword"></b-form-input>
          </b-form-group>
          <b-button id="registButton"
                    class="btn btn-outline-secondary"
                    @click="regist">注册</b-button>
        </b-form>
    </div>
</template>

<script>
import userAPI from '@/api/userAPI'
import tool from '@/tool/tool'

export default {
  name: 'registBox',
  data () {
    return {
      form: {
        phone: '',
        email: '',
        username: '',
        password: ''
      },
      repeatPassword: '',
      errorMsg: {
        phoneErrorMsg: '',
        emailErrorMsg: '',
        usernameErrorMsg: '',
        passwordErrorMsg: '',
        repeatPasswordErrorMsg: ''
      }
    }
  },
  methods: {
    regist (event) {
      // var flag = true
      this.errorMsg.phoneErrorMsg = tool.isValidPhone(this.form.phone)
      this.errorMsg.emailErrorMsg = tool.isValidEmail(this.form.email)
      this.errorMsg.usernameErrorMsg = tool.isValidName(this.form.username)
      this.errorMsg.passwordErrorMsg = tool.isValidPassword(this.form.password)
      this.errorMsg.repeatPasswordErrorMsg = (this.form.password === this.repeatPassword) ? '' : '与密码不同'

      for (var index in this.errorMsg) {
        if (this.errorMsg[index] !== '') {
          alert('输入信息有误')
          return
        }
      }

      userAPI.signup(this.form, response => {
        if (response.status === 200) {
          alert('注册成功')
          this.$router.push('/signin')
        } else {
          console.log('regist: ' + response.status)
        }
      }, err => {
        if (err.response.status === 409) {
          alert('用户名已存在')
        }
      })
    }
  }
}
</script>

<style>
#phoneGroup, #emailGroup, #usernameGroup, #passwordGroup, #repeatPasswordGroup {
  height: 52px;
  margin: 0 0 0 0;
}

#phoneGroup small, #emailGroup small, #usernameGroup small, #passwordGroup small, #repeatPasswordGroup small {
  text-align: left;
  color: rgb(233, 102, 102) !important;
  font-size: 8pt;
  margin: 1px 0 0 0;
  padding-left: 12px;
}

.registInput {
  border-radius: 0%;
  border: none;
  background-color: #4a4b4d;
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  opacity: 0.7;
  color: white;
  margin: 0;
}

.registInput:focus {
  background-color: #4a4b4d;
  color: white;
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.registInput::-webkit-input-placeholder {
  color: rgb(178, 187, 212);
}

#registButton {
  border: none;
  border-radius: 0%;

  padding: 4px 8px 4px 8px;
  margin: 2px 5px 0 80px;
}

</style>
