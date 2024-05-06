import http from '@/api';

// 主体责任清单
export function getDuty() {
  return http.get('/mock/co/list/duty');
}

// 岗位列表（树结构）
export function getListPostTree() {
  return http.get<any>('/mock/co/list/post/tree');
}

// 责任清单
export function getPostDuty() {
  return http.get('/mock/co/list/post/duty');
}

// 任务清单
export function getPostTask() {
  return http.get('/mock/co/list/post/task');
}

// 操作清单
export function getPostOperation() {
  return http.get('/mock/co/list/post/operation');
}
