<template>
	<div class="first">

	<p>11111111111111111111111</p>
	<p>222222222222222</p>
	<p>3333333333333</p>
	<p>4444444444</p>
	<p>5555555555</p>
	<p>6666666666666</p>
	<p>7777777777</p>
	<p>88888888888</p>


	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'first',
		data() {
			return {
			}
		},
    components:{
    },
	computed: {
		...mapState("qyh",{
			allMarker:'allMarker'
		})
	},
    mounted() {
      console.log(this.allMarker);
    },
		methods:{

		}
	}
</script>

<style lang="less" scoped>
	.first{

	}
</style>
