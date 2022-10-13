<template>
	<div class="myTable">
		<el-table border ref="table" height="100%" stripe :data="tableData" @row-click="clickCell">
			<el-table-column align="center" label="序号" width="50">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<template v-for="(column, columnIndex) in tableDialogField">
				<el-table-column :prop="column.prop" :label="column.label" align="center" :width="column.width"></el-table-column>
			</template>
			<el-table-column fixed="right" align="center" label="操作">
				<template slot-scope="scope">
					<slot ></slot>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "myTable",
	data() {
		return {
			tableData: [
				{
					f_type: 1,
					f_num: 2
				},
				{
					f_type: 1,
					f_num: 2
				},
				{
					f_type: 1,
					f_num: 2
				},
				{
					f_type: 1,
					f_num: 2
				}
			],
			tableDialogField: [
				{
					label: "操作类型",
					prop: "f_type"
				},
				{
					label: "操作数量",
					prop: "f_num"
				}
			]
		};
	},
	components: {},
	computed: {},
	mounted() {},
	methods: {
		clickCell(row){
			console.log('子组件');
		}
	}
};
</script>

<style lang="less" scoped></style>
