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
 * 单位基本信息（行业领域）
 * @param companyId 单位id
 * @returns
 */
export function industry(companyId: string) {
  return http.get<any>(`/mock/co/company/${companyId}/industry`);
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

/**
 * 部门列表（树结构）
 * @returns
 */
export function deptTree() {
  return http.get<any>('/mock/co/company/dept/tree');
}

/**
 * 部门列表
 * @returns
 */
export function dept() {
  return http.get<any>('/mock/co/company/dept');
}

/**
 * 岗位列表（树结构）
 * @returns
 */
export function postTree() {
  return http.get<any>('/mock/co/company/post/tree');
}

/**
 * 岗位列表
 * @returns
 */
export function post() {
  return http.get<any>('/mock/co/company/post');
}

/**
 * 人员列表
 * @returns
 */
export function staff() {
  return http.get<any>('/mock/co/company/staff');
}

/**
 * 创建项目
 * @param params 参数
 * @returns
 */
export function addItem(params: any) {
  return http.post('/mock/co/common/item', params);
}

/**
 * 删除项目
 * @param ids 项目ids
 * @returns
 */
export function deleteItem(ids: string) {
  return http.delete(`/mock/co/common/item?ids=${ids}`);
}

/**
 * 编辑项目
 * @param params 参数
 * @returns
 */
export function updateItem(params: any) {
  return http.put('/mock/co/common/item', params);
}

/**
 * 复制项目
 * @param id 项目id
 * @returns
 */
export function copyItem(id: string) {
  return http.get('/mock/co/common/item', { params: { id } });
}
