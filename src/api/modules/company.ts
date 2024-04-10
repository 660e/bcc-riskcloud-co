import http from '@/api';

// 获取基本信息
export function getCompanyInfo() {
  return http.get<any>('/mock/co/company/info');
}

// 通过企业代码或企业名称模糊查找公司列表
export function getCompanyListById(q: string, t: string) {
  return http.get<any>('/mock/co/company/query', { q, t });
}

// 删除部门、岗位、人员
export function deleteItem(id: string) {
  return http.delete(`/mock/co/company/list/${id}`);
}

// 获取部门、岗位、人员列表
export function getList(params: any) {
  return http.get('/mock/co/company/list', params);
}

// 获取公司所属行业领域列表
export function getCompanyIndustry() {
  return http.get<any>('/mock/co/company/industry');
}
