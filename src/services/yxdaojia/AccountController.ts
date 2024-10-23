/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryUserPageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    `/user-center/user/queryUserPageList`,
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

export async function addUser(body: any, options?: { [key: string]: any }) {
  return request<API.Result_PageInfo_UserInfo__>(`/user-center/user/addUser`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function resetPassword(
  params: {
    userId?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/user-center/user/restPwd`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function deleteUser(
  params: {
    id?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/user-center/user/delete`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function updateStatus(
  params: {
    userId?: number | string;
    status: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/user-center/user/updateStatus`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function queryUserDetail(
  params: {
    phone?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/user-center/user/queryUserDetail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
