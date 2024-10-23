// 全局共享数据示例
import {
  operateRewardConfig,
  queryMasterInvitePageList,
  queryRewardConfig,
} from '@/services/yxdaojia/UserController';
import { useRequest } from '@umijs/max';

const useInvite = () => {
  const queryWorkerInviteList = useRequest(queryMasterInvitePageList, {
    manual: true,
  });

  const queryConfig = useRequest(queryRewardConfig, {
    manual: true,
  });

  const editRewardConfig = useRequest(operateRewardConfig, {
    manual: true,
  });

  return {
    queryConfig,
    editRewardConfig,
    queryWorkerInviteList,
  };
};

export default useInvite;
