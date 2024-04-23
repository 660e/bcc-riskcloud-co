import http from '@/api';
import { WorkspaceRiskSource } from '../interface';

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

// 获取可能性分析列表
export function getPossibility() {
  return http.get<any>('/mock/co/workspace/risk/possibility');
}

// 获取严重性分析列表
export function getSeverity() {
  return http.get<any>('/mock/co/workspace/risk/severity');
}

// 计算风险等级
export function calcRiskGrade() {
  return http.get<number[]>('/mock/co/workspace/calc-risk-grade');
}

// 获取标注用风险源列表
export function getRiskMarkers() {
  return http.get<WorkspaceRiskSource[]>('/mock/co/workspace/risk/markers');
}

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
