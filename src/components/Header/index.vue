<template>
  <div>
    <el-col :span="4" :offset="2">
      <div class="grid-content bg-purple">logo</div>
    </el-col>
    <el-col :span="10" :offset="8">
      <div class="grid-content bg-purple">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="/login">登录/个人信息</el-menu-item>
          <el-menu-item index="/train">数据训练</el-menu-item>
          <el-menu-item index="/test">数据预测</el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </div>
</template>
9
<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>

</style>