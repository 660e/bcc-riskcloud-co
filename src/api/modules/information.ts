import http from '@/api';

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
