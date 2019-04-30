import React from 'react';
import './index.less';
import SimpleLayout from './SimpleLayout';
import PageLayout from './PageLayout';

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
    <PageLayout>
      {props.children}
    </PageLayout>
  );
};

export default BasicLayout;
