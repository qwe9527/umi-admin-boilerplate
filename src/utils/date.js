import fixedInteger from './fixedInteger';

/**
 * 格式化时间戳
 * @param {Date or ''} dateOrg 
 */
export const formatDate = (dateOrg) => {
  const date = dateOrg || (new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${year}-${fixedInteger(month)}-${fixedInteger(day)} ${fixedInteger(hour)}:${fixedInteger(minute)}:${fixedInteger(second)}`;
};

/**
 * 秒睡转为分钟秒
 * @param second
 * @returns {string}
 */
export const secondToMinSecStr = (second) => {
  const minutes = Math.floor(second / 60);
  const sec = second % 60;
  return `${fixedInteger(minutes)}:${fixedInteger(sec)}`;
};

/**
 * 秒数转换为小时分钟秒
 * @param second
 */
export const second2Time = (second) => {
  if (second || second === 0) {
    const parsedValue = parseInt(second, 10),
      sec = parsedValue % 60,
      min = Math.floor(parsedValue / 60 % 60),
      hour = Math.floor(parsedValue / 3600 % 24);
    return `${hour > 0 ? `${hour}小时` : ''}${min > 0 ? `${min}分钟` : ''}${sec > 0 ? `${sec}秒` : ''}` || '0';
  }
  return '';
};

/**
 * Unix时间戳格式化
 * @param timestamp
 * @returns {string}
 */
export const timestampFormat = (timestamp) => {
  if (timestamp) {
    const newDate = new Date(parseInt(timestamp, 10) * 1000);
    return formatDate(newDate);
  }
  return '';
};

/**
 * 计算两个日期之间的天数差
 * @param dateStr1
 * @param dateStr2
 */
export const getDateDiffDays = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const diffSeconds = date1.getTime() - date2.getTime();
  const days = Math.abs(Math.floor(diffSeconds / (1000 * 60 * 60 * 24)));
  return days;
};
