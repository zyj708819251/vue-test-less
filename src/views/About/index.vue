<template>
	<div>
		
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
	name: '',
	data() {
		return {
			value: 1,
			a: 0,
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg']
		};
	},
	components: {},
	computed: {
		...mapState('qyh', ['allMarker']),
		...mapGetters('qyh', ['changeMarker'])
	},
	mounted() {},
	methods: {
		...mapMutations('qyh', ['delMarker1']),
		...mapActions('qyh', ['addAction']),
		addSate(type) {
			this.addAction(type);
		},
		changeValue(type) {
			this.delMarker1(type);
		}
	}
};
</script>

<style lang="less" scoped>
div {
	width: 500px;
	height: 500px;

	color: #fff;
}
</style>
