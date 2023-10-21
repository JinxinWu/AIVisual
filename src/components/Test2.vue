<template>
  <div class="main">
    <div class="left">
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div class="components-title">输入型组件</div>
          <draggable class="components-draggable" :list="inputComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
            draggable=".components-item" :sort="false" @end="onEnd">
            <div v-for="(element, index) in inputComponents" :key="index" class="components-item"
              @click="addComponent(element)">
              <div class="components-body">
                {{ element.label }}
              </div>
            </div>
          </draggable>
          <div class="components-title">选择型组件</div>
          <draggable class="components-draggable" :list="selectComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
            draggable=".components-item" :sort="false" @end="onEnd">
            <div v-for="(element, index) in selectComponents" :key="index" class="components-item"
              @click="addComponent(element)">
              <div class="components-body">
                {{ element.label }}
              </div>
            </div>
          </draggable>
          <div class="components-title">布局型组件</div>
          <draggable class="components-draggable" :list="layoutComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
            draggable=".components-item" :sort="false" @end="onEnd">
            <div v-for="(element, index) in layoutComponents" :key="index" class="components-item"
              @click="addComponent(element)">
              <div class="components-body">
                {{ element.label }}
              </div>
            </div>
          </draggable>
        </div>
      </el-scrollbar>
    </div>
    <div class="center">
      <div class="options">
        <span @click="download">导出文件</span>
        <span @click="copy">复制代码</span>
        <span @click="empty">清空</span>
      </div>
      <div class="centerMain">
        <el-scrollbar class="center-scrollbar">
          <el-row class="center-board-row" :gutter="formConf.gutter">
            <el-form :size="formConf.size" :label-position="formConf.labelPosition" :disabled="formConf.disabled"
              :label-width="formConf.labelWidth + 'px'">
              <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
                <draggable-item v-for="(element, index) in drawingList" :key="element.renderKey"
                  :drawing-list="drawingList" :element="element" :index="index" :active-id="activeId"
                  :form-conf="formConf" @activeItem="activeFormItem" @copyItem="drawingItemCopy"
                  @deleteItem="drawingItemDelete" />
              </draggable>
              <div v-show="!drawingList.length" class="empty-info">
                从左侧拖入或点选组件进行表单设计
              </div>
            </el-form>
          </el-row>
        </el-scrollbar>
      </div>
    </div>
    <div class="right">
      <right-panel :active-data="activeData" :form-conf="formConf" :show-field="!!drawingList.length"
        @tag-change="tagChange" />
    </div>
    <code-type-dialog :visible.sync="dialogVisible" title="选择生成类型" :show-file-name="showFileName" @confirm="generate" />
    <input id="copyNode" type="hidden">
  </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import draggable from "vuedraggable";
import beautifier from 'js-beautify'
import saveAs from "file-saver"
import DraggableItem from "./DraggableItem.vue";
import RightPanel from "./RightPanel.vue"
import CodeTypeDialog from "./CodeTypeDialog"
import { beautifierConf } from './generator/index'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from './generator/html.js'
import { makeUpJs } from './generator/js.js'
import { makeUpCss } from './generator/css.js'
import {
  inputComponents,
  selectComponents,
  layoutComponents,
  formConf,
  drawingList,
} from "./generator/config";
let oldActiveId;
let tempActiveData;
export default {
  components: {
    draggable,
    DraggableItem,
    RightPanel,
    CodeTypeDialog
  },
  data() {
    return {
      idGlobal: 100,
      inputComponents,
      selectComponents,
      layoutComponents,
      formConf,
      drawingList,
      activeId: drawingList[0].formId,
      activeData: drawingList[0],
      dialogVisible: false,
      showFileName: false,
      generateConf: null,

      labelWidth: 100,
      drawingData: {},
      drawerVisible: false,
      formData: {},
    };
  },
  methods: {
    activeFormItem(element) {
      this.activeData = element;
      this.activeId = element.formId;
    },
    onEnd(obj, a) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData;
        this.activeId = this.idGlobal;
      }
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1);
      this.$nextTick(() => {
        const len = this.drawingList.length;
        if (len) {
          this.activeFormItem(this.drawingList[len - 1]);
        }
      });
    },
    addComponent(item) {
      const clone = this.cloneComponent(item);
      console.log(clone, 88)
      this.drawingList.push(clone);
      this.activeFormItem(clone);
    },
    drawingItemCopy(item, parent) {
      let clone = JSON.parse(JSON.stringify(item));
      clone = this.createIdAndKey(clone);
      parent.push(clone);
      this.activeFormItem(clone);
    },
    createIdAndKey(item) {
      item.formId = ++this.idGlobal;
      item.renderKey = +new Date();
      if (item.layout === "colFormItem") {
        item.vModel = `field${this.idGlobal}`;
      } else if (item.layout === "rowFormItem") {
        item.componentName = `row${this.idGlobal}`;
      }
      if (Array.isArray(item.children)) {
        item.children = item.children.map((childItem) =>
          this.createIdAndKey(childItem)
        );
      }
      return item;
    },
    cloneComponent(origin) {
      console.log(origin);
      const clone = JSON.parse(JSON.stringify(origin));
      clone.formId = ++this.idGlobal;
      clone.span = formConf.span;
      clone.renderKey = +new Date(); // 改变renderKey后可以实现强制更新组件
      if (!clone.layout) clone.layout = "colFormItem";
      if (clone.layout === "colFormItem") {
        clone.vModel = `field${this.idGlobal}`;
        clone.placeholder !== undefined && (clone.placeholder += clone.label);
        tempActiveData = clone;
      } else if (clone.layout === "rowFormItem") {
        delete clone.label;
        clone.componentName = `row${this.idGlobal}`;
        clone.gutter = this.formConf.gutter;
        tempActiveData = clone;
      }
      return tempActiveData;
    },
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          this.drawingList = []
        }
      )
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      newTag.vModel = this.activeData.vModel
      newTag.formId = this.activeId
      newTag.span = this.activeData.span
      delete this.activeData.tag
      delete this.activeData.tagIcon
      delete this.activeData.document
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined
          && typeof this.activeData[key] === typeof newTag[key]) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach(item => {
          if (Array.isArray(item.children)) this.updateDrawingList(newTag, item.children)
        })
      }
    },
    AssembleFormData() {
      this.formData = {
        fields: JSON.parse(JSON.stringify(this.drawingList)),
        ...this.formConf
      }
    },
    generateCode() {
      const { type } = this.generateConf
      this.AssembleFormData()
      const script = vueScript(makeUpJs(this.formData, type))
      const html = vueTemplate(makeUpHtml(this.formData, type))
      const css = cssStyle(makeUpCss(this.formData))
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    execDownload(data) {
      const codeStr = this.generateCode()
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, data.fileName)
    },
    execCopy(data) {
      document.getElementById('copyNode').click()
    },
    download() {
      this.dialogVisible = true
      this.showFileName = true
      this.operationType = 'download'
    },
    copy() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'copy'
    },
    generate(data) {
      const func = this[`exec${this.titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    titleCase(str) {
      return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
    }
  },
  mounted() {
    const clipboard = new ClipboardJS('#copyNode', {
      text: trigger => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  }
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

$selectedColor: #f6f7ff;
$lighterBlue: #409EFF;

.main {
  display: flex;

  .left {
    border: 1px solid #ccc;
    width: 20%;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;

    .components-title {
      margin-bottom: 20px;
    }

    .components-draggable {
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      .components-item {
        width: 48%;
        margin: 2% 1%;

        .components-body {
          background: #f6f7ff;
          line-height: 40px;
          font-size: 14px;
          cursor: move;

          &:hover {
            border: 1px dashed #787be8;
            color: #787be8;
          }
        }
      }
    }
  }

  .center {
    width: 56%;
    margin: 0 2%;
    border: 1px solid #ccc;
    box-sizing: border-box;

    .options {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 10px;

      span {
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .centerMain {
      overflow-x: auto;
      height: calc(100vh - 42px);

      .center-scrollbar {
        height: calc(100vh - 42px);
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;

        .empty-info {
          text-align: center;
          // line-height: calc(100vh - 100px);
        }
      }
    }

    .drawing-item,
    .drawing-row-item {
      &:hover {
        &>.el-form-item {
          background: $selectedColor;
          border-radius: 6px;
        }

        &>.drawing-item-copy,
        &>.drawing-item-delete {
          display: initial;
        }
      }

      &>.drawing-item-copy,
      &>.drawing-item-delete {
        display: none;
        position: absolute;
        top: -10px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        border: 1px solid;
        cursor: pointer;
        z-index: 1;
      }

      &>.drawing-item-copy {
        right: 56px;
        border-color: $lighterBlue;
        color: $lighterBlue;
        background: #fff;

        &:hover {
          background: $lighterBlue;
          color: #fff;
        }
      }

      &>.drawing-item-delete {
        right: 24px;
        border-color: #f56c6c;
        color: #f56c6c;
        background: #fff;

        &:hover {
          background: #f56c6c;
          color: #fff;
        }
      }
    }
  }

  .right {
    width: 20%;
  }

  .center-board-row {
    padding: 12px 12px 15px 12px;
    box-sizing: border-box;

    &>.el-form {
      // 69 = 12+15+42
      height: calc(100vh - 69px);
    }
  }

  .drawing-board {
    height: calc(100vh - 69px);
    position: relative;

    .components-body {
      padding: 0;
      margin: 0;
      font-size: 0;
    }

    .sortable-ghost {
      position: relative;
      display: block;
      overflow: hidden;

      &::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 3px;
        background: rgb(89, 89, 223);
        z-index: 2;
      }
    }

    .components-item.sortable-ghost {
      width: 100%;
      height: 60px;
      background-color: $selectedColor;
    }

    .active-from-item {
      &>.el-form-item {
        background: $selectedColor;
        border-radius: 6px;
      }

      &>.drawing-item-copy,
      &>.drawing-item-delete {
        display: initial;
      }

      &>.component-name {
        color: $lighterBlue;
      }
    }

    .el-form-item {
      margin-bottom: 15px;
    }
  }

  .drawing-item {
    position: relative;
    cursor: move;

    &.unfocus-bordered:not(.activeFromItem)>div:first-child {
      border: 1px dashed #ccc;
    }

    .el-form-item {
      padding: 12px 10px;
    }
  }

  .drawing-row-item {
    position: relative;
    cursor: move;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    border-radius: 3px;
    padding: 0 2px;
    margin-bottom: 15px;

    .drawing-row-item {
      margin-bottom: 2px;
    }

    .el-col {
      margin-top: 22px;
    }

    .el-form-item {
      margin-bottom: 0;
    }

    .drag-wrapper {
      min-height: 80px;
    }

    &.active-from-item {
      border: 1px dashed $lighterBlue;
    }

    .component-name {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 12px;
      color: #bbb;
      display: inline-block;
      padding: 0 6px;
    }
  }

  .drawing-item,
  .drawing-row-item {
    &:hover {
      &>.el-form-item {
        background: $selectedColor;
        border-radius: 6px;
      }

      &>.drawing-item-copy,
      &>.drawing-item-delete {
        display: initial;
      }
    }

    &>.drawing-item-copy,
    &>.drawing-item-delete {
      display: none;
      position: absolute;
      top: -10px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
      border: 1px solid;
      cursor: pointer;
      z-index: 1;
    }

    &>.drawing-item-copy {
      right: 56px;
      border-color: $lighterBlue;
      color: $lighterBlue;
      background: #fff;

      &:hover {
        background: $lighterBlue;
        color: #fff;
      }
    }

    &>.drawing-item-delete {
      right: 24px;
      border-color: #F56C6C;
      color: #F56C6C;
      background: #fff;

      &:hover {
        background: #F56C6C;
        color: #fff;
      }
    }
  }
}
</style>