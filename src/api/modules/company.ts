import http from '@/api';

// 获取基本信息
export function getCompanyInfo() {
  return http.get<any>('/mock/co/company/info');
}

// 删除部门
export function deleteDept(id: string) {
  return http.delete(`/mock/co/company/dept/${id}`);
}

// 获取部门列表
export function getDeptList(params: any) {
  return http.get('/mock/co/company/dept', params);
}

export function getPostList() {
  return http.get('/mock/co/company/post');
}

export function deletePost(id: string) {
  return http.delete(`/mock/co/company/post/${id}`);
}

export function getStaffList() {
  return http.get('/mock/co/company/staff');
}

export function deleteStaff(id: string) {
  return http.delete(`/mock/co/company/staff/${id}`);
}
