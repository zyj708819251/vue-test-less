<template>
	<div class="pop">
		<div class="zyj-dialog-header" v-zyjdrag>
			<div class="zyj-dialog-title" v-text="title">11</div>
			<div class="zyj-dialog-close" @click="closePop">X</div>
		</div>
		<div class="pop-body">
			<el-button @click="clickP">预览</el-button>
			<el-image-viewer
				v-if="showViewer"
				:on-close="() => {showViewer = false;}"
				:url-list="srcList"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'pop',
	data() {
		return {
			title:'',
			showViewer: false,
			srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg']
		};
	},
	components: {
		'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer')
	},
	props: {
		dialogData: {}
	},
	mounted() {
		this.title=this.dialogData.id
	},
	methods: {
		clickP(){
			window.openPop(['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'])
		},
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
	background: rgba(255, 0, 0, 0.6);
	color: #fff;
}
</style>
