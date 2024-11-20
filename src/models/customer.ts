import { queryCustomerPageList } from '@/services/yxdaojia/UserController';
import { useRequest } from '@umijs/max';

const useCustomer = () => {
  // 查询用户
  const queryCustomerData = useRequest(queryCustomerPageList, {
    manual: true,
  });

  return {
    queryCustomerData,
  };
};

export default useCustomer;
