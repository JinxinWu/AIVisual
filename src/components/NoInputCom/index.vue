<template>
  <el-popover
    placement="top"
    :title=name
    width="200"
    trigger="hover"
    :content=content
  >
    <div v-if="step !== 7 " class="hf-button" slot="reference" style="width: 120px;">{{ this.name }}</div>
    <div v-else class="hf-button" slot="reference" style="width: 100px;">{{ this.name }}</div>
  </el-popover>
</template>
  
<script>
import { Autocomplete } from "element-ui";
export default {
  name: "NoInputCom",
  data() {
    return {
      step: this.comData.step,
      id: this.comData.id,
      name: this.comData.name,
      type: this.comData.type,
      content: this.comData.content,
      width: 100,
      height: 60,
      x: 0,
      y: 0,
      data: "",
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
  },
  props: ['comData'],
  created() {
    this.sendMyData();
  },
};
</script>
  
<style lang='less' scoped>
@height: 25px;
.hf-button {
  margin: 2.5px 5px;
  // 圆角
  border-radius:6px;
  // 小手形状
  cursor: pointer;
  background-color: #d6edf7;
  font-size: 13px;
  color: black;
  border: none;
  // height与line-height相同时文字居中
  height: @height;
  line-height: @height;
  // 行内块
  display: inline-block;
}
</style>