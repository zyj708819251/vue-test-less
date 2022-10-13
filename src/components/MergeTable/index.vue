<!-- 
<merge-table v-if="tableData.length > 0" :table-data="tableData" :col-configs="colConfigs" :merge-columns="mergeColumns" />
 
 import MergeTable from "@com/MergeTable";
 
 components: {
 	MergeTable
 },
 
 tableData: [
 	{ time: "2020-08-10", grade: "三年二班", name: "小明", subjects: "语文" },
 	{ time: "2020-08-10", grade: "三年二班", name: "小明", subjects: "数学" },
 	{ time: "2020-08-10", grade: "总成绩", name: "总成绩", subjects: "总成绩" },
 	{ time: "2020-08-10", grade: "三年一班", name: "小雷", subjects: "语文" },
 	{ time: "2020-08-10", grade: "三年一班", name: "小雷", subjects: "数学" },
 	{ time: "2020-08-10", grade: "总成绩", name: "总成绩", subjects: "总成绩" },
 	{ time: "2020-08-11", grade: "三年三班", name: "小花", subjects: "语文" },
 	{ time: "2020-08-11", grade: "三年三班", name: "小花", subjects: "数学" },
 	{ time: "2020-08-11", grade: "总成绩", name: "总成绩", subjects: "总成绩" }
 ],
 colConfigs: [
 	{
 		label: "考试信息",
 		align: "center",
 		type: "label",
 		children: [
 			{ prop: "time", label: "考试时间", align: "center" },
 			{ prop: "grade", label: "所在班级", align: "center" },
 			{ prop: "name", label: "考生姓名", align: "center" },
 			{ prop: "subjects", label: "考试科目", align: "center" }
 		]
 	}
 ],
 mergeColumns: [{ index: 0, name: "time" }, { index: 1, name: "grade" }, { index: 2, name: "name" }, { index: 3, name: "subjects" }]
 
 -->


<template>
	<el-table ref="table" :data="tableData" border style="width: 100%;"  :span-method="mergeCols">
		<!-- 列表公共列 -->
		<template v-for="colConfig in customColConfigs">
			<!--无需合并的列信息-->
			<el-table-column
				v-if="!colConfig.children"
				:key="colConfig.prop"
				:prop="colConfig.prop"
				:align="colConfig.align"
				:label="colConfig.label"
				:min-width="colConfig.width"
				:formatter="colConfig.formatter"
				:show-overflow-tooltip="colConfig.showOverflowTooltip"
			/>
			<!--需合并的列信息-->
			<el-table-column v-else-if="colConfig.children" :key="colConfig.label" :align="colConfig.align" :label="colConfig.label" :min-width="colConfig.width">
				<template v-for="children in colConfig.children">
					<el-table-column
						:key="children.prop"
						:prop="children.prop"
						:align="children.align"
						:label="children.label"
						:min-width="children.width"
						:show-overflow-tooltip="children.showOverflowTooltip"
					/>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<script>
export default {
	props: {
		tableData: {
			type: Array,
			required: true
		},
		colConfigs: {
			required: true,
			type: Array
		},
		showSelection: {
			type: Boolean,
			default: true
		},
		mergeColumns: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			customColConfigs: {},
			tableMergeData: []
		};
	},
	mounted() {
		this.customColConfigs = this.colConfigs;
		
	},
	watch:{
		tableData:{
		      handler(newValue, oldValue) {
		       this.generateTableMergeData();
		      },
		      immediate: true
		      // deep: true
		}
	},
	methods: {
		/**
		 * element表格合并方法
		 * @param rowIndex 行坐标
		 * @param columnIndex 列坐标
		 * @returns {*} 单元格坐标信息
		 */
		mergeCols({ rowIndex, columnIndex }) {
			const key = columnIndex + "_" + rowIndex;
			if (this.tableMergeData[key]) {
				return this.tableMergeData[key];
			}
		},
		/**
		 * 生成合并表格信息
		 */
		generateTableMergeData() {
			// 遍历表格中需要合并的所有单元格
			for (let i = 0; i < this.tableData.length; i++) {
				for (let j = 0; j < this.mergeColumns.length; j++) {
					// 初始化行、列坐标信息
					let rowIndex = 1;
					let columnIndex = 1;
					// 比较横坐标左方的第一个元素
					if (j > 0 && this.tableData[i][this.mergeColumns[j]["name"]] === this.tableData[i][this.mergeColumns[j - 1]["name"]]) {
						columnIndex = 0;
					}
					// 比较纵坐标上方的第一个元素
					if (i > 0 && this.tableData[i][this.mergeColumns[j]["name"]] === this.tableData[i - 1][this.mergeColumns[j]["name"]]) {
						rowIndex = 0;
					}
					// 比较横坐标右方元素
					if (columnIndex > 0) {
						columnIndex = this.calculateColumnIndex(this.tableData[i], j, j + 1, 1, this.mergeColumns.length);
					}
					// 比较纵坐标下方元素
					if (rowIndex > 0) {
						rowIndex = this.calculateRowIndex(this.tableData, i, i + 1, 1, this.mergeColumns[j]["name"]);
					}
					const key = this.mergeColumns[j]["index"] + "_" + i;
					this.tableMergeData[key] = [rowIndex, columnIndex];
				}
			}
		},
		/**
		 * 计算列坐标信息
		 * @param data 单元格所在行数据
		 * @param index 当前下标
		 * @param nextIndex 下一个元素坐标
		 * @param count 相同内容的数量
		 * @param maxLength 当前行的列总数
		 * @returns {*}
		 */
		calculateColumnIndex(data, index, nextIndex, count, maxLength) {
			// 比较当前单元格中的数据与同一行之后的单元格是否相同
			if (nextIndex < maxLength && data[this.mergeColumns[index]["name"]] === data[this.mergeColumns[nextIndex]["name"]]) {
				return this.calculateColumnIndex(data, index, ++nextIndex, ++count, maxLength);
			}
			return count;
		},
		/**
		 * 计算行坐标信息
		 * @param data 单元格所在行数据
		 * @param index 当前下标
		 * @param nextIndex 下一个元素坐标
		 * @param count 相同内容的数量
		 * @param name 数据的key
		 * @returns {*}
		 */
		calculateRowIndex(data, index, nextIndex, count, name) {
			// 比较当前单元格中的数据与同一列之后的单元格是否相同
			if (nextIndex < data.length && data[index][name] === data[nextIndex][name]) {
				return this.calculateRowIndex(data, index, ++nextIndex, ++count, name);
			}
			return count;
		}
	}
};
</script>

