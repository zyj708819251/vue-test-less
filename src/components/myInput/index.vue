<!--

 -->

<template>
    <el-input v-bind="$attrs" v-on="$listeners" :value="value"></el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
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
