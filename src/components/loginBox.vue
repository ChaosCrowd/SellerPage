<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
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
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'loginBox',
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
    onSubmit (evt) {
      evt.preventDefault()
      this.$http.post('signin', this.form).then(response => {
        if (response.status === 200) {
          this.$router.push('/home/dishManage')
        } else if (response.status === 403) {
          this.label = '登录失败'
        }
      }, response => {
        alert(JSON.stringify(response))
      })
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style>
input {
    margin:5px 0;
}

</style>
