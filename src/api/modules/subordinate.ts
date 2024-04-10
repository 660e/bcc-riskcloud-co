import http from '@/api';

// 获取下属单位列表
export function getSubordinateAccount() {
  return http.get('/mock/co/subordinate/account');
}
