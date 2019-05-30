import React from 'react';
import dynamic from 'umi/dynamic';
import CodeLoadingComponent from '@/components/CodeLoadingComponent';

const AsyncAdd = dynamic({
  loader: () => import('@/components/Add'),
  loading: CodeLoadingComponent,
  delay: 300
});

export const columns = [
  {
    title: 'test',
    dataIndex: 'test'
  },
  {
    title: 'test1',
    dataIndex: 'test1'
  },
  {
    title: 'test2',
    dataIndex: 'test2'
  }
];

export const modalContentMap = {
  add: {
    title: '添加',
    content: (props) => <AsyncAdd {...props}/>,
  }
};
