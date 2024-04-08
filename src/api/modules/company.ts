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

// 删除岗位
export function deletePost(id: string) {
  return http.delete(`/mock/co/company/post/${id}`);
}

// 获取岗位列表
export function getPostList(params: any) {
  return http.get('/mock/co/company/post', params);
}

// 删除人员
export function deleteStaff(id: string) {
  return http.delete(`/mock/co/company/staff/${id}`);
}

// 获取人员列表
export function getStaffList(params: any) {
  return http.get('/mock/co/company/staff', params);
}
