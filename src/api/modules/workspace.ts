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
 * 标注用风险源列表
 * @returns
 */
export function markers() {
  return http.get<any>('/mock/co/workspace/risk/markers');
}

//
//
//

// 根据行业领域获取风险源列表

// 重大风险源判断条件

// 可能性分析

//

// 风险更新记录
export function getWorkspaceLog() {
  return http.get('/mock/co/workspace/log');
}

// 风险统计信息
export function getWorkspaceStatistics() {
  return http.get('/mock/co/workspace/statistics');
}

// 获取线上核查结果
export function getWorkspaceOnline() {
  return http.get('/mock/co/workspace/online');
}

// 获取标注用风险源列表

// 获取应急队伍列表
export function getEmergencyTeam() {
  return http.get<any>('/mock/co/workspace/risk/resource/team');
}

// 获取应急专家列表
export function getEmergencyExpert() {
  return http.get<any>('/mock/co/workspace/risk/resource/expert');
}

// 获取应急装备列表
export function getEmergencyEquipment() {
  return http.get<any>('/mock/co/workspace/risk/resource/equipment');
}

// 获取应急物资列表
export function getEmergencySupply() {
  return http.get<any>('/mock/co/workspace/risk/resource/supply');
}

// 获取应急能力评估表格
export function getAbilityEvaluationTable() {
  return http.get<any>('/mock/co/workspace/risk/evaluation');
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
