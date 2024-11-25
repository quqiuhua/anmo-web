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
    id: number;
    status: number;
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
    projectId?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/project/queryProjectDetail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function queryMasterProjectPageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    `/tech/project/queryMasterProjectPageList`,
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

export async function auditProject(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(`/tech/project/auditProject`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 查询分成比例
export async function queryCommissionRate(
  params?: Record<string, string>,
  options?: { [key: string]: any },
) {
  return request<boolean>(`/tech/commission/queryCommissionRate`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

// 配置抽拥比例
export async function configCommissionRate(
  body: { commissionRate: number },
  options?: { [key: string]: any },
) {
  return request<boolean>(`/tech/commission/configCommissionRate`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function queryMasterAccountPageList(
  body: {
    phone?: string;
    nickName?: string;
    pageNum?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>(`/tech/master/queryMasterAccountPageList`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function queryOrderPageList(
  body: API.OrderRequestParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/order/query/queryOrderPageList`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function queryOrderEvaluateDetail(
  params: { orderId?: string },
  options?: { [key: string]: any },
) {
  return request<any>(`/order/query/queryOrderEvaluateDetail`, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export async function queryOrderDetail(
  params: { orderId?: string },
  options?: { [key: string]: any },
) {
  return request<any>(`/order/query/queryOrderDetail`, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
