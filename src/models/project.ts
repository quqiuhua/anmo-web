// 全局共享数据示例
import {
  auditProject,
  createProject,
  deleteProject,
  queryMasterProjectPageList,
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

  const deletePro = useRequest(deleteProject, {
    manual: true,
  });

  const audit = useRequest(auditProject, {
    manual: true,
  });

  const queryProjectAuditList = useRequest(queryMasterProjectPageList, {
    manual: true,
  });

  return {
    updateStatus,
    deletePro,
    addProject,
    editProject,
    queryDetail,
    audit,
    queryProjectList,
    queryProjectAuditList,
  };
};

export default useProject;
