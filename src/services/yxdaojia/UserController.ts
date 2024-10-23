/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

// 查询技师列表
export async function queryWorkerList(
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    `/tech/master/queryMasterPageList`,
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

// 查询技师详情
export async function queryMasterDetail(
  params: {
    masterId?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/master/queryMasterDetail`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

// 技师资料审核
export async function auditCertificate(
  body: {
    masterId?: number | string;
    certificateList: Record<string, any>[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/certificate/auditCertificate`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 查看技师评价
export async function queryEvaluatePageList(
  body: {
    masterId: number;
    pageNum: number;
    pageSize: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/evaluate/queryEvaluatePageList`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 查询技师邀请列表
export async function queryMasterInvitePageList(
  body: {
    phone?: number;
    nickName?: string;
    startDate?: string;
    endDate?: string;
    pageNum: number;
    pageSize: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(
    `/tech/invite/queryMasterInvitePageList`,
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

export async function login(body: any, options?: { [key: string]: any }) {
  return request<API.Result_PageInfo_UserInfo__>('/user-center/login/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function sendVerifyCode(
  params: {
    phone?: number | string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/user-center/login/sendVerifyCode`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function queryUserList(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/user-center/user/queryUserPageList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function addUser(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/user-center/user/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 查询奖励机制
export async function queryRewardConfig(
  params: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/reward/queryRewardConfig`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

// 配置奖励机制
export async function operateRewardConfig(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/tech/reward/operateRewardConfig`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
