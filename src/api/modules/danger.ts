import http from '@/api';

// 隐患排查上报
export function getDangerReport() {
  return http.get('/mock/co/danger/report');
}

// 隐患等级
export function getDangerLevel() {
  return http.get('/mock/co/danger/information/level');
}

// 隐患类型
export function getDangerType() {
  return http.get('/mock/co/danger/information/type');
}

// 隐患整改情况
export function getDangerMend() {
  return http.get('/mock/co/danger/information/mend');
}

// 隐患来源
export function getDangerSource() {
  return http.get('/mock/co/danger/information/source');
}

// 隐患变化
export function getDangerVary() {
  return http.get('/mock/co/danger/information/vary');
}
