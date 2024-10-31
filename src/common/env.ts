export const DOMAIN_TEST = 'https://centertest.yxdaojia.cn';

export const getUploadDomain = () => {
  if (window.origin.includes('localhost')) {
    return DOMAIN_TEST;
  } else {
    return window.origin;
  }
};
