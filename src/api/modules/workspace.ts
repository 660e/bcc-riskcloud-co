import http from '@/api';

// 根据行业领域获取风险源列表
export function getRiskByIndustryId(params: any) {
  return http.get<any>('/mock/co/workspace/risk', params);
}
