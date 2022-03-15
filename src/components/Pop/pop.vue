<template>
  <div class="pop"> 
   <div class="zyj-dialog-header" v-zyjdrag>
      <div class="zyj-dialog-title">11</div>
      <div class="zyj-dialog-close" @click="closePop">X</div> 
   </div>
   <div class="pop-body">{{ dialogData.a }}</div>
  </div>
</template>

<script>
export default {
  name: 'pop',
  data() {
    return {};
  },
  props: {
    dialogData: {}
  },
  components: {},
  mounted() {
    // console.log(JSON.parse(this.dialogData))
  },
  methods: {
    closePop() {
      this.$parent.closedialog();
    }
  },
  beforeDestroy() {}
};
</script>

<style scoped lang="less">
.pop {
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.6);
}
</style>
