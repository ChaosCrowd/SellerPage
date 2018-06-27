<template>
  <div id="signinBox">
    <b-form>
      <b-form-group id="usernameGroup"
                    :label="label"
                    label-for="usernameInput">
        <b-form-input id="usernameInput"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="用户名">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordGroup">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      required
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

export default {
  name: 'signinBox',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      label: ''
    }
  },
  methods: {
    signin (evt) {
      evt.preventDefault()
      userAPI.signin(this.form,
        response => {
          if (response.status === 200) {
            window.localStorage.setItem('data', true)
            this.$router.push('/home/dishManage')
          } else if (response.status === 403) {
            this.label = '登录失败'
          }
        },
        err => {
          console.error(err)
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
#usernameInput, #passwordInput {
  border-radius: 0%;
  border: none;
  background-color: #4a4b4d;
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  opacity: 0.7;
  color: white;
}

#usernameInput:focus, #passwordInput:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

#usernameInput::-webkit-input-placeholder, #passwordInput::-webkit-input-placeholder {
  color: rgb(178, 187, 212);
}

#signinButton, #gotoRegistButton {
  border-radius: 0%;
  border: none;
  padding: 4px 8px 4px 8px;
  margin: 0 5px 0 5px;
}

</style>
