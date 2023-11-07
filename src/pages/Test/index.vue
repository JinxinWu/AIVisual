<template>
  <el-popover placement="right" width="160" trigger="click" title="数据集划分">
    <div class="opts" v-for="option in options">{{ option.label }}</div>
    <div class="hf-button" slot="reference">数据集划分</div>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      options: [{
          value: '选项1',
          label: '随机取30%'
        }, {
          value: '选项2',
          label: '随机取30%'
        }, {
          value: '选项3',
          label: '随机取30%'
        }, {
          value: '选项4',
          label: '向前取30%'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
  },
};
</script>

<style scoped>
.hf-button {
  background-color: #458ecd;
  font-size: 13px;
  color: black;
  border: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 220px;
}

.opts {
  background-color: #a1cdf3;
  font-size: 13px;
  color: black;
  border: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: auto;
}

.opts:hover {
  background-color: #458ecd;
}
</style>