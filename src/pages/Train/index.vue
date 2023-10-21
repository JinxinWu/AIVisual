<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <!-- 组件+步骤 -->
        <el-tabs type="border-card">
          <!-- 遍历步骤 -->
          <el-tab-pane v-for="(step, index) in steps" :key="index" :label="step">
            <!-- 遍历组件、步骤传来取的数据 -->
            <draggable :group="groupA" :sort="false" animation="300" ref="dragA" :id="index">
              <el-popover v-for="method in methods[index]" :key="method.id" placement="top-start" :title=method.name
                width="400" trigger="hover" :content=method.content>
                <el-button slot="reference">{{ method.name }}</el-button>
              </el-popover>
            </draggable>
          </el-tab-pane>
        </el-tabs>
        <!-- 流程图模块 -->
        <el-row>
          <!-- 数据导入 -->
          <el-col :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>数据导入</span>
              </div>
              <draggable :group="groupB" animation="300">
                <el-popover v-for="item in arr" :key="item.id" placement="top-start" :title=item.name width="400"
                  trigger="hover" :content=item.content>
                  <el-button slot="reference">{{ item.name }}</el-button>
                </el-popover>
              </draggable>
              <div class="text item">
                {{ messages[0] }}
              </div>
            </el-card>
          </el-col>
          <!-- 箭头图片 -->
          <el-col :span="4">
            <el-card :body-style="{ margin: '93.2px 0' }">
              <i class="el-icon-right"></i>
            </el-card>
          </el-col>
          <!-- 数据预处理 -->
          <el-col :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>数据预处理</span>
              </div>
              <draggable :group="groupB" animation="300">
                <el-popover v-for="item in arr" :key="item.id" placement="top-start" :title=item.name width="400"
                  trigger="hover" :content=item.content>
                  <el-button slot="reference">{{ item.name }}</el-button>
                </el-popover>
              </draggable>
              <div class="text item">
                推荐使用数据预处理组件，支持多种数据预处理方法，包括数据归一化、数据标准化、数据离散化、onehot编码、label编码、描述性统计、词向量转化、相似度计算、图像增强等
              </div>
            </el-card>
          </el-col>
          <!-- 箭头图片 -->
          <el-col :span="4">
            <el-card :body-style="{ margin: '93.2px 0' }">
              <i class="el-icon-right"></i>
            </el-card>
          </el-col>
          <!-- 特征工程 -->
          <el-col :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>特征工程</span>
              </div>
              <draggable :group="groupB" animation="300">
                <el-popover v-for="item in arr" :key="item.id" placement="top-start" :title=item.name width="400"
                  trigger="hover" :content=item.content>
                  <el-button slot="reference">{{ item.name }}</el-button>
                </el-popover>
              </draggable>
              <div class="text item">
                推荐使用特征工程组件，支持多种特征工程方法，包括特征选择、特征降维、特征提取、特征构造等
              </div>
            </el-card>
          </el-col>
          <!-- 箭头图片 -->
          <el-col :span="4">
            <el-card :body-style="{ margin: '93.2px 0' }">
              <i class="el-icon-right"></i>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <!-- 模型选择 -->
          <el-col :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>模型选择</span>
              </div>
              <draggable :group="groupB" animation="300">
                <el-popover v-for="item in arr" :key="item.id" placement="top-start" :title=item.name width="400"
                  trigger="hover" :content=item.content>
                  <el-button slot="reference">{{ item.name }}</el-button>
                </el-popover>
              </draggable>
              <div class="text item">
                推荐使用模型选择组件，支持多种模型选择方法，包括模型评估、模型调参、模型融合等
              </div>
            </el-card>
          </el-col>
          <!-- 箭头图片 -->
          <el-col :span="4">
            <el-card :body-style="{ margin: '93.2px 0' }">
              <i class="el-icon-right"></i>
            </el-card>
          </el-col>
          <!-- 模型评估 -->
          <el-col :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>模型评估</span>
              </div>
              <draggable :group="groupB" animation="300">
                <el-popover v-for="item in arr" :key="item.id" placement="top-start" :title=item.name width="400"
                  trigger="hover" :content=item.content>
                  <el-button slot="reference">{{ item.name }}</el-button>
                </el-popover>
              </draggable>
              <div class="text item">
                推荐使用模型评估组件，支持多种模型评估方法，包括模型评估、模型调参、模型融合等
              </div>
            </el-card>
          </el-col>
          <!-- 箭头图片 -->
          <el-col :span="4">
            <el-card :body-style="{ margin: '93.2px 0' }">
              <i class="el-icon-right"></i>
            </el-card>
          </el-col>
          <!-- 模型预测 -->
          <el-col :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>模型预测</span>
              </div>
              <draggable :group="groupB" animation="300">
                <el-popover v-for="item in arr" :key="item.id" placement="top-start" :title=item.name width="400"
                  trigger="hover" :content=item.content>
                  <el-button slot="reference">{{ item.name }}</el-button>
                </el-popover>
              </draggable>
              <div class="text item">
                推荐使用模型预测组件，支持多种模型预测方法，包括模型评估、模型调参、模型融合等
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
//导入draggable组件
import draggable from "vuedraggable";

export default {
  name: 'Train',
  components: {
    Header,
    draggable,
  },
  data() {
    return {
      visible: false,
      steps: ['数据导入', '数据预处理', '特征工程', '模型选择', '模型评估', '模型预测'],
      methods: [
        [{ st: 0, id: 0, name: '关系型数据库导入数据', content: 'shujuguiyihua' },
         { st: 0, id: 1, name: '本地csv导入数据', content: 'shujubiaozhunhua' },
         { st: 0, id: 2, name: '从本地excel导入数据', content: 'shujubiaozhunhua' },
         { st: 0, id: 3, name: '非结构化数据导入', content: 'shujubiaozhunhua' },],
        [{ st: 0, id: 4, name: '数据归一化', content: 'shujuguiyihua' },
         { st: 1, id: 5, name: '数据标准化', content: 'shujubiaozhunhua' },
         { st: 1, id: 6, name: '数据离散化', content: 'shujulisanhua' },
         { st: 1, id: 7, name: 'onehot编码', content: 'onehotbianma' },
         { st: 1, id: 8, name: 'label编码', content: 'labelbianma' },
         { st: 1, id: 9, name: '描述性统计', content: 'miaoshuxingtongji' },
         { st: 1, id: 10, name: '词向量转化', content: 'cixiangliangzhuanhua' },
         { st: 1, id: 11, name: '相似度计算', content: 'xiangsidujisuan' },
         { st: 1, id: 12, name: '图像增强', content: 'tuxiangzengqiang' }],
      ],
      messages: ['shuju', 'yuchuli', 'tezheng', 'xuanze', 'pinggu', 'yuce'],
      groupA: {
        name: "itxst",
        put: false, //可以拖入
        pull: "clone",
      },
      groupB: {
        name: "itxst12",
        pull: false, //B组拖拽时克隆到A组
        put: () => {
          if (this.st != 0) {
            this.message = "元素小于等于3不允许再拖拽了";
          }
          return this.arr.length > 3;
        },
      },
      arr: [],
    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
// 自己写的
.el-popover__reference {
  margin-right: 10px;
  margin-bottom: 10px;
}

.box-card {
  height: 300px;
}

// Container
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: auto;
}

body>.el-container {
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
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

// el-card
.text {
  font-size: 14px;
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
  clear: both
}

.box-card {
  width: 240px;
}

// el-row
.time {
  font-size: 13px;
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
  clear: both
}
</style>