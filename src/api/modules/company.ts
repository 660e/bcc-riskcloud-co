import http from '@/api';

/**
 * 获取单位二维码
 * @param companyId 单位id
 * @returns
 */
export function qrcode(companyId: string) {
  return http.get<string>(`/mock/co/company/${companyId}/qrcode`);
}

/**
 * 获取单位基本信息
 * @param companyId 单位id
 * @returns
 */
export function details(companyId: string) {
  return http.get<any>(`/mock/co/company/${companyId}`);
}

/**
 * 获取单位基本信息（敏感目标）
 * @param companyId 单位id
 * @returns
 */
export function detailsSensitivity(companyId: string) {
  return http.get<any>(`/mock/co/company/${companyId}/sensitivity`);
}

/**
 * 通过关键字获取单位列表
 * @param q 关键字
 * @param t 搜索类型（企业代码、企业名称）
 * @returns
 */
export function query(q: string, t: string) {
  return http.get<any>('/mock/co/company/query', { q, t });
}

/**
 * 获取行业领域列表（树结构）
 * @returns
 */
export function industries() {
  return http.get<any>('/mock/co/company/industries/tree');
}

/**
 * 获取周边敏感目标列表
 * @returns
 */
export function sensitivity() {
  return http.get<any>('/mock/co/company/sensitivity');
}

//
//
//
//

// 周边敏感目标

// 周边敏感目标单位信息

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
