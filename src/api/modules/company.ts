import http from '@/api';

/**
 * 获取公司二维码
 * @param companyId 公司id
 * @returns
 */
export function qrcode(companyId: string) {
  return http.get<string>(`/mock/co/company/${companyId}/qrcode`);
}

//
//
//

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

// 岗位管理
export function getPost() {
  return http.get<any>('/mock/co/company/post');
}

// 岗位列表（树结构）
export function getCompanyPostTree() {
  return http.get<any>('/mock/co/company/post/tree');
}

// 人员管理
export function getStaff() {
  return http.get<any>('/mock/co/company/staff');
}

// 创建项目
export function addItem(params: any) {
  return http.post('/mock/co/common/item', params);
}

// 删除项目
export function deleteItem(ids: string[]) {
  return http.delete(`/mock/co/common/item?ids=${ids}`);
}

// 编辑项目
export function updateItem(params: any) {
  return http.put('/mock/co/common/item', params);
}

// 复制项目
export function copyItem(id: string) {
  return http.get('/mock/co/common/item', { params: { id } });
}

// 公司所属行业领域
export function getCompanyIndustry() {
  return http.get<any>('/mock/co/company/industry');
}
