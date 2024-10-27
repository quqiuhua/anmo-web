/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryProjectPageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    `/tech/project/queryProjectPageList`,
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

export async function createProject(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(`/tech/project/addProject`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateProject(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    `/tech/project/updateProject`,
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

export async function updateProjectStatus(
  params: {
    userId?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/project/updateStatus`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function deleteProject(
  params: {
    id?: number | string;
  },
  options?: { [key: string]: any },
) {
  const { id } = params;
  return request<API.Result_UserInfo_>(`/tech/project/delete/${id}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function queryProjectDetail(
  params: {
    id?: number | string;
  },
  options?: { [key: string]: any },
) {
  const { id } = params;
  return request<API.Result_UserInfo_>(`/tech/project/detail/${id}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
