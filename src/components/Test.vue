<template>
  <div id="app">
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <div class="title">拖拽到B组试试看,小于4个元素不允许拖拽</div>
        <draggable
          v-model="arr1"
          :group="groupA"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
        >
          <transition-group :style="style">
            <div class="item" v-for="item in arr1" :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <div class="title">B组（本组是个空数组）</div>
        <draggable
          v-model="arr2"
          :group="groupB"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
        >
          <transition-group :style="style">
            <div class="item" v-for="item in arr2" :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div style="display: block">{{ message }}</div>
  </div>
</template>
<script>
//导入draggable组件
import draggable from "vuedraggable";
export default {
  //注册draggable组件
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      message: "",
      groupA: {
        name: "itxst",
        put: true, //可以拖入
        pull: () => {
          if (this.arr1.length <= 3) {
            this.message = "元素小于等于3不允许再拖拽了";
          }
          return this.arr1.length > 3;
        },
      },
      groupB: {
        name: "itxst",
        pull: "clone", //B组拖拽时克隆到A组
        put: true,
      },
      //定义要被拖拽对象的数组
      arr1: [
        { id: 1, name: "www.itxst.com" },
        { id: 2, name: "www.jd.com" },
        { id: 3, name: "www.baidu.com" },
        { id: 4, name: "www.taobao.com" },
      ],
      arr2: [], //空数组
      arr3: [], //空数组
      //空数组之在的样式，设置了这个样式才能拖入
      style: "min-height:120px;display: block;",
    };
  },
  mounted() {},
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
      return true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
  },
};
</script>
<style scoped>
/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: blue !important;
}
.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.itxst {
  margin: 10px;
  min-height: 200px;
}
.title {
  padding: 6px 12px;
}
.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col + .col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}
.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}
</style>