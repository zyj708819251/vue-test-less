import request from '@/utils/request';

//获取流程图以及流程数据
export const getFlowHistory = (id,params) => {
	return request({
		url: `/tool/flowManage/findFlowHistoryImage/${id}?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
		method: 'GET'
	});
};

//按权限查字段（站场）
export const getSelectChildrenDeptById = () => {
  return request({
    url: `/system/dept/list/selectChildrenDeptById`,
    method: 'get'
  });
};

//添加、修改准入证
export const addTableData = (flowid,type,data) => {
	return request({
		url: `/tool/flowAdmittance/add/${flowid}/${type}`,
		method: 'POST',
		data: data
	});
};
