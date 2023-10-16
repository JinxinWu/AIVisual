<template>
  <div>
    <el-popover v-for="method in methods" :key="method.id" placement="top-start" :title=method.name width="400"
      trigger="hover" :content=method.content>
      <el-button slot="reference">{{ method.name }}</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'Method',
  data: function () {
    return {
      methods: [
        { id: 1, name: '数据归一化', content: 'shujuguiyihua' },
        { id: 2, name: '数据标准化', content: 'shujubiaozhunhua' },
        { id: 3, name: '数据离散化', content: 'shujulisanhua' },
        { id: 4, name: 'onehot编码', content: 'onehotbianma' },
        { id: 5, name: 'label编码', content: 'labelbianma' },
        { id: 6, name: '描述性统计', content: 'miaoshuxingtongji' },
        { id: 7, name: '词向量转化', content: 'cixiangliangzhuanhua' },
        { id: 8, name: '相似度计算', content: 'xiangsidujisuan' },
        { id: 9, name: '图像增强', content: 'tuxiangzengqiang' },
      ],
      params: ''
    }
  },
}
</script>

<style lang="less" scoped>
.el-popover__reference {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>