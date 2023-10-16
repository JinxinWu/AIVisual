<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据导入</span>
          </div>
          <el-popover placement="top" width="160" v-model="visible">
            <p>确定删除此组件吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button slot="reference">数据归一化</el-button>
          </el-popover>
          <div class="text item">
            推荐使用数据导入组件，支持多种数据格式，包括csv、excel、txt、json等
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ margin: '93.2px 0' }">
          <i class="el-icon-right"></i>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TrainTree',
  data() {
    return {
      visible: false,
    };
  }
}
</script>

<style lang="less" scoped>
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