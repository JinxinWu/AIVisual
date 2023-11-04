<template>
  <el-button type="primary">{{ this.name }}</el-button>
</template>
  
  <script>
import { Autocomplete } from "element-ui";
export default {
  data() {
    return {
      step: 2,
      id: 9,
      name: "数据集划分",
      type:"DatasetPartitioning",
      width: 100,
      height: 25,
      x: 0,
      y: 0,
      data:'',
    };
  },
  methods: {
    //将信息传给父组件
    sendMyData() {
      const myDate = {
        step:this.step,
        id: this.id,
        name: this.name,
        type:this.type,
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
  background-color: #458ecd;
  font-size: 13px;
  color: black;
  border: none;
  height:25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width:220px;
}
</style>