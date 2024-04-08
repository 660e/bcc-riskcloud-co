import http from '@/api';
import { RiskStatisticsType } from '../interface/home';

/**
 * @description 获取风险源统计信息
 * @param id 单位id
 */
export function riskStatistics(id: number) {
  return http.get<RiskStatisticsType[]>('/mock/co/home/risk-statistics', { id });
}
