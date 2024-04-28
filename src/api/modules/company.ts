import http from '@/api';

// 单位基本信息
export function getCompanyInfo() {
  return http.get<any>('/mock/co/company/info');
}

// 通过企业代码或企业名称模糊查找公司列表
export function getCompanyListById(q: string, t: string) {
  return http.get<any>('/mock/co/company/query', { q, t });
}

// 周边敏感目标
export function getCompanySensitive() {
  return http.get<any>('/mock/co/company/sensitive');
}

// 周边敏感目标单位信息
export function getCompanySensitiveInfo() {
  return http.get<any>('/mock/co/company/sensitive/info');
}

// 部门列表（树结构）
export function getCompanyDeptTree() {
  return http.get<any>('/mock/co/company/dept/tree');
}

// 部门管理
export function getDept() {
  return http.get<any>('/mock/co/company/dept');
}

// 删除项目
export function deleteItem(ids: string[]) {
  return http.delete(`/mock/co/common/item?ids=${ids}`);
}

//
//
//

// 获取部门、岗位、人员列表
export function getList(params: any) {
  return http.get('/mock/co/company/list', params);
}

// 获取公司所属行业领域列表
export function getCompanyIndustry() {
  return http.get<any>('/mock/co/company/industry');
}
