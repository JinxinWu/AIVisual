<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <el-row style="margin-top: 20px">
        <el-col :span="6" :offset="4">
          <span class="demonstration">按照模型类型检索</span>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" :offset="4"
          ><div>
            <span class="demonstration">按照日期检索</span>
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker></div
        ></el-col>
      </el-row>
      <el-col :span="18" :offset="3"
        ><div class="grid-content bg-purple-light">
          <el-table
            :data="tableDataShow"
            border
            style="width: 100%; margin: auto"
            :header-cell-style="rowStyle"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              prop="index"
              label="序号"
              width="50"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间"
              width="100"
              align="center"
              :formatter="formatDate"
            >
            </el-table-column>
            <el-table-column prop="dataName" label="数据集名称" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.dataName.length <= 6">{{
                  scope.row.dataName
                }}</span>
                <span v-if="scope.row.dataName.length > 6">{{
                  scope.row.dataName.substr(0, 6) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="guidance" label="建模指引" width="160">
              <template slot-scope="scope">
                <span v-if="scope.row.guidance.length <= 10">{{
                  scope.row.guidance
                }}</span>
                <span v-if="scope.row.guidance.length > 10">{{
                  scope.row.guidance.substr(0, 10) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="model" label="模型(算法组合)" width="260">
              <template slot-scope="scope">
                <span v-if="scope.row.model.length <= 10">{{
                  scope.row.model
                }}</span>
                <span v-if="scope.row.model.length > 10">{{
                  scope.row.model.substr(0, 10) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80" align="center">
            </el-table-column>
            <el-table-column prop="result" label="结果" width="263">
              <template slot-scope="scope">
                <span v-if="scope.row.result.length <= 10">{{
                  scope.row.result
                }}</span>
                <span v-if="scope.row.result.length > 10">{{
                  scope.row.result.substr(0, 10) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="
                    handleClick(scope.row);
                    dialogTableVisible = true;
                  "
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="apply(scope.row)"
                  :disabled="scope.row.isAble"
                  >应用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
      <el-col :span="10" :offset="14">
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="tableDataPages.length"
          >
          </el-pagination>
        </div>
      </el-col>
      <el-dialog title="建模详情" :visible.sync="dialogTableVisible">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="序号">
            <span>{{ details.index }}</span>
          </el-form-item>
          <el-form-item label="时间">
            <span>{{ details.date }}</span>
          </el-form-item>
          <el-form-item label="数据集名称">
            <span>{{ details.dataName }}</span>
          </el-form-item>
          <el-form-item label="建模指引">
            <span v-html="details.guidance"></span>
          </el-form-item>
          <el-form-item label="算法组合">
            <span>{{ details.model }}</span>
          </el-form-item>
          <el-form-item label="类型">
            <span>{{ details.type }}</span>
          </el-form-item>
          <el-form-item label="结果">
            <span>{{ details.result }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  components: {
    Header,
  },
  data() {
    return {
      currentPage3: 1,
      details: {},
      dialogTableVisible: false,
      options: [
        {
          value: "自主建模",
          label: "自主建模",
        },
        {
          value: "模型应用",
          label: "模型应用",
        },
      ],
      value: "",
      tableDataShow: [],
      tableDataPages: [],
      tableData: [
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎iuhuihihiuhiuhiuuhiuhiuh",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "2",
          date: "2023-12-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1517 弄",
          type: "模型应用",
          result: "成功",
          isAble: false,
        },
        {
          index: "3",
          date: "2023-11-06 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1519 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "4",
          date: "2023-11-02 00:08:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1516 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "2",
          date: "2023-12-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1517 弄",
          type: "模型应用",
          result: "成功",
          isAble: false,
        },
        {
          index: "3",
          date: "2023-11-06 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1519 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "4",
          date: "2023-11-02 00:08:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1516 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "2",
          date: "2023-12-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1517 弄",
          type: "模型应用",
          result: "成功",
          isAble: false,
        },
        {
          index: "3",
          date: "2023-11-06 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1519 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "4",
          date: "2023-11-02 00:08:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1516 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "2",
          date: "2023-12-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1517 弄",
          type: "模型应用",
          result: "成功",
          isAble: false,
        },
        {
          index: "3",
          date: "2023-11-06 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1519 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "4",
          date: "2023-11-02 00:08:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1516 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          user: "王小虎",
          feature: "王小虎",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "2",
          date: "2023-12-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1517 弄",
          type: "模型应用",
          result: "成功",
          isAble: false,
        },
        {
          index: "3",
          date: "2023-11-06 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1519 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "4",
          date: "2023-11-02 00:08:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1516 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          user: "王小虎",
          feature: "王小虎",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "2",
          date: "2023-12-02 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1517 弄",
          type: "模型应用",
          result: "成功",
          isAble: false,
        },
        {
          index: "3",
          date: "2023-11-06 00:00:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1519 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "4",
          date: "2023-11-02 00:08:00",
          dataName: "王小虎",
          guidance: "王小虎",
          model: "上海市普陀区金沙江路 1516 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
        {
          index: "1",
          date: "2023-11-02 00:00:00",
          user: "王小虎",
          guidance:
            "存在缺失值 缺失值数量：414 缺失值数量占比：9.00%<br>特征列序号 特征名称 缺失值数量 缺失值占比: <br>4         ['Age']    86 20.57% <br>8        ['Fare']     1 0.24% <br>9       ['Cabin']   327 78.23% <br>第[4, 9]列建议进行缺失值处理—删除缺失列<br>第[8]列建议进行缺失值处理—缺失值填充<br>",
          dataName: "鸢尾花数据集",
          model: "上海市普陀区金沙江路 1518 弄",
          type: "自主建模",
          result: "成功",
          isAble: false,
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
    };
  },
  methods: {
    // download(filename, link) {
    //     let DownloadLink = document.createElement('a');
    //     DownloadLink.style = 'display: none'; // 创建一个隐藏的a标签
    //     DownloadLink.download = filename;
    //     DownloadLink.href = link;
    //     document.body.appendChild(DownloadLink);
    //     DownloadLink.click(); // 触发a标签的click事件
    //     document.body.removeChild(DownloadLink);
    // },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(row) {
      this.details = row;
      console.log(this.details);
    },
    rowStyle() {
      return "text-align:center; background-color: #f5f7fa;";
    },
    formatDate(row, column) {
      // 获取单元格数据
      let date = row[column.property];
      if (date == null) {
        return null;
      }
      let dt = new Date(date);
      return dayjs(dt).format("YYYY-MM-DD\nHH:mm:ss");
    },
    apply(row) {
      this.$confirm("此操作会将此模型加入模型应用中, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.isAble = true;
          this.$message({
            type: "success",
            message: "应用成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消应用",
          });
        });
    },
  },
  watch: {
    value(val) {
      if (this.value2 === null) {
        if (val === "") {
          this.tableDataPages = this.tableData;
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        } else {
          this.tableDataPages = this.tableData.filter((item) => {
            return item.type === val;
          });
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        }
      } else {
        if (val === "") {
          this.tableDataPages = this.tableData.filter((item) => {
            const dt = new Date(item.date);
            return (
              dt.getTime() >= this.value2[0].getTime() &&
              dt.getTime() <= this.value2[1].getTime()
            );
          });
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        } else {
          this.tableDataPages = this.tableDataPages.filter((item) => {
            const dt = new Date(item.date);
            return (
              dt.getTime() >= this.value2[0].getTime() &&
              dt.getTime() <= this.value2[1].getTime()
            );
          });
          this.tableDataPages = this.tableDataPages.filter((item) => {
            return item.type === val;
          });
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        }
      }
    },
    value2(val) {
      // 类型值为空
      if (this.value === "") {
        // 时间为空
        if (val === null) {
          this.tableDataPages = this.tableData;
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        } else {
          // 时间不为空
          this.tableDataPages = this.tableData.filter((item) => {
            const dt = new Date(item.date);
            return (
              dt.getTime() >= val[0].getTime() &&
              dt.getTime() <= val[1].getTime()
            );
          });
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        }
      } else {
        console.log(val);
        if (val === null) {
          this.tableDataPages = this.tableData.filter((item) => {
            return item.type === this.value;
          });
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        } else {
          this.tableDataPages = this.tableDataPages.filter((item) => {
            const dt = new Date(item.date);
            return (
              dt.getTime() >= val[0].getTime() &&
              dt.getTime() <= val[1].getTime()
            );
          });
          this.currentPage3 = 1;
          this.tableDataShow = this.tableDataPages.slice(0, 10);
        }
      }
    },
    currentPage3() {
      this.tableDataShow = this.tableDataPages.slice(
        (this.currentPage3 - 1) * 10,
        this.currentPage3 * 10
      );
    },
  },
  mounted() {
    this.tableDataPages = this.tableData;
    this.tableDataShow = this.tableData.slice(0, 10);
  },
};
</script>

<style lang="less" scoped>
.demonstration {
  font-size: 14px;
  margin-bottom: 10px;
  color: #8492a6;
  display: block;
}

.el-form-item {
  display: block;
}

// Container
.el-header {
  // background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0;
}

.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  padding: 0;
  //   height: calc(100vh - 170px); // 设置主体 main 高度
  // background-color: #e9eef3;
  color: #333;
  text-align: left;
  // line-height: auto;
}

body > .el-container {
  height: 96vh;
  margin-bottom: 0px;
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
</style>
