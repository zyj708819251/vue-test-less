<template>
    <div class="wrap" v-bind="$attrs" v-on="$listeners">
        <el-form ref="form" :model="dynamicForm" :hide-required-asterisk="true" label-width="0" :show-message="false" :rules="rules">
            <div class="header">
                <el-form-item>
                    <el-button @click="closeDialog(false)">取消</el-button>
                    <el-button type="danger">驳回</el-button>
                    <el-button type="success" @click="submit('save')">保存</el-button>
                    <el-button type="primary" @click="submit('submit')">提交</el-button>
                </el-form-item>
            </div>
            <div class="rowCol body">
                <div class="title">
                    <el-row class="noBorder"><el-col class="bigTitle" :span="24">山东省天然气管道有限责任公司</el-col></el-row>
                    <el-row class="noBorder"><el-col class="smallTitle" :span="24">准入证</el-col></el-row>
                </div>
                <div class="tip">
                    <el-row class="noBorder">
                        <el-col :span="2" class="justify-content-start">编号：</el-col>
                        <el-col :span="10" class="justify-content-start">{{ dynamicForm.code }}</el-col>
                        <el-col :span="8" class="justify-content-end">
                            <span class="required">*</span>
                            日期：
                        </el-col>
                        <el-col :span="4" class="justify-content-end">
                            <el-form-item prop="time">
                                <el-date-picker
                                    :disabled="!isEdit"
                                    clearable
                                    v-model="dynamicForm.time"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="6">
                        <span class="required">*</span>
                        站场名称
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="stationName">
                            <el-cascader
                                :disabled="!isEdit"
                                :show-all-levels="false"
                                v-model="dynamicForm.stationName"
                                filterable
                                placeholder="请选择站场名称"
                                :options="stationData"
                                :props="cascaderProps"
                                clearable
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">申请人</el-col>
                    <el-col :span="6">{{ dynamicForm.applicant }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="verticalText">进站人员</el-col>
                    <el-col :span="22" class="flex-column ">
                        <el-row>
                            <el-col :span="6">
                                <span class="required">*</span>
                                工作单位
                            </el-col>
                            <el-col :span="18">
                                <el-form-item prop="workUnit">
                                    <el-input :disabled="!isEdit" clearable placeholder="请输入工作单位" v-model="dynamicForm.workUnit"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="required">*</span>
                                姓名
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name"><el-input :disabled="!isEdit" clearable placeholder="请输入姓名" v-model="dynamicForm.name"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <span class="required">*</span>
                                联系电话
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="contactNumber">
                                    <el-input :disabled="!isEdit" clearable placeholder="请输入联系电话" v-model="dynamicForm.contactNumber"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="required">*</span>
                                证件类型
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="certificatetype">
                                    <el-select :disabled="!isEdit" v-model="dynamicForm.certificatetype" filterable clearable placeholder="请输入证件类型" @change="changeCertificatetype">
                                        <el-option v-for="(item, index) in certificatetype_OPTIONS" :key="index" :label="item.dictLabel" :value="item.dictLabel"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <span class="required">*</span>
                                证件号码
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="identificationNumber">
                                    <el-input :disabled="!isEdit" clearable placeholder="请输入证件号码" v-model="dynamicForm.identificationNumber"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="required">*</span>
                                进站人数(人)
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="numberofpeople">
                                    <el-input :disabled="!isEdit" clearable placeholder="请输入进站人数" v-model="dynamicForm.numberofpeople"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <span class="required">*</span>
                                车辆(辆)
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="vehicle"><el-input :disabled="!isEdit" clearable placeholder="请输入车辆" v-model="dynamicForm.vehicle"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="required">*</span>
                                进出站时段
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="inboundPeriod">
                                    <el-time-picker
                                        :disabled="!isEdit"
                                        is-range
                                        format="HH:mm"
                                        value-format="HH:mm"
                                        arrow-control
                                        v-model="dynamicForm.inboundPeriod"
                                        range-separator="-"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                    ></el-time-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <span class="required">*</span>
                                联系人
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="contactPerson">
                                    <el-input :disabled="!isEdit" clearable placeholder="请输入联系人" v-model="dynamicForm.contactPerson"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span class="required">*</span>
                        进站事由
                    </el-col>
                    <el-col :span="18">
                        <el-form-item prop="enteringstationReason">
                            <el-input :disabled="!isEdit" clearable placeholder="请输入进站事由" v-model="dynamicForm.enteringstationReason"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span class="required">*</span>
                        携带工具、设备
                    </el-col>
                    <el-col :span="18">
                        <el-form-item prop="carryingTools">
                            <el-input :disabled="!isEdit" clearable placeholder="请输入携带工具、设备" v-model="dynamicForm.carryingTools"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span class="required">*</span>
                        活动区域
                    </el-col>
                    <el-col :span="18">
                        <el-form-item prop="zoneofaction">
                            <el-input :disabled="!isEdit" clearable placeholder="请输入活动区域" v-model="dynamicForm.zoneofaction"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row><el-col :span="24">随行人员</el-col></el-row>
                <el-row>
                    <el-col :span="24">
                        <el-col :span="6">序号</el-col>
                        <el-col :span="8">姓名</el-col>
                        <el-col :span="isEdit ? 8 : 10">身份证号</el-col>
                        <el-col :span="2" v-if="isEdit"><el-button type="primary" icon="el-icon-plus" size="mini" @click="addRow"></el-button></el-col>
                    </el-col>
                </el-row>
                <el-row v-for="(item, index) in dynamicForm.retinueData" :key="item.key">
                    <el-col :span="24">
                        <el-col :span="6">{{ index + 1 }}</el-col>
                        <el-col :span="8">
                            
                            <el-form-item  :prop="item['sxry-name']">
                            <el-input :disabled="!isEdit" clearable placeholder="请输入姓名" v-model="item['sxry-name']"></el-input>
                            </el-form-item>
                            
                        </el-col>
                        <!-- <el-col :span="isEdit ? 8 : 10"><el-input :disabled="!isEdit" clearable placeholder="请输入身份证号" v-model="item['sxry-identity']"></el-input></el-col> -->
                        <!-- <el-col :span="2" v-if="isEdit"><el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(index)"></el-button></el-col> -->
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">备注</el-col>
                    <el-col :span="18">
                        <el-input :disabled="!isEdit" resize="none" :autosize="{ minRows: 2 }" clearable type="textarea" placeholder="请输入备注" v-model="dynamicForm.remarks"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="verticalText">安全管理</el-col>
                    <el-col :span="22" class="flex-column ">
                        <el-row>
                            <el-col :span="18">管理处是否知情</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety1">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">是否进行安全教育</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety2">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">是否签订《安全告知书》</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety3">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">是否做好人员、车辆、物资登记</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety4">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">劳保防护用品是否穿戴齐全</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety5">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">进站车辆是否佩戴防火帽</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety6">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">是否关闭非防爆电子设备电源</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety7">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">火种是否放入火种箱</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety8">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">是否安排专人全程监护（陪同）</el-col>
                            <el-col :span="6">
                                <el-radio-group :disabled="!isEdit" v-model="dynamicForm.safety9">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">审批人（签章）</el-col>
                    <el-col :span="18">
                        <span>{{ dynamicForm.approver }}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="rowCol advice">
                <el-row class="noBorder"><el-col :span="24" class="justify-content-start">流程意见</el-col></el-row>
                <el-row class="noBorder">
                    <el-col :span="24">
                        <el-input resize="none" :autosize="{ minRows: 2, maxRows: 2 }" clearable type="textarea" placeholder="请输入流程意见" v-model="advice"></el-input>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "zrzjbxx",
    data() {
        return {
            isEdit: true,
            dynamicForm: {
                retinueData:[]
            },
            advice: "",
            rules: {
                time: [{ required: true, message: "请选择日期", trigger: "blur" }],
                stationName: [{ required: true, message: "请选择站场名称", trigger: "blur" }],
                workUnit: [{ required: true, message: "请输入工作单位", trigger: "blur" }],
                name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                contactNumber: [{ required: true, message: "请输入联系电话", trigger: "blur" }, { pattern: /^1[3456789]\d{9}$/, message: "请输入正确格式的联系电话" }],
                certificatetype: [{ required: true, message: "请选择证件类型", trigger: "blur" }],
                identificationNumber: [{ required: true, message: "请输入证件号码", trigger: "blur" }],
                numberofpeople: [{ required: true, message: "请输入进站人数", trigger: "blur" }],
                vehicle: [{ required: true, message: "请输入车辆", trigger: "blur" }],
                inboundPeriod: [{ required: true, message: "请输入进出站时段", trigger: "blur" }],
                contactPerson: [{ required: true, message: "请输入联系人", trigger: "blur" }],
                enteringstationReason: [{ required: true, message: "请输入进站事由", trigger: "blur" }],
                carryingTools: [{ required: true, message: "请输入带工具、设备", trigger: "blur" }],
                zoneofaction: [{ required: true, message: "请输入活动区域", trigger: "blur" }]
            },
            stationData: [],
            certificatetype_OPTIONS: [{ dictLabel: "身份证" }, { dictLabel: "工作证" }, { dictLabel: "其它" }],
            cascaderProps: { value: "id", label: "label", checkStrictly: false, emitPath: false }
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.isEdit=this.$attrs.isEdit;
            // this.dynamicForm = JSON.parse(JSON.stringify(this.$attrs.dialogData));
            this.dynamicForm.stationName = this.dynamicForm.stationName * 1;
            //安全管理
            if (this.dynamicForm.safetyManagement) {
                let safety = JSON.parse(this.dynamicForm.safetyManagement);
                safety.forEach((v, i) => {
                    this.$set(this.dynamicForm, "safety" + (i + 1), v);
                });
            } else {
                for (var i = 0; i < 9; i++) {
                    this.$set(this.dynamicForm, "safety" + (i + 1), "否");
                }
            }
            // //随行人员
            if (this.dynamicForm.retinueData) {
                this.dynamicForm.retinueData = JSON.parse(JSON.stringify(this.dynamicForm.retinueData));
            } else {
                this.dynamicForm.retinueData = [];
            }
        },
        getSelectChildrenDeptById() {
            getSelectChildrenDeptById().then(res => {
                if (res.code == 200) {
                    this.stationData = res.data;
                }
            });
        },
        closeDialog(flag) {
            this.$emit("closeDialog", flag);
        },
        changeCertificatetype(val) {
            if (val == "身份证") {
                this.rules.identificationNumber.push({ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "请输入正确格式的证件号码" });
            } else {
                this.rules.identificationNumber.splice(0, 1);
            }
        },

        addRow() {
            this.dynamicForm.retinueData.push({ "sxry-name": "", "sxry-identity": "",key:new Date().getTime() });
        },
        deleteRow(index) {
            this.dynamicForm.retinueData.splice(index, 1);
        },
        submit(type) {
            this.$refs.dynamicForm.validate((valid, obj) => {
                if (valid) {
                    //进站时间
                    this.dynamicForm.inboundPeriod = this.dynamicForm.inboundPeriod.join("-");
                    //随行人员
                    this.dynamicForm.retinueData = JSON.stringify(this.dynamicForm.retinueData);
                    //安全管理
                    this.dynamicForm.safetyManagement = JSON.stringify(this.dynamicForm.safetyManagement);

                    debugger;

                    return;
                } else {
                    var a = [];
                    for (let key in obj) {
                        a.push(obj[key][0].message);
                    }
                    this.$message({
                        message: a[0],
                        type: "warning"
                    });
                    return false;
                }
            });
        }
    }
};
</script>
