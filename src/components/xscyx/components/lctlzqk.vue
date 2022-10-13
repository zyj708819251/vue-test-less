<template>
    <div>
        <div class="img"><img :src="flowImg" alt="" @click="showViewer=true"></div>
        <el-table style="margin-top: 30px;" max-height="56vh" stripe :data="flowData">
            <el-table-column align="center" label="序号" width="50">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="部门名称" prop="deptName"></el-table-column>
            <el-table-column align="center" label="操作人" prop="userId"></el-table-column>
            <el-table-column align="center" label="内容" prop="message"></el-table-column>
            <el-table-column align="center" label="操作时间" prop="time"></el-table-column>
            <el-table-column align="center" label="操作状态" prop="type"></el-table-column>
        </el-table>
        <!-- 展示附件 -->
        	<!-- :append-to-body="false" -->
        <el-image-viewer
        	v-if="showViewer"
        	:preview-teleported="true"
        	:on-close="
        		() => {
        			showViewer = false;
        		}
        	"
            :z-index="3000"
        	:url-list="[flowImg]"
        />
    </div>
</template>

<script>
    import {getFlowHistory} from '../api/lc.js';
    export default {
         name:'zrzlctlzqk',
         components: {
         	"el-image-viewer": () => import("element-ui/packages/image/src/image-viewer")
         },
        data() {
            return{
                flowParams:{
                    pageNum: 1,
                    pageSize: 10
                },
                flowImg:'',
                flowData:[],
                showViewer:false
            }
        },
        watch: {},
        created() {},
        mounted() {
            this.flowId=this.$attrs.dialogData.instance_id;
            this.getFlowData();
        },
        methods: {
            getFlowData() {
                getFlowHistory(this.flowId, this.flowParams).then(res => {
                    if (res.code == 200) {
                        this.flowData = res.rows[0].history;
                        this.flowImg = res.rows[0].imgBase64;
                    }
                });
            },
        }
    };
</script>

<style scoped lang="scss">
    .img{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>