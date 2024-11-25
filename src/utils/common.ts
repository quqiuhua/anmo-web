export const urlParamsToObj = (url: string) => {
  const queryString = url.split('?')[1];
  console.log('queryString>>>>', queryString);
  if (!queryString) return {};

  const paramsArray = queryString.split('&');
  const paramsObj: Record<string, any> = {};

  paramsArray.forEach((param) => {
    const [key, value] = param.split('=');
    paramsObj[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return paramsObj;
  // 返回最终的对象
};
