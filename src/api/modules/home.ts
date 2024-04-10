import http from '@/api';

// 获取风险源统计信息
export function riskStatistics() {
  return http.get('/mock/co/home/risk-statistics');
}
