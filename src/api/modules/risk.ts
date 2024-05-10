import http from '@/api';

/**
 * 获取风险信息汇总
 * @returns
 */
export function summary() {
  return http.get<any>('/mock/co/risk-summary');
}
