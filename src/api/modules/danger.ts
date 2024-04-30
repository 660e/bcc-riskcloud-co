import http from '@/api';

// 隐患排查上报
export function getDangerReport() {
  return http.get('/mock/co/danger/report');
}
