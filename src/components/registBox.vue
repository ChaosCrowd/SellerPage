<template>
    <div>
        <form action="" method="post">
            <div class="container">
                <div class="row">
                    <b-form-group
                        id="phoneGroup"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                    >
                      <b-form-input id="phoneInput" :state="state" placeholder="电话号码" v-model.trim="name"></b-form-input>
                    </b-form-group>
                </div>
                <div class="row">
                    <input class="col" type="text" placeholder="Email" />
                </div>
                <div class="row">
                    <input class="col" type="text" placeholder="Username" />
                </div>
                <div class="row">
                    <input class="col" type="password" placeholder="Password" />
                </div>
                <div class="row">
                    <input class="col" type="submit" value="注册"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'loginBox'
}
</script>

<style>
input {
    margin:5px 0;
}

</style>
