import http from '@/api';

// 根据行业领域获取风险源列表
export function getRiskByIndustryId(params: any) {
  return http.get<any>('/mock/co/workspace/risk', params);
}

// 获取风险更新记录列表
export function getWorkspaceLog() {
  return http.get('/mock/co/workspace/log');
}

// 获取线上核查结果列表
export function getWorkspaceOnline() {
  return http.get('/mock/co/workspace/online');
}
