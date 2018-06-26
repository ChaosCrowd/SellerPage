<template>
  <div id="tableListContainer">
    <div id="tableListHead">
      <p>餐桌列表</p>
    </div>
    <div id="tableListBody">
      <div v-for="table in tableList" :key="table.tableID">
        <div class="tableCard" @click.stop="showQRCode(table)">
          <p class="tableIDText">{{ table.tableID }}号桌</p>
          <p>容量: 4</p>
          <p>状态: 空</p>
        </div>
      </div>
      <div id="qrcodeBox" v-show="qrcodeFlag">
        <QrcodeVue :value="qrcodeSetting.value"
                  :size="qrcodeSetting.size"></QrcodeVue>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'tableList',
  components: {
    QrcodeVue
  },
  data () {
    return {
      tableList: [
        { tableID: 1 },
        { tableID: 2 },
        { tableID: 3 },
        { tableID: 4 },
        { tableID: 5 },
        { tableID: 6 }
      ],
      qrcodeFlag: false,
      qrcodeSetting: {
        value: 'http://www.baidu.com',
        size: 300
      }
    }
  },
  computed: {
    // tableList ()
  },
  methods: {
    showQRCode (table) {
      this.qrcodeFlag = true
    }
  },
  mounted () {
    // eslint-disable-next-line
    // QRCode.toCanvas(this.$refs['11111'], 'http://www.baidu.com')
  }
}
</script>

<style>

#tableListContainer {
  position: relative;
  min-width: 270px;
  width: 50%;
  /* border: solid; */
  margin: 25px auto 0 auto;
}

#tableListHead {
  font-size: 14pt;
  font-weight: bold;
}

#tableListBody {
  display: flex;
  flex-wrap: wrap;
}

.tableCard {
  user-select: none;
  cursor: pointer;
  font-size: 10pt;
  width: 80px;
  height: 80px;
  margin: 5px;
  padding: 5pt 0 0 0;
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  transition: .15s all ease-in-out;
}

.tableCard:hover {
  transform: scale(1.1);
}

.tableCard:active {
  transform: scale(0.9);
}

.tableCard>p {
  margin: 0;
}

.tableIDText {
  font-size: 14pt;
}

#qrcodeBox {
  position: absolute;
  top: 50px;
  margin: 0 auto 0 auto;
}

</style>
