<template>
    <div class="flow">
        <!-- <el-tabs type="border-card">
            <el-tab-pane v-for="(item, index) in tabsData" :key="index" :label="item.name">
            </el-tab-pane>
        </el-tabs> -->
                <!-- <component v-bind="$attrs"  v-on="$listeners" :is="comName"></component> -->
                <zrz  v-bind="$attrs"  v-on="$listeners"></zrz>
    </div>
</template>

<script>
    import zrz from "@com/xscyx/components/zrz==.vue"
export default {
    name:'zrztc',
    components: {
        zrz
    },
    data() {
        return {
            tabsData: [
                {
                    name: "流程表单",
                    comName: ""
                },
                {
                    name: "流程图及流转情况",
                    comName: ""
                }
            ],
        };
    },
    watch: {},
    created() {},
    mounted() {
       
    },
    methods: {}
};
</script>

<style></style>
