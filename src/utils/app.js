import docCookies from './docCookies';
import {getDateDiffDays} from './date';

const timerIdData = {};
/**
 * 延时
 * @param timeout
 * @param key
 * @returns {Promise<any>}
 */
export const delay = (timeout = 0, key) => {
  if (key) {
    clearTimeout(timerIdData[key]);
    return new Promise(resolve => timerIdData[key] = setTimeout(resolve, timeout));
  } else {
    console.error('延时未设置key');
  }
};

/**
 * 获取已登录用户信息
 * @returns {*}
 */
export const getLocalUserData = () => {
  let userData = decodeURIComponent(docCookies.getItem('bbfpEmeter'));

  try {
    userData = JSON.parse(userData);
    userData.isLogin = !!userData.token;
    window.token = userData.token;
  } catch (error) {
    userData = {isLogin: false};
  }
  return userData;
};

export const changeLocalUserData = (attr, data) => {
  let userData = decodeURIComponent(docCookies.getItem('bbfpEmeter'));

  try {
    userData = JSON.parse(userData);
    userData[attr] = data;
  } catch (error) {
    console.log(error)
  }
  docCookies.setItem('bbfpEmeter', encodeURIComponent(JSON.stringify(userData)));
};

/**
 * 映射错位信息为中文
 * @param errStr
 * @returns {*|string}
 */
export const mapErrStr = (errStr) => {
  let newErrStr = errStr;
  if (errStr.indexOf('Failed to fetch') > -1) {
    newErrStr = '您的网络似乎出了点问题，请检查后再试！';
  }
  return newErrStr;
};

/**
 * 过滤设备
 * @param data
 * @param indexs
 * @param dataIndex
 * @returns {*}
 */
export const filterDevice = (data, indexs, dataIndex = 'id') => data.filter((value) => indexs.indexOf(value[dataIndex]) > -1);

