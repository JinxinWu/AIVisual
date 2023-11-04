<template>
  <el-popover placement="right" width="160" trigger="click" :title="name">
    <div
      v-for="option in options"
      :class="option.value === value ? 'opts-click' : 'opts'"
      @click="chooseOpt(option.value)"
    >
      {{ option.label }}
    </div>
    <div class="hf-button" slot="reference">{{ this.name }}</div>
  </el-popover>
</template>
  
<script>
import { Autocomplete } from "element-ui";
export default {
  data() {
    return {
      step: 2,
      id: 9,
      name: "数据集划分",
      type: "DatasetPartitioning",
      width: 100,
      height: 25,
      x: 0,
      y: 0,
      value: 0, // 传递option的value
      options: [
        {
          value: 0,
          label: "随机取30%",
        },
        {
          value: 1,
          label: "随机取50%",
        },
        {
          value: 2,
          label: "随机取70%",
        },
        {
          value: 3,
          label: "前向取30%",
        },
        {
          value: 4,
          label: "前向取50%",
        },
        {
          value: 5,
          label: "前向取70%",
        },
        {
          value: 6,
          label: "后向取30%",
        },
        {
          value: 7,
          label: "后向取50%",
        },
        {
          value: 8,
          label: "后向取70%",
        },
      ],
    };
  },
  methods: {
    //将信息传给父组件
    sendMyData() {
      const myDate = {
        step: this.step,
        id: this.id,
        name: this.name,
        type: this.type,
        x: this.x,
        y: this.y,
        height: this.height,
        width: this.width,
      };
      this.$emit("customEvent", myDate);
    },
    // 选择option，传递value
    chooseOpt(value) {
      this.value = value;
    },
  },
  created() {
    // 初始数据
    this.sendMyData();
  },
};
</script>
  
<style lang='less' scoped>
// popover的title内文字居中
.el-popover__title {
  text-align: center;
}
// 小组件div的样式
.hf-button {
  cursor: pointer; // 小手图标
  background-color: #409EFF;
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
// popover出来内容的样式
.opts {
  cursor: pointer;
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
// hover时的样式
.opts:hover {
  background-color: #458ecd;
}
// 被点击后的样式
.opts-click {
  cursor: pointer;
  background-color: #458ecd;
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
</style>