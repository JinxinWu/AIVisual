<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <!-- 组件+步骤 -->
        <el-row class="menu" style="border-top: 1px dashed #4874cb;">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv" style="">加载数据</div></el-col
          >
          <el-col :span="4" style="margin-top: 5px; margin-bottom: 5px" 
                  v-for="item in [myComponents.csvImport, 
                                  myComponents.ExcelImport, 
                                  myComponents.DBImport, 
                                  myComponents.unstructuredImport]">
            <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                :comData="item"
            ></NoInputCom>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">数据预处理</div></el-col
          >
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>缺失值处理</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.delMisCol, myComponents.zeroCom]"
                  :comData="item"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.meanCom, myComponents.interCom]"
                  :comData="item"
                ></NoInputCom>
              </div>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <InputCom
                @customEvent="getMessage"
                :comData="myComponents.datasetPart"
              ></InputCom>
            </div>
          </el-col>

          <el-col :span="4">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>异常值处理</div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <NoInputCom
                  draggable="true"
                  @customEvent="getMessage"
                  v-for="item in [
                    myComponents.delError,
                    myComponents.bcTrans,
                    myComponents.ltTrun,
                  ]"
                  :comData="item"
                ></NoInputCom>
              </div>
            </div>
          </el-col>

          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>数据转换</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.normal, myComponents.standard]"
                  :comData="item"
                ></NoInputCom>
              </div>
              <div>
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.onehot, myComponents.label]"
                  :comData="item"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.equi]"
                  :comData="item"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">不平衡工程</div></el-col
          >
          <el-col :span="4"
                  v-for="item in [myComponents.randomUnder, 
                                  myComponents.ennUnder, 
                                  myComponents.repeatedOver, 
                                  myComponents.smoteOver,
                                  myComponents.ganOver]">
            <InputCom
                draggable="true"
                @customEvent="getMessage"
                :comData="item"
            ></InputCom>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">特征工程</div></el-col
          >
          <el-col :span="4"
                  v-for="item in [myComponents.pca, 
                                  myComponents.lda, 
                                  myComponents.correlation, 
                                  myComponents.cif,]">
            <InputCom
                draggable="true"
                @customEvent="getMessage"
                :comData="item"
            ></InputCom>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">深度学习</div></el-col
          >
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>卷积神经网络</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.bcnn, myComponents.alexNet]"
                  :comData="item"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.resNet, myComponents.vgg]"
                  :comData="item"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>循环神经网络</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.brnn, myComponents.lstm]"
                  :comData="item"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  @customEvent="getMessage"
                  v-for="item in [myComponents.gru]"
                  :comData="item"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>图神经网络</div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <NoInputCom
                  draggable="true"
                  @customEvent="getMessage"
                  v-for="item in [myComponents.bgnn, myComponents.simgnn]"
                  :comData="item"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">机器学习</div></el-col
          >
          <el-col :span="4"
            ><div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                v-for="item in [myComponents.svm, myComponents.lightgbm]"
                :comData="item"
              ></NoInputCom></div
          ></el-col>
          <el-col :span="4">
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                v-for="item in [myComponents.nnd, myComponents.xgboost]"
                :comData="item"
              ></NoInputCom>
            </div>
          </el-col>
          <el-col :span="4"
            >
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                v-for="item in [myComponents.lr, myComponents.catboost]"
                :comData="item"
              ></NoInputCom>
            </div>
            </el-col>
          <el-col :span="4"
            >
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                v-for="item in [myComponents.dt, myComponents.kmeans]"
                :comData="item"
              ></NoInputCom>
            </div>
            </el-col>
          <el-col :span="4">
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                v-for="item in [myComponents.rf]"
                :comData="item"
              ></NoInputCom>
            </div>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="8" style="line-height: 25px"
            ><div class="rowDiv">评估指标</div></el-col
          >
          <el-col :span="5" v-for="item in [myComponents.accuracy,
                                            myComponents.precision,
                                            myComponents.recall, 
                                            myComponents.f1, 
                                            myComponents.auc, 
                                            myComponents.roc, 
                                            myComponents.mse, 
                                            myComponents.mape]">
            <NoInputCom
                draggable="true"
                @customEvent="getMessage"
                :comData="item"
            ></NoInputCom>
          </el-col>
        </el-row>

        <!-- 画布模块模块 -->
        <el-row>
          <el-col span:24 style="width: 100%; height: 200px; margin-top: 10px">
          </el-col>
        </el-row>
        <!-- 后端显示模块 -->
        <el-row>
          <el-col span:24>
            <div></div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import Header from "@/components/Header/index.vue";
import NoInputCom from "@/components/NoInputCom";
import InputCom from "@/components/InputCom";

export default {
  name: "Train",
  components: {
    Header,
    InputCom,
    NoInputCom,
  },
  data() {
    return {
      myComponents: this.$store.state.myComponents,
      //存储所有小组件的信息
      listAll: [],
    };
  },
  mounted() {},
  watch: {},
  methods: {
    //获取子组件的信息
    getMessage(data) {
      this.listAll.push(data);
      // console.log(this.xy);
    },
  },
};
</script>
  
<style lang="less" scoped>
//表格最左边的div
.rowDiv {
  background-color: #2932e1;
  width: 100px;
  height: 25px;
  margin: 10px auto;
  color: white;
  border-radius: 5px;
}

// 自己写的
.el-popover__reference {
  margin-right: 10px;
  margin-bottom: 10px;
}

.box-card {
  height: 300px;
}

// Container
.el-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// Layout
.el-main .menu {
  width: 80%;
  margin: 0px auto;
  border-right: 1px dashed #4874cb;
  border-left: 1px dashed #4874cb;
  border-bottom: 1px dashed #4874cb;
  display: flex;
  align-items: center; /* 垂直居中 */
  font-size: 13px;
}

.el-col {
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

// el-card
.text {
  font-size: 12px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 240px;
}

// el-row
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>