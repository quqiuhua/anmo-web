// 全局共享数据示例
import {
  addUser,
  deleteUser,
  queryUserDetail,
  queryUserPageList,
  resetPassword,
  updateStatus,
} from '@/services/yxdaojia/AccountController';
import { useRequest } from '@umijs/max';

const useAccount = () => {
  const queryUserList = useRequest(queryUserPageList, {
    manual: true,
  });

  const createUser = useRequest(addUser, {
    manual: true,
  });

  const resetPwd = useRequest(resetPassword, {
    manual: true,
  });

  const updateAccountStatus = useRequest(updateStatus, {
    manual: true,
  });

  const deleteAccount = useRequest(deleteUser, {
    manual: true,
  });

  const queryUserInfo = useRequest(queryUserDetail, {
    manual: true,
  });

  return {
    createUser,
    resetPwd,
    deleteAccount,
    queryUserList,
    queryUserInfo,
    updateAccountStatus,
  };
};

export default useAccount;
