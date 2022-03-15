<template>
  <!--
    打开
    this.$zyjdialog.openPop({
      content: hello,
      id: 'hello',
      right: 200,
      top: 200,
      options: {
        closeCallback: this.close
      },
      isPostion: true,
      dialogData: {
        a: 111,
        b: 222
      }
    });
    关闭
    this.$zyjdialog.closePop('hello');
	 -->
  <div
    class="zyj-dialog zyj-drag"
    v-if="zyjDialogFlag"
    data-name="zyj-dialog"
   v-bind:style="showStyle()"
    :id="'zyj-dialog-' + id"
    v-bind:ref="'zyj-dialog-' + id"
    :class="isPostion?'active':''"
  >
    <component :is="content" :dialogData="dialogData"></component>
  </div>
</template>
<script>
import utils from '@utils/utils.js'
export default {
  name: 'zyj-dialog',
  data() {
    return {
      zyjDialogFlag: false,
      id: 'zyj-dialog', //层级
      top: null, //位置;x
      left: null, //位置：y
      right: null,
      bottom: null,
      content: null, //弹出框内容
      fullScreen: false, //是否全屏
      zIndex: 3, //显示层级
      options: {},
      dialogData: {},
      isPostion:false
    };
  },
  methods: {
    showStyle(){
        return {
          top: this.top!=null ? utils.transformFontSize(this.top) : 'initial',
          left: this.left!=null ? utils.transformFontSize(this.left) : 'initial',
          right: this.right!=null ? utils.transformFontSize(this.right) : 'initial',
          bottom: this.bottom!=null ? utils.transformFontSize(this.bottom) : 'initial',
          zIndex: this.zIndex
        }
    },
    closedialog(e) {
      if (this.options && typeof this.options.closeCallback == 'function') {
        this.options.closeCallback();
      }
      this.zyjDialogFlag = false;
    }
  }
};
</script>
<style lang="less" scoped>
/* 弹出框 */
.zyj-dialog {
   display: inline-flex;
  &.active{
    position: absolute;
  }

  .pop-body{
	  overflow: hidden;
  }
}
</style>
