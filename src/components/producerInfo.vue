<template>
  <div id="producerInfo">
    <div id="producerInfoContainer">
      <div id="infoTitle">
        联系方式
      </div>
      <div id="ourPhone">
        电话: 15050350330
      </div>
      <div id="ourEmail">
        邮箱: 12345678910@gmail.com
      </div>
      <a id="ourWebsite" href="https://github.com/ChaosCrowd/">
        项目网址
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'producerInfo'
}
</script>

<style>

#infoTitle {
  width: 100%;
}

#producerInfoContainer {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  min-width: 200px;
  margin: 0 auto 0 auto;
}

#ourPhone {
  margin: 0 0 0 5%;
}

#ourEmail {
  margin: 0 0 0 5%;
}

#ourWebsite {
  margin: 0 0 0 5%;
}

</style>
