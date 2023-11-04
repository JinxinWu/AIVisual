<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <!-- 组件+步骤 -->
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv" style="">加载数据</div></el-col
          >
          <el-col :span="4" style="margin-top: 5px; margin-bottom: 5px"
            ><csvImport @customEvent="getMessage">csv文件</csvImport></el-col
          >
          <el-col :span="4" style="margin-top: 5px; margin-bottom: 5px"
            ><excelImport @customEvent="getMessage"
              >EXCEL文件</excelImport
            ></el-col
          >
          <el-col :span="4" style="margin-top: 5px; margin-bottom: 5px"
            ><DBImport @customEvent="getMessage">DB文件</DBImport></el-col
          >
          <el-col :span="4" style="margin-top: 5px; margin-bottom: 5px"
            ><unstructuredImport @customEvent="getMessage"
              >非结构化数据</unstructuredImport
            ></el-col
          >
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
              <div style="margin-top: 5px; margin-bottom: 5px">
                <DeleteMissingColumns
                  @customEvent="getMessage"
                ></DeleteMissingColumns>
                <ZeroCompletion @customEvent="getMessage"></ZeroCompletion>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <MeanCompletion @customEvent="getMessage"></MeanCompletion
                ><InterpolationCompletion
                  @customEvent="getMessage"
                ></InterpolationCompletion>
              </div>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <DatasetPartitioning
                @customEvent="getMessage"
              ></DatasetPartitioning>
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
                <DeleteAbnormalSamples
                  @customEvent="getMessage"
                ></DeleteAbnormalSamples>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <BCTransformation @customEvent="getMessage"></BCTransformation>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <LTTruncation @customEvent="getMessage"></LTTruncation>
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
              <div style="margin-top: 5px; margin-bottom: 5px">
                <Normalization @customEvent="getMessage"></Normalization>
                <Standardization @customEvent="getMessage"></Standardization>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <OnehotEncoding @customEvent="getMessage"></OnehotEncoding>
                <LabelEncoding @customEvent="getMessage"></LabelEncoding>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <EquidistantDispersion
                  @customEvent="getMessage"
                ></EquidistantDispersion>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">不平衡工程</div></el-col
          >
          <el-col :span="4"
            ><RandomUndersampling
              @customEvent="getMessage"
            ></RandomUndersampling
          ></el-col>
          <el-col :span="4"
            ><ENNUndersampling @customEvent="getMessage"></ENNUndersampling
          ></el-col>
          <el-col :span="4"
            ><RepeatedOversampling
              @customEvent="getMessage"
            ></RepeatedOversampling
          ></el-col>
          <el-col :span="4"
            ><SMOTEOversampling @customEvent="getMessage"></SMOTEOversampling
          ></el-col>
          <el-col :span="4"
            ><GANOversampling @customEvent="getMessage"></GANOversampling
          ></el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">特征工程</div></el-col
          >
          <el-col :span="4"
            ><PCADReduction @customEvent="getMessage"></PCADReduction
          ></el-col>
          <el-col :span="4"
            ><LDADReduction @customEvent="getMessage"></LDADReduction
          ></el-col>
          <el-col :span="4"
            ><CorrelationSelection
              @customEvent="getMessage"
            ></CorrelationSelection
          ></el-col>
          <el-col :span="4"
            ><CIFSelection @customEvent="getMessage"></CIFSelection
          ></el-col>
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
              <div style="margin-top: 5px; margin-bottom: 5px">
                <BCNN @customEvent="getMessage"></BCNN
                ><AlexNet @customEvent="getMessage"></AlexNet>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <ResNet @customEvent="getMessage"></ResNet
                ><VGG @customEvent="getMessage"></VGG>
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
              <div style="margin-top: 5px; margin-bottom: 5px">
                <BRNN @customEvent="getMessage"></BRNN
                ><LSTM @customEvent="getMessage"></LSTM>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <GRU @customEvent="getMessage"></GRU>
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
                <BGNN @customEvent="getMessage"></BGNN>
              </div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <SimGNN @customEvent="getMessage"></SimGNN>
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
              <SVM @customEvent="getMessage"></SVM>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <LightGBM @customEvent="getMessage"></LightGBM></div
          ></el-col>
          <el-col :span="4"
            ><div style="margin-top: 5px; margin-bottom: 5px">
              <NND @customEvent="getMessage"></NND>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <Xgboost @customEvent="getMessage"></Xgboost></div
          ></el-col>
          <el-col :span="4"
            ><div style="margin-top: 5px; margin-bottom: 5px">
              <LR @customEvent="getMessage"></LR>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <Catboost @customEvent="getMessage"></Catboost></div
          ></el-col>
          <el-col :span="4"
            ><div style="margin-top: 5px; margin-bottom: 5px">
              <DT @customEvent="getMessage"></DT>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <Kmeans @customEvent="getMessage"></Kmeans></div
          ></el-col>
          <el-col :span="4"><RF @customEvent="getMessage"></RF></el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="8" style="line-height: 25px"
            ><div class="rowDiv">评估指标</div></el-col
          >
          <el-col :span="5"><Accuracy></Accuracy></el-col>
          <el-col :span="5"><Precision></Precision></el-col>
          <el-col :span="5"><Recall></Recall></el-col>
          <el-col :span="5"><F1></F1></el-col>
          <el-col :span="5"><AUC></AUC></el-col>
          <el-col :span="5"><ROC></ROC></el-col>
          <el-col :span="5"><MSE></MSE></el-col>
          <el-col :span="5"><MAPE></MAPE></el-col>
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
import { Autocomplete } from "element-ui";

//组件导入
import {
  csvImport,
  DBImport,
  excelImport,
  unstructuredImport,
} from "@/components/DataImport";
import {
  DatasetPartitioning,
  DeleteMissingColumns,
  InterpolationCompletion,
  MeanCompletion,
  ZeroCompletion,
  DeleteAbnormalSamples,
  LTTruncation,
  BCTransformation,
  Normalization,
  Standardization,
  OnehotEncoding,
  LabelEncoding,
  EquidistantDispersion,
} from "@/components/DataPreprocessing";
import {
  RandomUndersampling,
  ENNUndersampling,
  RepeatedOversampling,
  SMOTEOversampling,
  GANOversampling,
} from "@/components/ImbalancedEngineering";
import {
  CIFSelection,
  CorrelationSelection,
  LDADReduction,
  PCADReduction,
} from "@/components/FeatureEngineering";
import {
  AlexNet,
  BCNN,
  BGNN,
  BRNN,
  GRU,
  LSTM,
  ResNet,
  SimGNN,
  VGG,
} from "@/components/DeepLearning";
import {
  Catboost,
  DT,
  Kmeans,
  LightGBM,
  LR,
  NND,
  RF,
  SVM,
  Xgboost,
} from "@/components/MachineLearning";
import {
  Accuracy,
  AUC,
  F1,
  MAPE,
  MSE,
  Precision,
  Recall,
  ROC,
} from "@/components/EvaluationIndicators";

export default {
  name: "Train",
  components: {
    Header,
    csvImport,
    DBImport,
    excelImport,
    unstructuredImport,
    DatasetPartitioning,
    DeleteMissingColumns,
    InterpolationCompletion,
    MeanCompletion,
    ZeroCompletion,
    DeleteAbnormalSamples,
    LTTruncation,
    BCTransformation,
    Normalization,
    Standardization,
    OnehotEncoding,
    LabelEncoding,
    EquidistantDispersion,
    RandomUndersampling,
    ENNUndersampling,
    RepeatedOversampling,
    SMOTEOversampling,
    GANOversampling,
    CIFSelection,
    CorrelationSelection,
    LDADReduction,
    PCADReduction,
    AlexNet,
    BCNN,
    BGNN,
    BRNN,
    GRU,
    LSTM,
    ResNet,
    SimGNN,
    VGG,
    Catboost,
    DT,
    Kmeans,
    LightGBM,
    LR,
    NND,
    RF,
    SVM,
    Xgboost,
    Accuracy,
    AUC,
    F1,
    MAPE,
    MSE,
    Precision,
    Recall,
    ROC,
  },
  data() {
    return {
      visible: false,

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
  background-color: #004088;
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
  margin: 2px auto;
  border: 1px dashed #4874cb;
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