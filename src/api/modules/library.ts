import http from '@/api';

// 获取知识库列表
export function getLibrary(params: any) {
  return http.get('/mock/co/library', params);
}
