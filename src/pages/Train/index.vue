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
          <el-tab-pane
            v-for="(step, index) in steps"
            :key="index"
            :label="step"
          >
            <!-- 遍历组件、步骤传来取的数据 -->
            <draggable
              :group="groupA"
              :sort="false"
              animation="300"
              @end="getXY($event, index)"
            >
              <el-popover
                v-for="method in methods[index]"
                :key="method.id"
                placement="top-start"
                :title="method.name"
                width="400"
                trigger="hover"
                :content="method.content"
              >
                <el-button slot="reference">{{ method.name }}</el-button>
              </el-popover>
            </draggable>
          </el-tab-pane>
        </el-tabs>

        <!-- 流程图模块 -->
        <el-row :gutter="24" style="min-height: 600px; margin-top: 25px">
          <!-- 数据导入 -->
          <el-col :span="16">
            <el-card class="box-card" style="width: auto; height: auto">
              <div slot="header" class="clearfix">
                <span>信息队列</span>
              </div>

              <!-- 数据处理和构建模型 -->
              <div
                style="min-height: 500px; display: block; position: relative"
              >
                <div style="position: absolute; z-index: 2">
                  <el-table :data="arr" style="width: 100%" height="500">
                    <el-table-column
                      label="操作顺序"
                      type="index"
                      :index="indexMethod"
                      width="100"
                      align="center"
                    >
                    </el-table-column>

                    <el-table-column
                      prop="name"
                      label="操作名称"
                      width="600"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span style="margin-left: 0px">{{
                          scope.row.name
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="dialogFormVisible = true"
                          >{{ scope.row.st !== 0 ? "编辑" : "上传" }}</el-button
                        >
                        <!-- Form -->
                        <el-dialog
                          title="收货地址"
                          :visible.sync="dialogFormVisible"
                          append-to-body
                        >
                          <el-form :model="form">
                            <el-form-item
                              label="活动区域"
                              :label-width="formLabelWidth"
                            >
                              <el-select
                                v-model="form.region"
                                placeholder="请选择活动区域"
                              >
                                <el-option
                                  label="区域一"
                                  value="shanghai"
                                ></el-option>
                                <el-option
                                  label="区域二"
                                  value="beijing"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item
                              label="上传文件"
                              :label-width="formLabelWidth"
                            >
                              <el-upload
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple
                              >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                  将文件拖到此处，或<em>点击上传</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">
                                  只能上传jpg/png文件，且不超过500kb
                                </div>
                              </el-upload>
                            </el-form-item>
                          </el-form>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false"
                              >取 消</el-button
                            >
                            <el-button
                              type="primary"
                              @click="dialogFormVisible = false"
                              >确 定</el-button
                            >
                          </div>
                        </el-dialog>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div
                  style="
                    display: none;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: 3;
                    top: 10px;
                  "
                >
                  <draggable :group="groupB" animation="300"> </draggable>
                </div>
              </div>
              <div class="text item"></div>
            </el-card>
          </el-col>
          <!-- 平台显示信息 -->
          <el-col :span="8">
            <el-card style="width: auto; min-height: 600px">
              <div slot="header" class="clearfix">
                <span>平台显示的信息</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import { Autocomplete } from "element-ui";
//导入draggable组件
import draggable from "vuedraggable";

export default {
  name: "Train",
  components: {
    Header,
    draggable,
  },
  data() {
    return {
      visible: false,
      steps: [
        "数据导入",
        "数据预处理",
        "特征工程",
        "模型选择",
        "模型评估",
        "模型预测",
      ],
      methods: [
        [
          {
            st: 0,
            id: 0,
            name: "关系型数据库导入数据",
            content: "shujuguiyihua",
          },
          {
            st: 0,
            id: 1,
            name: "本地csv导入数据",
            content: "shujubiaozhunhua",
          },
          {
            st: 0,
            id: 2,
            name: "从本地excel导入数据",
            content: "shujubiaozhunhua",
          },
          {
            st: 0,
            id: 3,
            name: "非结构化数据导入",
            content: "shujubiaozhunhua",
          },
        ],
        [
          { st: 1, id: 4, name: "数据归一化", content: "shujuguiyihua" },
          { st: 1, id: 5, name: "数据标准化", content: "shujubiaozhunhua" },
          { st: 1, id: 6, name: "数据离散化", content: "shujulisanhua" },
          { st: 1, id: 7, name: "onehot编码", content: "onehotbianma" },
          { st: 1, id: 8, name: "label编码", content: "labelbianma" },
          { st: 1, id: 9, name: "描述性统计", content: "miaoshuxingtongji" },
          {
            st: 1,
            id: 10,
            name: "词向量转化",
            content: "cixiangliangzhuanhua",
          },
          { st: 1, id: 11, name: "相似度计算", content: "xiangsidujisuan" },
          { st: 1, id: 12, name: "图像增强", content: "tuxiangzengqiang" },
        ],
      ],
      messages: ["shuju", "yuchuli", "tezheng", "xuanze", "pinggu", "yuce"],
      groupA: {
        name: "itxst",
        put: false, //不可以拖入
        pull: "clone",
      },
      groupB: {
        name: "itxst",
        pull: false, //B组拖拽时克隆到A组
        put: true,
      },
      arr: [],
      x: 0,
      y: 0,
      index1: 0,
      index2: 0,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogFormVisible: false,
      form: {
        region: "",
      },
      formLabelWidth: "120px",
    };
  },
  watch: {
    arr: function (newV, old) {
      // console.log(newV);
      // console.log(old);
    },
    x: function (newX) {
      if (newX > 100 && newX < 700 && this.y > 380 && this.y < 800) {
        this.arr.push(this.$data.methods[this.index1][this.index2]);
      }
    },
  },
  methods: {
    getXY(e, index1) {
      this.$data.x = e.originalEvent.pageX;
      this.$data.y = e.originalEvent.pageY;
      this.$data.index1 = index1;
      this.$data.index2 = e.oldIndex;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(row);
      this.$confirm("此操作将删除此步骤, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.arr.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>

<style lang="less" scoped>
// 自己写的
.el-popover__reference {
  margin-right: 10px;
  margin-bottom: 10px;
}

.box-card {
  min-height: 300px;
}

// Container
.el-header,
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
  background-color: #e9eef3;
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
  clear: both;
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
  clear: both;
}
</style>