<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <el-table :data="tableData" border style="width: 75%; margin: auto;" :header-cell-style="rowStyle">
        <el-table-column prop="index" label="序号" width="150" align="center">
        </el-table-column>
        <el-table-column prop="data" label="时间" width="120" align="center">
        </el-table-column>
        <el-table-column prop="user" label="用户" width="120">
        </el-table-column>
        <el-table-column prop="feature" label="数据特点" width="120">
        </el-table-column>
        <el-table-column prop="model" label="模型(算法组合)" width="300">
        </el-table-column>
        <el-table-column prop="type" label="类型(自主建模/模型应用)" width="120">
        </el-table-column>
        <el-table-column prop="result" label="结果" width="120">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";

export default {
  components: {
    Header,
  },
  data() {
    return {
      tableData: [
        {
          index: "1",
          data: "2016-05-02",
          user: "王小虎",
          feature: "王小虎",
          model: "上海市普陀区金沙江路 1518 弄",
          type: 200333,
          result: "成功",
        },
        {
          index: "2",
          data: "2016-05-04",
          user: "王小虎",
          feature: "普陀区",
          model: "上海市普陀区金沙江路 1517 弄",
          type: 200333,
          result: "成功",
        },
        {
          index: "3",
          data: "2016-05-01",
          user: "王小虎",
          feature: "普陀区",
          model: "上海市普陀区金沙江路 1519 弄",
          type: 200333,
          result: "成功",
        },
        {
          index: "4",
          data: "2016-05-03",
          user: "王小虎",
          feature: "普陀区",
          model: "上海市普陀区金沙江路 1516 弄",
          type: 200333,
          result: "成功",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    rowStyle() {
      return "text-align:center; background-color: #f5f7fa;";
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
//
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
</style>
