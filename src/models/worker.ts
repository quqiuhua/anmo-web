// 全局共享数据示例
import {
  auditCertificate,
  queryMasterDetail,
  queryMasterInvitePageList,
  queryWorkerList,
} from '@/services/yxdaojia/UserController';
import { useRequest } from '@umijs/max';

const useWorker = () => {
  // 查询技师用户
  const queryWorkerData = useRequest(queryWorkerList, {
    manual: true,
  });

  const queryWorkerDetail = useRequest(queryMasterDetail, {
    manual: true,
  });

  const auditQualification = useRequest(auditCertificate, {
    manual: true,
  });

  const queryWorkerInviteList = useRequest(queryMasterInvitePageList, {
    manual: true,
  });

  return {
    queryWorkerData,
    queryWorkerDetail,
    auditQualification,
    queryWorkerInviteList,
  };
};

export default useWorker;
