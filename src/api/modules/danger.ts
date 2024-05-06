import http from '@/api';

// 隐患排查上报
export function getDangerReport() {
  return http.get('/mock/co/danger/report');
}

// 隐患等级
export function getDangerLevel() {
  return http.get('/mock//co/danger/information/level');
}
