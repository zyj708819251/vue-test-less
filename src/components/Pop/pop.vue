<template>
	<div class="pop">
		<div class="zyj-dialog-header"><div class="zyj-dialog-title" v-text="title">11</div></div>
		<div class="pop-body">
			<el-button @click="clickP">预览</el-button>
			<el-image-viewer
				v-if="showViewer"
				:on-close="
					() => {
						showViewer = false;
					}
				"
				:url-list="srcList"
			/>
			<el-button @click="close">预览</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'pop',
	data() {
		return {
			title: '',
			showViewer: false,
			srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg']
		};
	},
	components: {
		'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer')
	},
	props: {
		//本弹窗的id
		layerid: {
			type: String,
			default: ''
		},
		//父组件传值
		dialogData: {
			type: Object,
			default: {}
		}
	},
	mounted() {
		this.title = this.dialogData.a;
		console.log(this.layerid);
	},
	methods: {
		clickP() {
			// window.openPop(['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'])
			this.showViewer = true;
		},
		closePop() {
			this.$parent.closedialog();
		},
		close() {
			this.$layer.close(this.layerid);
		}
	},
	beforeDestroy() {}
};
</script>

<style scoped lang="less">
.pop {
	// width: 400px;
	// height: 600px;
	background: rgba(0, 0, 0, 0.6);
	color: #fff;
}
</style>
