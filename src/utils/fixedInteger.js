 //返回指定位数的字符串，自动补0

  const fixedInteger = (num, length = 2) => (Array(length).join('0') + num).slice(-length);

  export default fixedInteger;
