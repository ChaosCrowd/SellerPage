<template>
    <div id="loginBox">
        <form action="" method="post">
            <div class="container">
                <div class="row">
                    <input class="col-3" type="text" placeholder="Username" />
                </div>
                <div class="row">
                    <input class="col-3" type="password" placeholder="Password" />
                </div>
                <div class="row">
                    <input class="col-1" type="submit" />
                    <router-link class="col-1">注册</router-link>
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
