<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header/index.vue";
import axios from "axios";

export default {
  components: {
    Header,
  },
  data() {
    return {
      
    };
  },
  methods: {
    
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
