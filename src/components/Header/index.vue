<template>
  <el-row>
    <el-col :span="8">
      <div class="logo">灵智启业</div>
    </el-col>

    <el-col :span="16" style="padding-left: 240px">
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409EFF"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/train">数据训练</el-menu-item>
          <el-submenu index="/">
            <template slot="title">日志</template>
            <el-menu-item index="/modellog">模型日志</el-menu-item>
            <el-menu-item index="/applylog">应用日志</el-menu-item>
          </el-submenu>
          <el-menu-item index="/predict">模型应用</el-menu-item>
          <el-menu-item index="/chat">智聊自助</el-menu-item>
          <el-menu-item index="/login">登录/个人信息</el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  background-color: #fff;
  &:last-child {
    margin-bottom: 0;
  }
}
//第一个el-col的样式
.el-row .el-col:first-child {
  background-color: #004088;
  border-radius: 20px 0 0 0;
}

//logo盒子的样式
.logo {
  width: auto;
  height: auto;
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin-left: 25%;
  font-family: "Microsoft YaHei", sans-serif;
}

//菜单样式
//定位
.menu {
  margin-right: 100px;
}
.el-menu-demo {
  font-size: 18px !important;
}
//去除默认下边线
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
//菜单内容样式
.el-menu-demo .el-menu-item {
  margin-right: 10px;
  color: black;
  font-size: 16px !important;
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
  border-radius: 10px;
}
.el-menu-demo .el-menu-item:hover {
  font-weight: 600;
  color: white !important;
  background-color: #004088 !important;
  border-radius: 10px;
}

/deep/.el-menu--horizontal>.el-submenu .el-submenu__title {
  margin-right: 10px;
  color: black;
  font-size: 16px !important;
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
  border-radius: 10px;
}

/deep/.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  font-weight: 600;
  color: white !important;
  background-color: #004088 !important;
  border-radius: 10px;
}
</style>