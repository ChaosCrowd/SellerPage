<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="secondary" class="fixed-top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/signin">码上点餐</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/home/dishManage">管理菜品</b-nav-item>
          <b-nav-item to="/home/orderManage">管理订单</b-nav-item>
          <b-nav-item to="/home/storeManage">管理店铺</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown text="主题" right>
            <b-dropdown-item href="#">黑</b-dropdown-item>
            <b-dropdown-item href="#">白</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="用户" right>
            <!-- Using button-content slot -->
            <!-- <template slot="button-content">
              <em>用户</em>
            </template> -->
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navBar'
}
</script>

<style>
input {
    margin:5px 0;
}

nav {
  background-color: #9A9C9D !important;
}
</style>
