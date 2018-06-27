<template>
    <div id="registBox">
        <b-form>
          <b-form-group id="phoneGroup">
            <b-form-input id="registPhoneInput"
                          type="text"
                          placeholder="电话号码"
                          class="registInput"
                          v-model="form.phone"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input id="registEmailInput"
                          type="text"
                          placeholder="邮箱"
                          class="registInput"
                          v-model="form.email"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input id="registUsernaemInput"
                          type="text"
                          placeholder="用户名"
                          class="registInput"
                          v-model="form.username"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input id="registPasswordInput"
                          type="password"
                          placeholder="密码"
                          class="registInput"
                          v-model="form.password"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input id="repeatPasswordInput"
                          type="password"
                          placeholder="重复密码"
                          class="registInput"></b-form-input>
          </b-form-group>
          <b-button id="registButton"
                    class="btn btn-outline-secondary"
                    @click="regist">注册</b-button>
        </b-form>
    </div>
</template>

<script>
import userAPI from '@/api/userAPI'

export default {
  name: 'registBox',
  data () {
    return {
      form: {
        phone: '',
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    regist (event) {
      userAPI.signup(this.form, response => {
        if (response.status === 200) {
          alert('注册成功')
          this.$router.push('/signin')
        } else {
          console.log('regist: ' + response.status)
        }
      }, err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

.registInput {
  border-radius: 0%;
  border: none;
  background-color: #4a4b4d;
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  opacity: 0.7;
  color: white;
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
  margin: 0 5px 0 80px;
}

</style>
