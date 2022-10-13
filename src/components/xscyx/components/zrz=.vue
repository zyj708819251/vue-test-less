<template>
    <div class="wrap">
        <el-form ref="form" :model="form" :hide-required-asterisk="true" label-width="0" :show-message="false" >
            <div class="rowCol body">
                <div class="title">
                    <el-row class="noBorder"><el-col class="bigTitle" :span="24">山东省天然气管道有限责任公司</el-col></el-row>
                    <el-row class="noBorder"><el-col class="smallTitle" :span="24">准入证</el-col></el-row>
                </div>
                <div class="tip">
                    <el-row class="noBorder">
                        <el-col :span="2" class="justify-content-start">编号：</el-col>
                        <el-col :span="10" class="justify-content-start"> <el-input  clearable placeholder="请输入工作单位" v-model="form.workUnit"></el-input></el-col>
                        <el-col :span="8" class="justify-content-end">
                            <span class="required">*</span>
                            日期：
                           <el-form-item prop="time">
                               <el-date-picker
                                   v-model="form.time"
                                   type="date"
                                   format="yyyy-MM-dd"
                                   value-format="yyyy-MM-dd"
                                   placeholder="选择日期"
                               ></el-date-picker>
                           </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "zrzjbxx",
    data() {
        return {
            form: {
                time:"",
                workUnit:""
            },
        };
    },
    watch: {},
    created() {},
    mounted() {
        console.log(this.$attrs);
    },
    methods: {}
};
</script>
