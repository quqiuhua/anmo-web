/**
 *  订单状态
 */
export const ORDER_STATUS = [
  {
    label: '订单待支付',
    value: 1,
  },
  {
    label: '技师待出发',
    value: 2,
  },
  {
    label: '技师待到达',
    value: 3,
  },
  {
    label: '技师已到达',
    value: 4,
  },
  {
    label: '服务中',
    value: 5,
  },
  {
    label: '已完成',
    value: 6,
  },
  {
    label: '已评价',
    value: 7,
  },
  {
    label: '已取消未支付',
    value: 8,
  },
  {
    label: '已取消已支付',
    value: 9,
  },
  {
    label: '已取消已退款',
    value: 10,
  },
];

/**
 * 用户评分
 */
export const USER_RATING_ENMS = [
  {
    label: '1分',
    value: 1,
  },
  {
    label: '2分',
    value: 2,
  },
  {
    label: '3分',
    value: 3,
  },
  {
    label: '4分',
    value: 4,
  },
  {
    label: '5分',
    value: 5,
  },
];

/**
 * 账户状态
 */
export const ACCOUNT_STATUS = [
  {
    label: '启用',
    value: 'enabled',
  },
  {
    label: '停用',
    value: 'disabled',
  },
];

/**
 * 限制类型
 */
export const LIMIT_TYPES = [
  {
    label: '女性',
    value: 2,
  },
  {
    label: '男性',
    value: 1,
  },
  {
    label: '无限制',
    value: 3,
  },
];

/**
 * 技师 & 客户状态
 */
export const WORKER_AND_CUSTOMER_STATUS = [
  {
    label: '正常',
    value: 1,
  },
  {
    label: '冻结',
    value: 2,
  },
];

/**
 * 技师资料审核状态
 */
export const AUDIT_STATUS = [
  {
    label: '资料待提交',
    value: 1,
  },
  {
    label: '待审核',
    value: 2,
  },
  {
    label: '审核驳回',
    value: 3,
  },
  {
    label: '审核通过',
    value: 4,
  },
];

/**
 * 项目适用人群
 */
export const TARGET_USER = [
  {
    label: '亚健康群体',
    value: 1,
  },
  {
    label: '所有群体',
    value: 2,
  },
];

/**
 * 项目标签
 */
export const PROJECT_LABEL = [
  {
    label: '超值特惠',
    value: 1,
  },
  {
    label: '放松解压',
    value: 2,
  },
  {
    label: '仅限女性',
    value: 4,
  },
];

/**
 * 技师标签
 */
export const WORKER_LABEL = [
  {
    label: '资深',
    value: 1,
  },
  {
    label: '专家',
    value: 2,
  },
  {
    label: '免出行费',
    value: 4,
  },
];
/**
 * 技师关联项目状态
 */
export const MASTER_PROJECT_STATUS = [
  {
    label: '申请服务',
    value: 1,
  },
  {
    label: '审核中',
    value: 2,
  },
  {
    label: '不可服务',
    value: 3,
  },
  {
    label: '可服务',
    value: 4,
  },
];

/**
 * 项目状态
 */
export const PROJECT_STATUS = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '停用',
    value: 2,
  },
];

/**
 * 奖励状态
 */
export const REWAED_STATUS = [
  {
    label: '待完成',
    value: 1,
  },
  {
    label: '待领取奖励',
    value: 2,
  },
  {
    label: '已领取',
    value: 3,
  },
];

export const PASS_OR_NOTPASS_OPTIONS = [
  {
    label: '通过',
    value: 4,
  },
  {
    label: '不通过',
    value: 3,
  },
];

/**
 * 技师项目审核状态
 */
export const WORKER_PROJECT_AUDIT_STATUS = [
  {
    label: '审核中',
    value: 2,
  },
  {
    label: '审核驳回',
    value: 3,
  },
  {
    label: '审核通过',
    value: 4,
  },
];

/**
 * 优惠券用户类型
 */
export const USER_TYPE = {
  CUSTOMER: 1,
  MASTER: 2,
};

export const COMMENT_TAGS_MAP = {
  1: '服装整洁',
  2: '热情礼貌',
  3: '相当专业',
  4: '力道刚好',
};
