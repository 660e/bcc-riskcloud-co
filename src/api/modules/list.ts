import http from '@/api';

// 主体责任清单
export function getDuty() {
  return http.get('/mock/co/list/duty');
}
