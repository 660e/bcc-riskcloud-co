import http from '@/api';

// 获取风险源列表
export function getInformationRisk(params: any) {
  return http.get('/mock/co/information/risk', params);
}

// 获取风险源上报历史列表
export function getInformationRiskById(params: any) {
  return http.get(`/mock/co/information/risk/${params.id}`, params);
}
