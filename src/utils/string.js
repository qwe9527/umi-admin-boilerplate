/**
 * 首字母大写
 * @param str
 */
export const toFirstUppercase = (str) => {
  const firstChar = str.slice(0, 1);
  const otherStr = str.slice(1);
  return `${firstChar.toLocaleUpperCase()}${otherStr}`
};

/**
 * json 转 query
 * @param jsonData
 * @returns {string}
 */
export const json2Query = (jsonData = {}) => {
  let query = '?';
  Object.keys(jsonData).forEach((key) => {
    const value = jsonData[key];
    if (value) {
      query += `${key}=${value}&`;
    }
  });
  return query.slice(0,-1);
};