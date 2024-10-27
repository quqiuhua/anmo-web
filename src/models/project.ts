// 全局共享数据示例
import {
  createProject,
  queryProjectDetail,
  queryProjectPageList,
  updateProject,
  updateProjectStatus,
} from '@/services/yxdaojia/ProjectController';
import { useRequest } from '@umijs/max';

const useProject = () => {
  const queryProjectList = useRequest(queryProjectPageList, {
    manual: true,
  });

  const addProject = useRequest(createProject, {
    manual: true,
  });

  const updateStatus = useRequest(updateProjectStatus, {
    manual: true,
  });

  const editProject = useRequest(updateProject, {
    manual: true,
  });

  const queryDetail = useRequest(queryProjectDetail, {
    manual: true,
  });

  return {
    queryProjectList,
    updateStatus,
    addProject,
    editProject,
    queryDetail,
  };
};

export default useProject;
