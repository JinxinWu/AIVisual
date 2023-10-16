<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="数据导入">
        <Method></Method>
      </el-tab-pane>
      <el-tab-pane label="数据预处理">
        <Method></Method>
      </el-tab-pane>
      <el-tab-pane label="特征工程">
        <Method></Method>
      </el-tab-pane>
      <el-tab-pane label="模型选择">
        <Method></Method>
      </el-tab-pane>
      <el-tab-pane label="模型评估">
        <Method></Method>
      </el-tab-pane>
      <el-tab-pane label="模型评估">
        <Method></Method>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Method from './Method'

export default {
  name: 'Step',
  components: {
    Method
  },
}
</script>

<style lang="less"></style>