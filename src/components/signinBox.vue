<template>
  <div>
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
      <b-button class="btn btn-outline-secondary" @click="signin">登录</b-button>
      <b-button class="btn btn-outline-secondary" @click="regist">注册</b-button>
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
            this.$router.push('/home/dishManage')
          } else if (response.status === 403) {
            this.label = '登录失败'
          }
        },
        response => {
          alert(JSON.stringify(response))
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
input {
    margin:5px 0;
}

</style>
