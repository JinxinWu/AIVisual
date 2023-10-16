<template>
  <div class="fluid container">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">组件拖拽实例</h3>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <label><input type="checkbox" v-model="editable" />设置组件可拖拽</label>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <draggable class="list-group" tag="ul" :list="this.list" v-bind="dragOptions" :move="onMove"
        @start="isDragging = true" @end="isDragging = false">
        <div class="list-group-item" v-for="(item, index) in this.list" :key="item.value">
          <span class="badge">{{ index }}</span>
          <span class="lefttitle">
            {{ item.name }}
          </span>
        </div>
      </draggable>
    </div>

    <div class="list-group col-md-3">
      <pre>{{ listString }}</pre>
    </div>
  </div>
</template>
 
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        {
          name: "-姓名",
          value: "name",
        },
        {
          name: "-性别",
          value: "sex",
        },
        {
          name: "-年龄",
          value: "age",
        },
        {
          name: "-地址",
          value: "address",
        },
        {
          name: "-邮箱",
          value: "mailbox",
        },
      ],
      list2: [],
      editable: true, //决定是否可拖动，为false则组件不可拖动
      isDragging: false,
      delayedDragging: false,
    };
  },
  methods: {

    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost",
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
};
</script>
 
<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>