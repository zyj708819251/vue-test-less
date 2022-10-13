<template>
    <div class="first">
        <div class="test-5">
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
            打回电话很大很大很大
        </div>
      <p class="p">ashhjahjshajshahahjhasjhjahsadjdhjh </p>
        <el-button type="primary" id="full_screen" @click="exportData()">导出</el-button>
        <!-- <merge-table id="table" v-if="tableData.length > 0" :table-data="tableData" :col-configs="colConfigs" :merge-columns="mergeColumns" /> -->
        <myInput v-model="inputValue" clearable placeholder="请输入姓名"></myInput>
        <mySelect v-model="selectValue" clearable placeholder="请xuanze" :options="options"  multiple ></mySelect>
        <el-cascader
            :show-all-levels="false"
            v-model="stationName"
            filterable
            placeholder="请选择站场名称"
            :options="stationData"
            :props="cascaderProps"
            clearable
             :append-to-body="true"
        ></el-cascader>
        
        <button id="map_container" @click="newDialogVisible=true">点击</button>
        <el-dialog class="lc" top="0vh" width="50%"  :title="newDialogTitle" :visible.sync="newDialogVisible" :lock-scroll="false" :close-on-click-modal="false" :append-to-body="true">
                   <template v-if="newDialogVisible">
                     <zrz :visible.sync="newDialogVisible" :dialogData="newDialogData" :type="type" :isEdit="isEdit"  @closeDialog="closeNewDialog"></zrz>
                   </template>
               </el-dialog>
        
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import screenfull from "screenfull"; // 引入全屏显示
import XLSX from 'xlsx'
import XLSXS from 'xlsx-style'
import MergeTable from '@com/MergeTable'
import myInput from '@com/myInput'
import mySelect from '@com/mySelect'
import { mapState, mapMutations } from 'vuex'
import exportData from '@utils/exportData.js'
import zrz from '@com/xscyx/components/zrz==.vue'
export default {
  name: 'first',
  components: {
    MergeTable,
    mySelect,
    myInput,
    zrz
  },
  watch: {
    inputValue (val) {
      console.log(val)
    },
    selectValue (val) {
      console.log(val)
    }
  },
  data () {
    return {
        newDialogTitle:'111',
      newDialogVisible:false,
      newDialogData:{age:1},
      type:'zrz',
      isEdit:true,
        stationName:'',
        stationData:[{"id":207,"label":"生产运行部（科技信息部）"},{"id":101,"label":"济南输气管理处","children":[{"id":103,"label":"长清输气站"},{"id":105,"label":"泰安输气站"},{"id":214,"label":"曲阜输气站"},{"id":224,"label":"兖州输气站"},{"id":225,"label":"济宁输气站"},{"id":226,"label":"济南输气站"},{"id":227,"label":"章丘东输气站"},{"id":286,"label":"齐河输气站"},{"id":287,"label":"济南东输气站"},{"id":288,"label":"章丘电厂站"},{"id":229,"label":"马山输气站"},{"id":664,"label":"绿金输气站"},{"id":666,"label":"齐河阀室"},{"id":667,"label":"贾市阀室"},{"id":668,"label":"纸坊阀室"},{"id":669,"label":"归德阀室"},{"id":670,"label":"马山阀室"},{"id":671,"label":"夏张阀室"},{"id":672,"label":"马庄阀室"},{"id":673,"label":"蒋集阀室"},{"id":674,"label":"老城阀室"},{"id":675,"label":"葛石阀室"},{"id":676,"label":"大安阀室"},{"id":677,"label":"高官寨阀室"},{"id":678,"label":"绣惠阀室"},{"id":679,"label":"相公庄阀室"},{"id":680,"label":"普集阀室"}]}],
        cascaderProps:{ value: "id", label: "label", checkStrictly: false, emitPath: false },
      inputValue: '3333333333',
      selectValue: ['选项2'],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData: [
        { time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '语文' },
        { time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '数学' },
        { time: '2020-08-10', grade: '总成绩', name: '总成绩', subjects: '总成绩' }
      ],
      colConfigs: [
        {
          label: '考试信息',
          align: 'center',
          type: 'label',
          children: [
            { prop: 'time', label: '考试时间', align: 'center' },
            { prop: 'grade', label: '所在班级', align: 'center' },
            { prop: 'name', label: '考生姓名', align: 'center' },
            { prop: 'subjects', label: '考试科目', align: 'center' }
          ]
        }
      ],
      mergeColumns: [{ index: 0, name: 'time' }, { index: 1, name: 'grade' }, { index: 2, name: 'name' }, { index: 3, name: 'subjects' }]
    }
  },

  computed: {
    ...mapState('qyh', {
      allMarker: 'allMarker'
    })
  },
  mounted () {
    console.log()
  },
  methods: {
    closeNewDialog(){
      
    },
    
    exportExcel (tableId, ExcelName) {
      const wb = XLSX.utils.table_to_book(document.querySelector('#' + tableId))
      const wscols = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }]
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), ExcelName + '.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    exportData () {
       const element = document.getElementById('map_container');
              document.getElementById('full_screen').addEventListener('click', () => {
                  if (screenfull.isEnabled) {
                      screenfull.request(element); // 元素全屏
                  }
              });
      return 
      // var datalist=[ ['表头1','表头2'],['','z','b'], [ 1,2,3],[true, false,"sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
      // exportData.exportExcelFront('test.xlsx', [], [], datalist,[] );

      // let filename = "xxx.xlsx";
      // let mergeList = [{ s: { r: 1, c: 0 }, e: { r: 3, c: 0 } }, { s: { r: 1, c: 1 }, e: { r: 2, c: 1 } }, { s: { r: 3, c: 1 }, e: { r: 3, c: 3 } }];
      // let colsList = [{ wch: 40 }, { wch: 40 }, { wch: 40 }, { wch: 50 }, { wch: 60 }];
      const dataList = [
        { time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '语文' },
        { time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '数学' },
        { time: '2020-08-10', grade: '总成绩', name: '总成绩', subjects: '总成绩' }
      ]
      // let headArrs = [["时间", "姓名", "成绩", "科目"]];
      // let keyArr = ["time", "name", "grade", "subjects"];
      // exportData.exportExcelFront(filename, mergeList, colsList, dataList, headArrs, keyArr);

      const wb = XLSX.utils.book_new()
      // 导出输出表头设置
      const headers = {
        time: '时间',
        name: '姓名',
        grade: '成绩',
        subjects: '科目'
      }
      // 将表头放入数据源前面
      dataList.unshift(headers)
      const contentWs = XLSX.utils.json_to_sheet(dataList, {
        // 表头对应字段设置
        header: ['time', 'name', 'grade', 'subjects'], // 可自定义表头顺序
        skipHeader: true, // 是否忽略表头,默认为false
        origin: 'A2' // 表头起始行，默认从'A1'开始，也就是Excel左上角第一个表格
      })
      // 单独设置某个单元格内容
      contentWs.A1 = {
        t: 's',
        v: '人员名单', // 单元格文字
        // 自定义样式
        s: {
          font: {
            name: '宋体',
            sz: 40,
            bold: true,
            color: { rgb: 'FFFFAA00' }
          },
          // 设置更多样式可参考下图
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          },
          fill: { bgcolor: { rgb: 'ffff00' } }
        }
      }
      // // 设置单元格合并 !merges 为一个对象数组,每个对象设定了单元格合并的规则,
      // {s:{ r: 0, c: 0}, e: { r: 0, c: 2}} 为一个规则, s: 起始位置, e: 结束位置, r: 行, c: 列
      contentWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }]
      XLSX.utils.book_append_sheet(wb, contentWs, 'Sheet1')
      const wbout = XLSXS.write(wb, {
        type: 'buffer'
      })
      // // 下载
      FileSaver.saveAs(
        new Blob([wbout]),
        //   // 设置导出文件名称
        'XXXX人员表' + '.xlsx'
      )
    }
  }
}
</script>

<style lang="less" scoped>
.p {
    width: 100px;
    .s-overflow();
}
</style>
