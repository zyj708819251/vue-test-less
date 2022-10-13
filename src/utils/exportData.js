import XLSX from "xlsx";
console.log(XLSX);
let exportData = {
	/**
	 * 导出方法
	let filename = "xxx.xlsx";
	let mergeList = [
		{ s: { r: 1, c: 0 }, e: { r: 3, c: 0 } },
		{ s: { r: 1, c: 1 }, e: { r: 2, c: 1 } },
		{ s: { r: 3, c: 1 }, e: { r: 3, c: 3 } }
	];
	let colsList = [{ wch: 20 }, { wch: 30 }, { wch: 40 }, { wch: 50 }, { wch: 60 }];
	let dataList = [
		{ time: "2020-08-10", grade: "三年二班", name: "小明", subjects: "语文" },
		{ time: "2020-08-10", grade: "三年二班", name: "小明", subjects: "数学" },
		{ time: "2020-08-10", grade: "总成绩", name: "总成绩", subjects: "总成绩" }
	];
	let headArrs = [["时间", "姓名", "成绩", "科目"]];
	let keyArr = ["time", "name", "grade", "subjects"];
	exportData.exportExcelFront(filename, mergeList, colsList, dataList, headArrs,keyArr);
	 */
	exportExcelFront(filename, mergeList, colsList, dataList, headArrs, keyArrs) {
		var wb = XLSX.utils.book_new();
		var data = [...headArrs];
		dataList.forEach((v, i) => {
			var singleData = [];
			keyArrs.forEach((key, keyIndex) => {
				singleData.push(v[key])
			})
			data.push(singleData)
		})
		var ws_name = "Sheet1";
		var ws = XLSX.utils.aoa_to_sheet(data);
		ws['!merges'] = mergeList;
		ws['!cols'] = colsList;
		
		ws["A10"] = {
		        t: "s",
		        v: "人员名单",//单元格文字
		        // 自定义样式
		        s: {
		          font: {
		            name: "宋体",
		            sz: 40,
		            bold: true,
		            color: { rgb: "FFFFAA00" },
		          },
		          //设置更多样式可参考下图
		          alignment: {
		            horizontal: "center",
		            vertical: "center",
		          },
		          fill: { bgcolor: { rgb: "ffff00" } },
		        },
		      };
		
		XLSX.utils.book_append_sheet(wb, ws, ws_name); //将数据添加到工作薄
		XLSX.writeFile(wb, filename); //导出Excel
	}
}
export default exportData;
