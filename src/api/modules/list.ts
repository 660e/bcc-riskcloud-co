import http from '@/api';

/**
 * 获取清单执行记录列表
 * @returns
 */
export function tasks() {
  return http.get<any>('/mock/co/list/tasks');
}

//
//
//

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

// 日常监管清单
export function getListSupervise() {
  return http.get('/mock/co/list/supervise');
}

// 清单执行记录
export function getListExecute() {
  return http.get('/mock/co/list/execute');
}
