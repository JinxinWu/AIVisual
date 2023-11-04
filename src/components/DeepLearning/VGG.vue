<template>
  <el-button type="primary">{{ this.name }}</el-button>
</template>
  
  <script>
import { Autocomplete } from "element-ui";
export default {
  data() {
    return {
      step: 5,
      id: 30,
      name: "VGG",
      type: "VGG",
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
  
  <style scoped>
.el-button {
  background-color: #d6edf7;
  font-size: 13px;
  color: black;
  border: none;
  height: 25px;
  line-height: 0;
  width: 100px;
}
</style>