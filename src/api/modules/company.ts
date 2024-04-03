import http from '@/api';

export function getDeptList() {
  return http.get('/mock/co/company/dept');
}

export function deleteDept(id: string) {
  return http.delete(`/mock/co/company/dept/${id}`);
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
