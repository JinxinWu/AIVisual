<template>
  <router-view></router-view>
</template>

<script>
import Header from "@/components/Header/index.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="less">
.el-main {
  content: "";
  display: inline-block;
  // position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  z-index: 1;
  background: url(//aistudio-fe-online.cdn.bcebos.com/aistudio/dist/1700195597809/images/application/center/page-bg-right.png)
      no-repeat,
    url(//aistudio-fe-online.cdn.bcebos.com/aistudio/dist/1700195597809/images/common/page-bg-left.png)
      no-repeat;
  background-size: 1080px 420px, 800px 1050px;
  background-position: top -60px right -372px, top -60px left;
}

.el-main::-webkit-scrollbar {
  width: 0;
}
</style>
