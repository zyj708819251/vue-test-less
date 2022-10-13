<!--

 -->

<template>
    <el-select v-bind="$attrs" v-on="$listeners" :value="value" placeholder="请选择" >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>

<script>
export default {
  props: {
    value: [Number, String, Array],
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  mounted () {},
  watch: {},
  methods: {

  }
}
</script>
