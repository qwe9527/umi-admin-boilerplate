/* 

按需加载是的loading组件

*/
import Loading from './Loading';
import React from 'react';

const CodeLoadingComponent = ({isLoading, error, pastDelay}) => {
  if (pastDelay) {
    return <Loading codeLoad />
  } else if (error) {
    console.log(error)
    return <p>加载文件失败，请尝试刷新浏览器或联系管理员。</p>;
  } else {
    return null;
  }
};

export default CodeLoadingComponent;
