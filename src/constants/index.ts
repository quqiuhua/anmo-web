/**
 *  订单状态
 */
export const ORDER_STATUS = [
  {
    label: '技师待出发',
    value: 'notSetout',
  },
  {
    label: '技师待到达',
    value: 'setOut',
  },
  {
    label: '技师已到达',
    value: 'arrived',
  },
  {
    label: '服务中',
    value: 'inService',
  },
  {
    label: '已完成',
    value: 'finished',
  },
  {
    label: '订单已取消',
    value: 'canceled',
  },
];

/**
 * 用户评分
 */
export const USER_RATING_ENMS = [
  {
    label: '1分',
    value: 'oneStar',
  },
  {
    label: '2分',
    value: 'twoStar',
  },
  {
    label: '3分',
    value: 'threeStar',
  },
  {
    label: '4分',
    value: 'fourStar',
  },
  {
    label: '5分',
    value: 'fiveStar',
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
    value: 'FEMALE',
  },
  {
    label: '男性',
    value: 'MALE',
  },
  {
    label: '无限制',
    value: 'OTHER',
  },
];

/**
 * 技师 & 客户状态
 */
export const WORKER_AND_CUSTOMER_STATUS = [
  {
    label: '正常',
    value: 'NORMAL',
  },
  {
    label: '冻结',
    value: 'FREEZE',
  },
];

/**
 * 技师资料审核状态
 */
export const AUDIT_STATUS = [
  {
    label: '资料提交中',
    value: 'SUBMIT',
  },
  {
    label: '审核中',
    value: 'AUDIT_ING',
  },
  {
    label: '审核驳回',
    value: 'AUDIT_REFUSE',
  },
  {
    label: '审核通过',
    value: 'AUDIT_PASS',
  },
];

/**
 * 项目适用人群
 */
export const TARGET_USER = [
  {
    label: '亚健康群体',
    value: 'SUB_HEALTH',
  },
  {
    label: '所有群体',
    value: 'ALL',
  },
];

/**
 * 项目标签
 */
export const PROJECT_LABEL = [
  {
    label: '超值特惠',
    value: 'GREAT_VALUE',
  },
  {
    label: '放松解压',
    value: 'RELAX',
  },
  {
    label: '仅限女性',
    value: 'ONLY_FEMALE',
  },
];

/**
 * 技师标签
 */
export const WORKER_LABEL = [
  {
    label: '资深',
    value: 'SENIOR',
  },
  {
    label: '专家',
    value: 'SPECIALIST',
  },
  {
    label: '免出行费',
    value: 'FREE_TRIP',
  },
];
/**
 * 技师关联项目状态
 */
export const MASTER_PROJECT_STATUS = [
  {
    label: '申请服务',
    value: 'APPLY',
  },
  {
    label: '审核中',
    value: 'AUDIT_ING',
  },
  {
    label: '不可服务',
    value: 'AUDIT_REFUSE',
  },
  {
    label: '可服务',
    value: 'AUDIT_PASS',
  },
];

/**
 * 项目状态
 */
export const PROJECT_STATUS = [
  {
    label: '启用',
    value: 'ENABLE',
  },
  {
    label: '停用',
    value: 'DISABLE',
  },
];

/**
 * 奖励状态
 */
export const REWAED_STATUS = [
  {
    label: '待完成',
    value: 'FINISH_NO',
  },
  {
    label: '待领取奖励',
    value: 'FINISH_YES',
  },
  {
    label: '已领取',
    value: 'DISTRIBUTE',
  },
];
