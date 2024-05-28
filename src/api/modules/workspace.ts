import http from '@/api';

/**
 * 根据行业领域获取风险源列表
 * @param industryId 行业领域id
 * @returns
 */
export function risks(industryId: string) {
  return http.get<any>(`/mock/co/workspace/${industryId}/risks`);
}

/**
 * 风险源列表（树结构）
 * @returns
 */
export function risksTree() {
  return http.get<any>('/mock/co/workspace/risks/tree');
}

/**
 * 计算风险等级
 * @returns
 */
export function calcRiskGrade() {
  return http.get<number[]>('/mock/co/workspace/calc-risk-grade');
}

/**
 * 重大风险源判断条件
 * @returns
 */
export function majors() {
  return http.get<any>('/mock/co/workspace/risk/majors');
}

/**
 * 可能性分析
 * @returns
 */
export function possibility() {
  return http.get<any>('/mock/co/workspace/risk/possibility');
}

/**
 * 严重性分析
 * @returns
 */
export function severity() {
  return http.get<any>('/mock/co/workspace/risk/severity');
}

/**
 * 平面图标注列表
 * @returns
 */
export function plan() {
  return http.get<any>('/mock/co/workspace/risk/plan');
}

/**
 * 标注用风险源列表
 * @returns
 */
export function markers() {
  return http.get<any>('/mock/co/workspace/risk/markers');
}

/**
 * 单位诊断分级表格
 * @returns
 */
export function diagnosis() {
  return http.get<any>('/mock/co/workspace/risk/diagnosis');
}

/**
 * 应急队伍列表
 * @returns
 */
export function team() {
  return http.get<any>('/mock/co/workspace/risk/resource/team');
}

/**
 * 应急专家列表
 * @returns
 */
export function expert() {
  return http.get<any>('/mock/co/workspace/risk/resource/expert');
}

/**
 * 应急装备列表
 * @returns
 */
export function equipment() {
  return http.get<any>('/mock/co/workspace/risk/resource/equipment');
}

/**
 * 应急物资列表
 * @returns
 */
export function supply() {
  return http.get<any>('/mock/co/workspace/risk/resource/supply');
}

/**
 * 应急能力评估表格
 * @returns
 */
export function evaluation() {
  return http.get('/mock/co/workspace/risk/evaluation');
}

/**
 * 风险统计信息
 * @returns
 */
export function statistics() {
  return http.get('/mock/co/workspace/statistics');
}

/**
 * 风险更新记录
 * @returns
 */
export function log() {
  return http.get('/mock/co/workspace/log');
}

//
//
//

// 风险更新记录
// 获取线上核查结果
export function getWorkspaceOnline() {
  return http.get('/mock/co/workspace/online');
}

// 获取风险源列表
export function getInformationRisk(params: any) {
  return http.get('/mock/co/information/risk', params);
}

// 获取风险源上报历史列表
export function getInformationRiskById(params: any) {
  return http.get(`/mock/co/information/risk/${params.id}`, params);
}

// 获取应急资源上报历史列表
export function getInformationResource(params: any) {
  return http.get('/mock/co/information/resource', params);
}

// 根据id获取应急资源列表
export function getInformationResourceById(params: any) {
  return http.get(`/mock/co/information/resource/${params.id}`, params);
}

// 获取评估报告上报历史列表
export function getInformationReport() {
  return http.get('/mock/co/information/report');
}

// 根据id获取评估报告列表
export function getInformationReportById(params: any) {
  return http.get(`/mock/co/information/report/${params.id}`, params);
}
