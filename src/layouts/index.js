import React from 'react';
import './index.less';
import SimpleLayout from './SimpleLayout';
import PageLayout from './PageLayout';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const getLayout = (props) => {
  const {pathname} = props.location;
  const layoutMap = {
    '/login': (
      <SimpleLayout>
        {props.children}
      </SimpleLayout>
    )
  };
  return layoutMap[pathname];
};

const BasicLayout = (props) => {
  const layout = getLayout(props);
  if (layout) {
    return layout;
  }
  return (
    <LocaleProvider locale={zh_CN}>
      <PageLayout>
        {props.children}
      </PageLayout>
    </LocaleProvider>
  );
};

export default BasicLayout;
