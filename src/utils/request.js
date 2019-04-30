import fetch from 'dva/fetch';

function parseJSON(response) {
  try {
    return response.json();
  } catch (error) {
    return {
      msg: '数据解析失败, 请稍后再试或联系管理员'
    };
  }
}

function checkStatus(options, response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.msg = options.msg || (`请求资源发生异常，请稍后再试或联系管理员，错误码: ${response.status}`);
  error.code = response.status;
  error.showMsg = options.showMsg;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  if (options.headers) {
    options.headers.token = window.token;
  } else {
    options.headers = {token: window.token};
  }
  options.credentials = 'omit';
  options.showMsg = options.showMsg === undefined ? true : options.showMsg;
  return fetch(url, options)
    .then(checkStatus.bind(this, options))
    .then(parseJSON)
    .then(data => {
      if (data.code === '0' || data.code === '200') {
        data.respData = data.respData || [];
        return { data };
      } else {
        const error = new Error('网络请求错误');
        error.msg = data.msg || options.msg || data.data;
        error.code = data.code;
        error.showMsg = options.showMsg;
        throw error;
      }
    })
    .catch(err => {
      err.msg = err.msg || options.msg;
      err.showMsg = options.showMsg;
      throw err;
    })
}

export const post = (url, data, showMsg) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify({
      data
    }),
    showMsg
  });
};
