import http from '@/api';

// 获取风险更新记录
export function getWorkspaceLog() {
  return http.get('/mock/co/workspace/log');
}

// 获取风险统计信息
export function getWorkspaceStatistics() {
  return http.get('/mock/co/workspace/statistics');
}

// 获取线上核查结果
export function getWorkspaceOnline() {
  return http.get('/mock/co/workspace/online');
}

// 根据行业领域获取风险源列表
export function getRiskByIndustryId(params: any) {
  return http.get<any>('/mock/co/workspace/risks/list', params);
}

// 根据行业领域获取风险源
export function getRisks() {
  return http.get<any>('/mock/co/workspace/risks');
}

// 获取重大风险源列表
export function getMajors() {
  return http.get<any>('/mock/co/workspace/risk/majors');
}
