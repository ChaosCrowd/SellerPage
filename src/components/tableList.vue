<template>
  <div id="tableListContainer">
    <div id="tableListHead">
      <p>餐桌列表</p>
    </div>
    <div id="tableListBody">
      <div v-for="table in tableList" :key="table.tableID">
        <transition name="fade">
          <div class="tableCard" @click.stop="showQRCode(table)" v-show="tableFlag">
            <p class="tableIDText">{{ table.tableID }}号桌</p>
            <p>容量: 4</p>
            <p>状态: 空</p>
          </div>
        </transition>
      </div>
      <div class="addTableCard" @click.stop="showAddTableBox()" v-show="tableFlag">
        <p class="addTableIDText">添加</p>
        <p class="addTableIDText">餐桌</p>
      </div>
      <!-- 增加桌子按钮 -->
      <transition name="bounce">
        <div id="addTableBox" v-show="addTableFlag">
          <b-form-group id="addTableGroup"
                        ref="addTableGroup"
                        label="请勿输入重复的桌号"
                        :description="addTableErrorMsg">
            <b-form-input id="addTableInput" v-model="newTableID" type="number"></b-form-input>
          </b-form-group>
          <b-button id="addTableConfirmButton"
                    class="btn btn-outline-secondary"
                    @click="confirmAddTable">确认</b-button>
          <b-button id="addTableCancelButton"
                    class="btn btn-outline-secondary"
                    @click="cancelAddTable">取消</b-button>
        </div>
      </transition>
      <!-- 桌子二维码 -->
      <transition name="bounce">
        <div id="qrcodeBox" v-show="qrcodeFlag">
          <b-button id="delTableButton"
                    class="btn btn-outline-secondary"
                    @click="delTable">删除餐桌</b-button>
          <b-button id="closeQrcodeButton"
                    class="btn btn-outline-secondary"
                    @click="closeQrcode">关闭</b-button>
          <QrcodeVue :value="qrcodeSetting.value"
                    :size="qrcodeSetting.size"></QrcodeVue>
        </div>
      </transition>
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
      qrcodeFlag: false,
      qrcodeSetting: {
        value: 'http://www.baidu.com',
        size: 300
      },
      addTableFlag: false,
      newTableID: '',
      addTableErrorMsg: '',
      tableFlag: true,
      selectedTableID: -1
    }
  },
  computed: {
    tableList () {
      return this.$store.state.store.tableList
    }
  },
  methods: {
    showQRCode (table) {
      this.qrcodeSetting.value = 'http://139.199.71.21:8888/#/table/' + table.tableID
      this.qrcodeFlag = true
      this.tableFlag = false
      this.selectedTableID = table.tableID
    },
    closeQrcode (event) {
      this.qrcodeFlag = false
      this.tableFlag = true
      this.selectedTableID = -1
    },
    showAddTableBox (event) {
      this.addTableFlag = true
    },
    cancelAddTable (event) {
      this.addTableFlag = false
      this.newTableID = ''
      this.addTableErrorMsg = ''
    },
    confirmAddTable (event) {
      if (this.newTableID === '' || this.newTableID === null) {
        this.addTableErrorMsg = '输入不能为空'
      } else if (this.newTableID <= 0 || this.newTableID % 1 !== 0) {
        this.addTableErrorMsg = '请输入正整数'
      } else {
        for (var i = 0; i < this.tableList.length; i++) {
          if (this.tableList[i].tableID === parseInt(this.newTableID)) {
            this.addTableErrorMsg = '桌号不能重复'
            return
          }
        }
        this.addTableErrorMsg = ''
        this.addTableFlag = false
        this.$store.dispatch('store/addTable', { tableID: this.newTableID })
      }
    },
    delTable (event) {
      this.$store.dispatch('store/delTable', { tableID: this.selectedTableID })
      this.closeQrcode()
    }
  },
  mounted () {
    setTimeout(() => {
      this.$store.dispatch('store/getTableInfo')
    }, 1000)
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
  position: relative;
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
  background-color: rgb(253, 240, 235);
  opacity: 0.7;
  box-shadow: rgba(0, 0, 0, 0.253) 0px 1px 6px, rgba(0, 0, 0, 0.253) 0px 1px 4px;
  transition: .15s all ease-in-out;
}

.addTableCard {
  user-select: none;
  cursor: pointer;
  font-size: 12pt;
  font-weight: bold;
  width: 60px;
  height: 60px;
  margin: 12.5px;
  padding: 6px;
  /* box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; */
  border: 1px solid #7f8183;
  /* background-color: #7f8183; */
  /* color: white; */
  transition: .15s all ease-in-out;
}

.addTableCard:hover {
  transform: scale(1.1);
  background-color: #5e5e5f;
  color: white;
}

.tableCard:hover {
  transform: scale(1.1);
}

.addTableCard:active {
  transform: scale(0.9);
}

.tableCard:active {
  transform: scale(0.9);
}

.tableCard>p, .addTableCard>p {
  margin: 0;
  opacity: 1 !important;
}

.tableIDText {
  font-size: 14pt;
}

/*增加桌子Box的样式*/
#addTableBox {
  position: absolute;
  top: 50px;
  width: 200px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  padding: 10px 15px 10px 15px;

  background-color: #4a4b4d;
  box-shadow: rgba(0, 0, 0, 0.117647) 1px 2px 6px, rgba(0, 0, 0, 0.117647) 1px 2px 6px;
  opacity: 0.9;
}

#addTableGroup {
  text-align: left;
  margin: 0;
}

/*请勿输入重复的桌号*/
#addTableGroup>legend {
  padding: 0;
  font-size: 9pt;
  font-weight: bold;
  color: white;
}

#addTableInput {
  border: none;
  border-radius: 0%;
  color: #2a2a2b;
  box-shadow: none;
}

#addTableGroup small {
  color: rgb(233, 102, 102) !important;
  font-size: 9pt;
  margin: 4px 0 4px 0;
}

#addTableConfirmButton, #addTableCancelButton {
  border-radius: 0%;
  border: none;
  color: white;
  padding: 2px 5px 2px 5px;
  margin: 0 10px 0 10px;
}

/* #addTableInput:focus {
  box-shadow: 0 0 0 -0.2rem rgba(108, 117, 125, 0.5);
} */

#qrcodeBox {
  position: absolute;
  top: 25px;
  margin: 0 auto 0 auto;
  left: 0;
  right: 0;
}

#delTableButton, #closeQrcodeButton {
  border: none;
  border-radius: 0%;

  padding: 2px 5px 2px 5px;
  margin: 0 0 5px 0;
}

</style>
