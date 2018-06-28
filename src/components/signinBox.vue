<template>
  <div id="signinBox">
    <b-form>
      <b-form-group id="signinUsernameGroup"
                    :description="errorMsg.usernameErrorMsg">
        <b-form-input id="signinUsernameInput"
                      type="text"
                      v-model="form.username"
                      placeholder="用户名">
        </b-form-input>
      </b-form-group>
      <b-form-group id="signinPasswordGroup"
                    :description="errorMsg.passwordErrorMsg">
        <b-form-input id="signinPasswordInput"
                      type="password"
                      v-model="form.password"
                      placeholder="密码">
        </b-form-input>
      </b-form-group>
      <b-button class="btn btn-outline-secondary"
                @click="signin"
                id="signinButton">登录</b-button>
      <b-button class="btn btn-outline-secondary"
                @click="regist"
                id="gotoRegistButton">注册</b-button>
    </b-form>
  </div>
</template>

<script>
import userAPI from '../api/userAPI'
import tool from '@/tool/tool'

export default {
  name: 'signinBox',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      errorMsg: {
        usernameErrorMsg: '',
        passwordErrorMsg: ''
      },
      label: ''
    }
  },
  methods: {
    signin (evt) {
      this.errorMsg.usernameErrorMsg = tool.isValidName(this.form.username)
      this.errorMsg.passwordErrorMsg = tool.isValidPassword(this.form.password)

      for (var index in this.errorMsg) {
        if (this.errorMsg[index] !== '') {
          alert('输入信息有误')
          return
        }
      }

      userAPI.signin(this.form,
        response => {
          if (response.status === 200) {
            window.localStorage.setItem('data', true)
            this.$router.push('/home/dishManage')
          }
        },
        err => {
          // console.log(JSON.stringify(err.response))
          if (err.response.status === 401) {
            alert('用户名不存在或密码错误')
          } else {
            alert('登录失败')
          }
        }
      )
    },
    regist (evt) {
      this.$router.push('/regist')
    }
  }
}
</script>

<style>
#signinUsernameGroup, #signinPasswordGroup {
  height: 52px;
  margin: 0 0 0 0;
}

#signinUsernameGroup small, #signinPasswordGroup small {
  text-align: left;
  color: rgb(233, 102, 102) !important;
  font-size: 8pt;
  margin: 1px 0 0 0;
  padding-left: 12px;
}

#signinUsernameInput, #signinPasswordInput {
  border-radius: 0%;
  border: none;
  background-color: #4a4b4d;
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  opacity: 0.7;
  color: white;
  margin: 0;
}

#signinUsernameInput:focus, #signinPasswordInput:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

#signinUsernameInput::-webkit-input-placeholder, #signinPasswordInput::-webkit-input-placeholder {
  color: rgb(178, 187, 212);
}

#signinButton, #gotoRegistButton {
  border-radius: 0%;
  border: none;
  padding: 4px 8px 4px 8px;
  margin: 2px 5px 0 5px;
}

</style>
