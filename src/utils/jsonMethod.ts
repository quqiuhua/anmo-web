export const jsonStringfy = (
  obj: Record<string, string>,
  defaultValue?: string,
) => {
  try {
    if (obj) {
      return JSON.stringify(obj);
    } else {
      return defaultValue || '';
    }
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};

export const jsonParse = (str: string, defaultValue?: Record<string, any>) => {
  try {
    if (str) {
      return JSON.parse(str);
    } else {
      return defaultValue || '';
    }
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};
