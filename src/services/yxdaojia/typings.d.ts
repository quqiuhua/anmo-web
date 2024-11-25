/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    message?: string;
    data?: string;
  }

  interface Result_PageInfo_WorkerInfo__ {
    success?: boolean;
    message?: string;
    data?: {
      list: any[];
      total: number;
    };
  }
  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  /**
   * CustomerQueryDTO
   */
  interface CustomerQueryDTO {
    /**
     * 昵称
     */
    nickName?: null | string;
    pageNum?: number | null;
    pageSize?: number | null;
    /**
     * 手机号
     */
    phone?: null | string;
    /**
     * 注册时间止
     */
    regEnd?: null | string;
    /**
     * 注册时间起
     */
    regStart?: null | string;
    /**
     * 状态
     */
    status?: number | null;
  }

  interface CustomerResponse {
    code?: number | null;
    data?: Data;
    message?: null | string;
  }

  interface CustomerData {
    cursor?: null | string;
    hasNext?: boolean | null;
    list?: List[] | null;
    pageNum?: number | null;
    pageSize?: number | null;
    total?: number | null;
  }

  interface CustomerVO {
    customerId: number;
    /**
     * 消费金额（元）
     */
    amount?: number | null;
    /**
     * 昵称
     */
    nickName?: null | string;
    /**
     * 手机号
     */
    phone?: null | string;
    /**
     * 头像
     */
    photo?: null | string;
    /**
     * 注册时间起
     */
    regTime?: null | string;
    /**
     * 状态
     */
    status?: number | null;
  }

  /**
   * CouponQueryDTO
   */
  interface CouponQueryDTO {
    /**
     * 类型编码
     */
    classifyCode?: null | string;
    pageNum?: number | null;
    pageSize?: number | null;
    /**
     * 状态 1启用 2停用
     */
    status?: number | null;
  }

  interface CouponQueryResponseDTO {
    code?: number | null;
    data?: PageListResultCouponQueryResponseDTO;
    message?: null | string;
  }

  interface CouponData {
    cursor?: null | string;
    hasNext?: boolean | null;
    list?: CouponQueryResponseDTO[] | null;
    pageNum?: number | null;
    pageSize?: number | null;
    total?: number | null;
  }

  interface CouponVO {
    /**
     * 券额度（元）
     */
    amount?: number | null;
    /**
     * 券类型
     */
    classifyCode?: null | string;
    /**
     * 券类型id
     */
    classifyId?: number | null;
    /**
     * 券类型名称
     */
    classifyName?: null | string;
    /**
     * 创建时间
     */
    createTime?: null | string;
    /**
     * 优惠券id
     */
    id?: number | null;
    /**
     * 券周期
     */
    limitDays?: number | null;
    /**
     * 券名称
     */
    name?: null | string;
    /**
     * 券状态 1启用 2停用
     */
    status?: number | null;
  }

  interface GiveCouponParams {
    userId: number;
    userType: number;
    couponIds: number[];
    dateStart?: 'string';
  }

  /**
   * OrderQueryRequestDTO
   */
  interface OrderRequestParams {
    /**
     * 下单时间止
     */
    createTimeEnd?: null | string;
    /**
     * 下单时间起
     */
    createTimeStart?: null | string;
    /**
     * 客户昵称或手机号
     */
    customer?: null | string;
    /**
     * 技师昵称或手机号
     */
    master?: null | string;
    /**
     * 订单编号
     */
    orderId?: null | string;
    /**
     * 订单状态
     */
    orderStatusList?: number[] | null;
    /**
     * 页码
     */
    pageNum?: number | null;
    /**
     * 页大小
     */
    pageSize?: number | null;
    /**
     * 评价分数
     */
    score?: number | null;
  }

  type definitions_0 = null;
}
