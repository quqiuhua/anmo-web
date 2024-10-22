export const getFormValues = (res: any) => {
  const { certificateList = [] } = res;
  // 1 身份证
  const ID_CARD = certificateList?.find((item) => item.type === 1) || {};
  const ID_CARD_IMG = ID_CARD?.imageUrls?.map((item) => ({
    url: item,
    status: 'done',
  }));
  // 2 健康证
  const HEALTH = certificateList?.find((item) => item.type === 2) || {};
  const HEALTH_IMG = HEALTH?.imageUrls?.map((item) => ({
    url: item,
    status: 'done',
  }));
  // 3 从业资格证
  const PROFESSION = certificateList?.find((item) => item.type === 3) || {};
  const PROFESSION_IMG = PROFESSION?.imageUrls?.map((item) => ({
    url: item,
    status: 'done',
  }));
  // 4 营业执照
  const LICENSE = certificateList?.find((item) => item.type === 4) || {};
  const LICENSE_IMG = LICENSE?.imageUrls?.map((item) => ({
    url: item,
    status: 'done',
  }));
  // 5 生活照
  const LIFE = certificateList?.find((item) => item.type === 5) || {};
  const LIFE_IMG = LIFE?.imageUrls?.map((item) => ({
    url: item,
    status: 'done',
  }));
  // 6 其他证件
  const OTHER = certificateList?.find((item) => item.type === 6) || {};
  const OTHER_IMG = OTHER?.imageUrls?.map((item) => ({
    url: item,
    status: 'done',
  }));
  return {
    ...res,
    endDate: HEALTH.end,
    LIFE: LIFE_IMG,
    ID_CARD: ID_CARD_IMG,
    HEALTH: HEALTH_IMG,
    PROFESSION: PROFESSION_IMG,
    LICENSE: LICENSE_IMG,
    OTHER: OTHER_IMG,
    certificateList: [
      {
        auditStatus: 4,
        certificateId: LIFE.certificateId,
      },
      {
        auditStatus: 4,
        certificateId: LICENSE.certificateId,
      },
      {
        auditStatus: 4,
        certificateId: ID_CARD.certificateId,
      },
      {
        auditStatus: 4,
        certificateId: HEALTH.certificateId,
      },
      {
        auditStatus: 4,
        certificateId: PROFESSION.certificateId,
      },
      {
        auditStatus: 4,
        certificateId: OTHER.certificateId,
      },
    ],
  };
};
