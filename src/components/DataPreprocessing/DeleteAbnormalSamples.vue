<template>
  <el-popover
    placement="top"
    :title=name
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <div class="hf-button" slot="reference">{{ this.name }}</div>
  </el-popover>
</template>
  
<script>
import { Autocomplete } from "element-ui";
export default {
  data() {
    return {
      step: 2,
      id: 10,
      name: "删除异常样本",
      type: "DeleteAbnormalSample",
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
  created() {
    this.sendMyData();
  },
};
</script>
  
<style lang='less' scoped>
@height: 25px;
.hf-button {
  cursor: pointer;
  background-color: #d6edf7;
  font-size: 13px;
  color: black;
  border: none;
  // height与line-height相同时文字居中
  height: @height;
  line-height: @height;
  margin: auto;
  width: 120px;
}
</style>