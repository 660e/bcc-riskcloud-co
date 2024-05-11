import http from '@/api';

/**
 * 获取帮助列表
 * @returns
 */
export function help() {
  return http.get<any>('/mock/co/library/help');
}

//
//
//

// 获取知识库列表
export function getLibrary(params: any) {
  return http.get('/mock/co/library', params);
}
