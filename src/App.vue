<template>
  <div id="app"><router-view /></div>
</template>
<script>
import api from '@api/api';
import hello from '@com/Pop/pop';
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
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
    api.getListAPI().then(res => {
      console.log(res);
    });
  },
  methods: {},
  watch: {
    $route(to, from, next) {}
  }
};
</script>
<style lang="less" scoped>
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
